import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const P_W = 16, P_H = 20, P_LEFT = 20;
const O_W = 14, O_H = 18;
const GROUND = 2, JUMP_H = 65, GRAVITY = 0.35;

function RunnerGame() {
  const areaRef = useRef(null);
  const [playState, setPlayState] = useState("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return parseInt(sessionStorage.getItem("run") || "0", 10); } catch { return 0; }
  });
  const [obstacles, setObstacles] = useState([]);
  const [playerBottom, setPlayerBottom] = useState(GROUND);

  const gRef = useRef({ y: 0, vy: 0, obs: [], score: 0, frame: 0, alive: true }); // y = height above ground (0 = on ground, positive = up)
  const playRef = useRef("idle");
  const wRef = useRef(400);

  const reset = () => {
    gRef.current = { y: 0, vy: 0, obs: [], score: 0, frame: 0, alive: true };
    playRef.current = "playing";
    setPlayerBottom(GROUND);
    setObstacles([]);
    setScore(0);
    setPlayState("playing");
  };

  const handleJump = () => {
    if (playRef.current === "idle") { reset(); jumpNow(); return; }
    if (playRef.current !== "playing") return;
    jumpNow();
  };

  const jumpNow = () => {
    const g = gRef.current;
    if (!g || g.y > 3) return;
    g.vy = 6;
  };

  // space bar support
  useEffect(() => {
    const handler = (e) => {
      if (e.key === " " || e.key === "Space") { e.preventDefault(); handleJump(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // measure container width
  useEffect(() => {
    if (!areaRef.current) return;
    const update = () => { if (areaRef.current) wRef.current = areaRef.current.offsetWidth; };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(areaRef.current);
    return () => ro.disconnect();
  }, []);

  // game loop
  useEffect(() => {
    if (playState !== "playing") return;

    const g = gRef.current;
    let last = performance.now();
    let tick = 0;
    let rafId = requestAnimationFrame(loop);

    function loop(now) {
      const dt = Math.min((now - last) / 16, 4);
      last = now;

      g.frame += dt;

      // jump physics: y = height above ground (positive = up)
      g.vy -= GRAVITY * dt;    // gravity pulls down
      g.y += g.vy * dt;        // positive vy → positive y (up)
      if (g.y < 0) { g.y = 0; g.vy = 0; } // land on ground

      // spawn obstacles
      const interval = Math.max(50, 140 - g.frame * 0.08);
      if (g.frame >= interval) {
        g.frame = 0;
        g.obs.push({ x: wRef.current });
      }

      // move obstacles
      const speed = 3.5 + g.score * 0.02;
      for (const o of g.obs) o.x -= speed * dt;
      g.obs = g.obs.filter((o) => o.x > -O_W * 2);

      // collision
      const oTop = GROUND + O_H;
      const pBottom = GROUND + Math.min(g.y, JUMP_H);
      let hit = false;
      for (const o of g.obs) {
        if (o.x > P_LEFT + P_W + 6 || o.x + O_W < P_LEFT - 4) continue;
        if (pBottom > oTop + 4) continue;
        hit = true; break;
      }

      if (hit && g.alive) {
        g.alive = false;
        playRef.current = "over";
        const final = Math.round(g.score);
        setPlayerBottom(GROUND + Math.min(g.y, JUMP_H));
        setObstacles([...g.obs]);
        setScore(final);
        setBest((b) => {
          const nb = Math.max(b, final);
          try { sessionStorage.setItem("run", nb.toString()); } catch {}
          return nb;
        });
        setPlayState("over");
        return; // stop loop
      }

      // score
      for (const o of g.obs) {
        if (o._scored) continue;
        if (o.x + O_W < P_LEFT) {
          o._scored = true;
          g.score += 1;
        }
      }

      // sync to react state every ~2 frames
      tick += dt;
      if (tick >= 2) {
        tick = 0;
        setPlayerBottom(GROUND + Math.min(g.y, JUMP_H));
        setObstacles([...g.obs]);
        setScore(Math.round(g.score));
      }

      rafId = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(rafId);
  }, [playState]);

  const pBottom = Math.min(playerBottom, GROUND + JUMP_H);

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Score: <strong style={{ color: "var(--text)" }}>{score}</strong>
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Best: <strong style={{ color: "var(--text)" }}>{best}</strong>
        </div>
      </div>

      <div
        ref={areaRef}
        onClick={handleJump}
        style={{
          position: "relative",
          width: "100%",
          height: 200,
          borderRadius: 3,
          border: "1px solid var(--border)",
          background: "var(--bg)",
          overflow: "hidden",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div style={{ position: "absolute", bottom: GROUND, left: 0, right: 0, height: 2, background: "var(--border)" }} />

        <div
          style={{
            position: "absolute",
            left: P_LEFT,
            bottom: pBottom,
            width: P_W,
            height: P_H,
            borderRadius: 4,
            background: "var(--text)" ,
          }}
        />

        {obstacles.map((o, i) => (
          <div
            key={`${o.x}-${i}`}
            style={{
              position: "absolute",
              left: o.x,
              bottom: GROUND,
              width: O_W,
              height: O_H,
              borderRadius: 3,
              background: "var(--text-muted)",
              opacity: 0.55,
            }}
          />
        ))}

        {playState === "idle" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Tap or press space to jump</span>
          </div>
        )}

        {playState === "over" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, pointerEvents: "none" }}>
            <span style={{ fontSize: 13.5, color: "var(--text)", fontWeight: 500 }}>Game over</span>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Score: {score}</span>
            <button
              onClick={(e) => { e.stopPropagation(); reset(); }}
              style={{
                padding: "8px 20px",
                borderRadius: 3,
                border: "none",
                background: "var(--text)",
                color: "var(--bg)",
                fontSize: 12.5,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
                pointerEvents: "auto",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <main
      style={{
        maxWidth: 460,
        margin: "0 auto",
        padding: "56px 24px 56px",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 48, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 10 }}>
        404
      </div>
      <div style={{ fontSize: 13.5, color: "var(--text-muted)", marginBottom: 3, lineHeight: 1.6 }}>
        You've wandered off the map.
      </div>
      <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 20 }}>
        Play the dino game while you're here.
      </div>

      <RunnerGame />

      <Link
        to="/"
        style={{
          display: "inline-flex",
          marginTop: 20,
          padding: "8px 20px",
          borderRadius: 3,
          border: "1px solid var(--border)",
          background: "transparent",
          color: "var(--text-muted)",
          fontSize: 12.5,
          textDecoration: "none",
          transition: "color 0.15s, border-color 0.15s",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text)";
          e.currentTarget.style.borderColor = "var(--text)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text-muted)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        Go home
      </Link>
    </main>
  );
}
