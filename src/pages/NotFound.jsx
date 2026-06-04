import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function RunnerGame() {
  const [playState, setPlayState] = useState("idle");
  const playStateRef = useRef("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return parseInt(sessionStorage.getItem("run") || "0", 10); } catch { return 0; }
  });
  const [jumping, setJumping] = useState(false);
  const jumpingRef = useRef(false);
  const [obstacles, setObstacles] = useState([]);
  const frameRef = useRef(0);
  const scoreRef = useRef(0);
  const aliveRef = useRef(true);

  const start = () => {
    frameRef.current = 0;
    scoreRef.current = 0;
    aliveRef.current = true;
    setScore(0);
    setObstacles([]);
    setJumping(false);
    jumpingRef.current = false;
    playStateRef.current = "playing";
    setPlayState("playing");
  };

  const jump = () => {
    if (playStateRef.current === "idle") { start(); return; }
    if (playStateRef.current !== "playing" || jumpingRef.current) return;
    jumpingRef.current = true;
    setJumping(true);
    setTimeout(() => { jumpingRef.current = false; setJumping(false); }, 400);
  };

  useEffect(() => {
    if (playState !== "playing") return;
    const interval = setInterval(() => {
      frameRef.current++;
      const f = frameRef.current;

      // spawn obstacle every 50 frames
      if (f % 50 === 0) {
        setObstacles((prev) => [...prev, { id: f, x: 100 }]);
      }

      // move obstacles
      setObstacles((prev) => {
        const next = prev.map((o) => ({ ...o, x: o.x - 3 })).filter((o) => o.x > -8);

        // collision: player is at x=15, ground is at y=80%, player is ~14px tall
        for (const o of next) {
          if (o.x < 30 && o.x > 5 && !jumpingRef.current) {
            aliveRef.current = false;
            playStateRef.current = "over";
            const final = scoreRef.current;
            setPlayState("over");
            setScore(final);
            setBest((b) => {
              const nb = Math.max(b, final);
              try { sessionStorage.setItem("run", nb.toString()); } catch {}
              return nb;
            });
            return next;
          }
        }

        return next;
      });

      // score
      if (f % 10 === 0) {
        scoreRef.current++;
        setScore(scoreRef.current);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [playState]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === " " || e.key === "Space") { e.preventDefault(); jump(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
        onClick={jump}
        style={{
          position: "relative",
          width: "100%",
          height: 180,
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--surface)",
          overflow: "hidden",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {/* ground */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "var(--border)" }} />

        {/* player */}
        <div
          style={{
            position: "absolute",
            bottom: jumping ? 60 : 4,
            left: 14,
            width: 14,
            height: 18,
            borderRadius: 3,
            background: "var(--text)",
            transition: "bottom 0.15s ease-out",
          }}
        />

        {/* obstacles */}
        {obstacles.map((o) => (
          <div
            key={o.id}
            style={{
              position: "absolute",
              bottom: 4,
              left: `${o.x}%`,
              width: 10,
              height: 16,
              borderRadius: 2,
              background: "var(--text-muted)",
              opacity: 0.5,
            }}
          />
        ))}

        {/* overlays */}
        {playState === "idle" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, color: "var(--text-muted)", pointerEvents: "none" }}>Tap or press space to jump</span>
          </div>
        )}

        {playState === "over" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ fontSize: 15, color: "var(--text)", fontWeight: 600, pointerEvents: "none" }}>Game over</span>
            <span style={{ fontSize: 13, color: "var(--text-muted)", pointerEvents: "none" }}>Score: {score}</span>
            <button
              onClick={(e) => { e.stopPropagation(); start(); }}
              style={{
                padding: "10px 24px",
                borderRadius: 100,
                border: "none",
                background: "var(--text)",
                color: "var(--bg)",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "opacity 0.2s",
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
        maxWidth: 500,
        margin: "0 auto",
        padding: "130px 24px 60px",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 600, fontFamily: "'Fraunces', serif", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 8 }}>
        404
      </div>
      <div style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 4, lineHeight: 1.6 }}>
        You've wandered off the map.
      </div>
      <div style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 24 }}>
        Play the dino game while you're here.
      </div>

      <RunnerGame />

      <Link
        to="/"
        style={{
          display: "inline-flex",
          marginTop: 24,
          padding: "10px 22px",
          borderRadius: 100,
          border: "1px solid var(--border)",
          background: "transparent",
          color: "var(--text-muted)",
          fontSize: 14,
          textDecoration: "none",
          transition: "color 0.2s, border-color 0.2s",
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
