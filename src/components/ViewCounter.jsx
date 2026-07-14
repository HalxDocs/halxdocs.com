import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// Baseline estimate of historical views before this counter went live.
// Change this to your best guess of past views.
const BASELINE = 1024;

export default function ViewCounter() {
  const [count, setCount] = useState(BASELINE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("https://api.countapi.xyz/hit/halxdocs/portfolio-views")
      .then((r) => r.json())
      .then((d) => {
        if (active && typeof d.value === "number") {
          setCount(BASELINE + d.value);
        }
      })
      .catch(() => {})
      .finally(() => active && setLoaded(true));
    return () => { active = false; };
  }, []);

  return (
    <span
      className="font-mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: "var(--text-dim)",
        letterSpacing: "0.04em",
        opacity: loaded ? 1 : 0.5,
        transition: "opacity 0.4s",
      }}
      title="Total portfolio views"
    >
      <Eye size={12} strokeWidth={2} />
      {count.toLocaleString()}
    </span>
  );
}
