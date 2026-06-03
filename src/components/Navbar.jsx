import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/estimate", label: "Estimate" },
  { to: "/guestbook", label: "Guestbook" },
];

export default function Navbar({ dark, onToggleDark }) {
  const { pathname } = useLocation();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <Link
            to="/"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              textDecoration: "none",
            }}
          >
            HalxDocs
          </Link>

          <button
            onClick={onToggleDark}
            aria-label="Toggle theme"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        <nav className="nav-rail" style={{ display: "flex", gap: 4, paddingBottom: 12 }}>
          {navLinks.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  fontSize: 13,
                  color: active ? "var(--text)" : "var(--text-muted)",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: 100,
                  background: active ? "var(--accent-soft)" : "transparent",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <style>{`
        .nav-rail {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .nav-rail::-webkit-scrollbar { display: none; }
      `}</style>
    </header>
  );
}
