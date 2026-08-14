import { useState, useRef, useEffect } from "react";

const W = 320;
const H = 120;

export default function SignaturePad({ onChange }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--text").trim() || "#fff";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  function pos(e) {
    const c = canvasRef.current;
    const r = c.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - r.left) * (W / r.width), y: (t.clientY - r.top) * (H / r.height) };
  }

  function start(e) {
    e.preventDefault();
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--text").trim() || "#000";
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    setDrawing(true);
  }

  function move(e) {
    e.preventDefault();
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function end(e) {
    e.preventDefault();
    setDrawing(false);
    onChange(canvasRef.current.toDataURL());
  }

  function clear() {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    onChange(null);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Signature
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{
          width: "100%",
          height: 120,
          borderRadius: 8,
          border: "1px solid var(--border)",
          background: "var(--surface)",
          cursor: "crosshair",
          touchAction: "none",
        }}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      />
      <button
        type="button"
        onClick={clear}
        style={{
          alignSelf: "flex-end",
          fontSize: 11,
          color: "var(--text-muted)",
          background: "none",
          border: "none",
          cursor: "pointer",
          textDecoration: "underline",
          textUnderlineOffset: 2,
          padding: 0,
        }}
      >
        Clear
      </button>
    </div>
  );
}
