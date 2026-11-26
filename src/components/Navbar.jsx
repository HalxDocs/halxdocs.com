import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/blog", label: "Blog" },
  { to: "/api-graveyard", label: "Graveyard" },
  { to: "/guestbook", label: "Guestbook" },
];

function isActive(pathname, to) {
  return pathname === to || (to !== "/" && pathname.startsWith(to));
}

export default function Navbar({ dark, onToggleDark }) {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="nav-links" aria-label="Main navigation">
        {navLinks.map((l) => {
          const active = isActive(pathname, l.to);
          return (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link"
              aria-current={active ? "page" : undefined}
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
                e.currentTarget.style.color = active ? "var(--text)" : "var(--text-muted)";
              }}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        className="nav-toggle"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={14} /> : <Menu size={14} />}
        <span>{menuOpen ? "Close" : "Menu"}</span>
      </button>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleDark}
        aria-label="Toggle theme"
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
      >
        {dark ? <Sun size={13} /> : <Moon size={13} />}
      </button>

      {menuOpen && (
        <>
          <button
            type="button"
            className="nav-backdrop"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <nav id="mobile-nav" className="nav-menu" aria-label="Mobile navigation">
            {navLinks.map((l) => {
              const active = isActive(pathname, l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className="nav-menu-link"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{l.label}</span>
                  {active && <span className="nav-menu-current font-mono">HERE</span>}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </header>
  );
}
