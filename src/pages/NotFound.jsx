import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const W = 400;
const H = 280;
const GRAVITY = 0.25;
const FLAP = -5;
const PIPE_W = 36;
const GAP = 90;
const PIPE_SPEED = 1.8;
const BIRD_X = 70;
const BIRD_R = 10;

function FlappyGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | playing | over
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => parseInt(sessionStorage.getItem("fb") || "0", 10));

  const init = () => ({
    bird: { y: H / 2, vy: 0 },
    pipes: [],
    frame: 0,
    scored: 0,
  });

  const startGame = () => {
    const s = init();
    stateRef.current = s;
    setScore(0);
    setStatus("playing");
  };

  const flap = () => {
    const s = stateRef.current;
    if (!s) return;
    if (status === "idle") { startGame(); return; }
    if (status !== "playing") return;
    s.bird.vy = FLAP;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const loop = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, W, H);

      // bg
      ctx.fillStyle = "var(--surface)";
      ctx.fillRect(0, 0, W, H);

      // draw ground line
      ctx.strokeStyle = "var(--border)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, H - 20);
      ctx.lineTo(W, H - 20);
      ctx.stroke();

      if (s) {
        // physics
        s.bird.vy += GRAVITY;
        s.bird.y += s.bird.vy;

        // spawn pipes
        s.frame++;
        if (s.frame % 90 === 0) {
          const topH = 40 + Math.random() * (H - GAP - 80);
          s.pipes.push({ x: W, topH, scored: false });
        }

        // move pipes
        for (const p of s.pipes) p.x -= PIPE_SPEED;

        // collision
        const b = s.bird;
        const by = b.y;
        if (by < 0 || by > H - 20) {
          setStatus("over");
          const final = s.scored;
          setScore(final);
          if (final > best) { setBest(final); sessionStorage.setItem("fb", final.toString()); }
          stateRef.current = null;
          rafRef.current = requestAnimationFrame(loop);
          return;
        }

        for (const p of s.pipes) {
          if (
            BIRD_X + BIRD_R > p.x &&
            BIRD_X - BIRD_R < p.x + PIPE_W &&
            (by - BIRD_R < p.topH || by + BIRD_R > p.topH + GAP)
          ) {
            setStatus("over");
            const final = s.scored;
            setScore(final);
            if (final > best) { setBest(final); sessionStorage.setItem("fb", final.toString()); }
            stateRef.current = null;
            rafRef.current = requestAnimationFrame(loop);
            return;
          }
          if (!p.scored && p.x + PIPE_W < BIRD_X) {
            p.scored = true;
            s.scored++;
            setScore(s.scored);
          }
        }

        // clean pipes
        s.pipes = s.pipes.filter((p) => p.x > -PIPE_W);
      }

      // draw pipes
      const s2 = stateRef.current;
      if (s2) {
        for (const p of s2.pipes) {
          ctx.fillStyle = "var(--text-muted)";
          ctx.globalAlpha = 0.15;
          ctx.fillRect(p.x, 0, PIPE_W, p.topH);
          ctx.fillRect(p.x, p.topH + GAP, PIPE_W, H - p.topH - GAP);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = "var(--border)";
          ctx.lineWidth = 1;
          ctx.strokeRect(p.x, 0, PIPE_W, p.topH);
          ctx.strokeRect(p.x, p.topH + GAP, PIPE_W, H - p.topH - GAP);
        }
      }

      // draw bird
      const by2 = s2 ? s2.bird.y : H / 2;
      ctx.beginPath();
      ctx.arc(BIRD_X, by2, BIRD_R, 0, Math.PI * 2);
      ctx.fillStyle = "var(--text)";
      ctx.fill();
      ctx.strokeStyle = "var(--bg)";
      ctx.lineWidth = 2;
      ctx.stroke();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [status]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === " " || e.key === "Space") { e.preventDefault(); flap(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [status]);

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Score: <strong style={{ color: "var(--text)" }}>{score}</strong>
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Best: <strong style={{ color: "var(--text)" }}>{best}</strong>
        </div>
      </div>

      <div style={{ position: "relative", borderRadius: 10, border: "1px solid var(--border)", overflow: "hidden" }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={flap}
          style={{ display: "block", width: "100%", height: "auto", cursor: "pointer", background: "var(--surface)" }}
        />

        {status === "idle" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, pointerEvents: "none" }}>
            <div style={{ fontSize: 14, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.6 }}>
              Tap or press space to flap
            </div>
          </div>
        )}

        {status === "over" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, pointerEvents: "none" }}>
            <div style={{ fontSize: 15, color: "var(--text)", fontWeight: 600 }}>Game over</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Score: {score}</div>
            <button
              onClick={startGame}
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
                pointerEvents: "auto",
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
        Play flappy bird while you're here.
      </div>

      <FlappyGame />

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
