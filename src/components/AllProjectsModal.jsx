import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";

const groups = [
  { key: "tools", label: "Developer tools" },
  { key: "products", label: "Products & client work" },
];

const isExternal = (url) => /^https?:\/\//.test(url);

function ProjectLink({ href, label, external, onNavigate }) {
  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    fontFamily: "var(--font-mono)",
    fontSize: 10.5,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--text-muted)",
    textDecoration: "none",
    borderBottom: "1px solid var(--border)",
    paddingBottom: 1,
    transition: "color 0.15s, border-color 0.15s",
  };

  const hoverOn = (e) => {
    e.currentTarget.style.color = "var(--text)";
    e.currentTarget.style.borderBottomColor = "var(--text)";
  };
  const hoverOff = (e) => {
    e.currentTarget.style.color = "var(--text-muted)";
    e.currentTarget.style.borderBottomColor = "var(--border)";
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={style}
        onMouseEnter={hoverOn}
        onMouseLeave={hoverOff}
      >
        {label}
        <ArrowUpRight size={11} strokeWidth={1.75} aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link
      to={href}
      style={style}
      onClick={onNavigate}
      onMouseEnter={hoverOn}
      onMouseLeave={hoverOff}
    >
      {label}
      <ArrowRight size={11} strokeWidth={1.75} aria-hidden="true" />
    </Link>
  );
}

function ProjectRow({ project, onNavigate }) {
  return (
    <div style={{ padding: "13px 0", borderTop: "1px solid var(--border)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "4px 16px",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>
          {project.title}
        </span>

        <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {project.caseStudy && (
            <ProjectLink
              href={`/work/${project.caseStudy}`}
              label="Case study"
              external={false}
              onNavigate={onNavigate}
            />
          )}
          {project.live && (
            <ProjectLink
              href={project.live}
              label={isExternal(project.live) ? "Live" : "Site"}
              external={isExternal(project.live)}
              onNavigate={onNavigate}
            />
          )}
          {project.github && (
            <ProjectLink href={project.github} label="GitHub" external />
          )}
        </span>
      </div>

      <p
        style={{
          margin: "3px 0 0",
          fontSize: 12.5,
          lineHeight: 1.55,
          color: "var(--text-muted)",
          maxWidth: 570,
        }}
      >
        {project.description}
      </p>

      {project.stack?.length > 0 && (
        <p
          className="font-mono"
          style={{
            margin: "6px 0 0",
            fontSize: 9.5,
            letterSpacing: "0.06em",
            color: "var(--text-dim)",
          }}
        >
          {project.stack.join(" · ")}
        </p>
      )}
    </div>
  );
}

export default function AllProjectsModal({ open, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      onClick={open ? onClose : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        pointerEvents: open ? "auto" : "none",
        transition: `opacity 0.18s ease, visibility 0s linear ${
          open ? "0s" : "0.18s"
        }`,
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="all-projects-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 720,
          maxHeight: "min(86vh, 780px)",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(12px) scale(0.985)",
          transition:
            "opacity 0.2s ease, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            padding: "20px 22px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div>
            <h2
              id="all-projects-title"
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              All projects
            </h2>
            <p
              style={{
                margin: "3px 0 0",
                fontSize: 12.5,
                color: "var(--text-muted)",
              }}
            >
              {projects.length} projects — developer tools, open source, and
              shipped products.
            </p>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close all projects"
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              lineHeight: 1,
              color: "var(--text-muted)",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: 8,
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            ×
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: "4px 22px 22px" }}>
          {groups.map((group) => {
            const items = projects.filter((p) => p.category === group.key);
            if (!items.length) return null;

            return (
              <section key={group.key} style={{ marginTop: 20 }}>
                <h3 className="label" style={{ margin: "0 0 2px" }}>
                  {group.label}
                </h3>
                {items.map((project) => (
                  <ProjectRow
                    key={project.title}
                    project={project}
                    onNavigate={onClose}
                  />
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
