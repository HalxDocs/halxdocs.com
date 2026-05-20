import { Link } from "react-router-dom";
import { projects } from "../data/projects";

function domain(url) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace("www.", "").toUpperCase();
  } catch {
    return null;
  }
}

export default function SelectedWork() {
  return (
    <section
      style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "0 24px 80px",
        color: "var(--text)",
      }}
    >
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--text-muted)",
          marginBottom: 16,
          letterSpacing: "0.02em",
        }}
      >
        Projects
      </p>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {projects.map((item) => (
          <Link
            key={item.slug}
            to={`/projects/${item.slug}`}
            style={{
              display: "block",
              padding: "20px 0",
              borderBottom: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 5,
              }}
            >
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 17,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                }}
              >
                {item.title}
              </span>

              {item.href && (
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "var(--text-dim)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {domain(item.href)}
                </span>
              )}
            </div>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              {item.oneLiner}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
