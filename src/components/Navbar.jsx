import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/blog", label: "Blog" },
  { to: "/api-graveyard", label: "Graveyard" },
  { to: "/guestbook", label: "Guestbook" },
];

export default function Navbar({ dark, onToggleDark }) {
  const { pathname } = useLocation();

  return (
    <header
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "20px 20px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 18,
      }}
    >
      <nav className="nav-links" style={{ display: "flex", gap: 18 }}>
        {navLinks.map((l) => {
          const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
          return (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link"
              style={{
                fontSize: 13,
                color: active ? "var(--text)" : "var(--text-muted)",
                textDecoration: active ? "underline" : "none",
                textUnderlineOffset: 4,
                textDecorationColor: active ? "var(--text)" : "transparent",
                transition: "color 0.15s",
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

      <button
        onClick={onToggleDark}
        aria-label="Toggle theme"
        style={{
          width: 22,
          height: 22,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-dim)",
          padding: 0,
          transition: "color 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
      >
        {dark ? <Sun size={13} /> : <Moon size={13} />}
      </button>
    </header>
  );
}
