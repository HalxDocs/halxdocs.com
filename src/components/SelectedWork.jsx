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
        {projects.map((item, idx) => (
          <Link
            key={item.slug}
            to={`/projects/${item.slug}`}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              padding: "20px 0",
              borderBottom: "1px solid var(--border)",
              textDecoration: "none",
              transition: "padding-left 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "8px")}
            onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
          >
            <span
              className="font-mono"
              style={{
                fontSize: 12,
                color: "var(--text-dim)",
                flexShrink: 0,
                width: 28,
                paddingTop: 3,
              }}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>

            <div style={{ flex: 1, minWidth: 0 }}>
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
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          marginTop: 48,
          paddingTop: 40,
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 18,
            fontWeight: 500,
            fontFamily: "'Fraunces', serif",
            letterSpacing: "-0.01em",
            color: "var(--text)",
            marginBottom: 16,
          }}
        >
          Have a project in mind?
        </p>
        <a
          href="https://cal.com/halxdocs"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "11px 26px",
            borderRadius: 100,
            background: "var(--text)",
            color: "var(--bg)",
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
            transition: "opacity 0.2s",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Book a Call
        </a>
      </div>
    </section>
  );
}
