import ViewCounter from "./ViewCounter";

export default function Footer() {
  return (
    <footer
      style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "0 24px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid var(--border)",
        paddingTop: 24,
      }}
    >
      <span style={{ fontSize: 13, color: "var(--text-dim)" }}>
        © 2026 HalxDocs
      </span>

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <ViewCounter />
        {[
          { label: "X", href: "https://x.com/HalxDocs" },
          { label: "GitHub", href: "https://github.com/HalxDocs" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/halx-docs-633272344" },
          { label: "npm", href: "https://www.npmjs.com/~halxdocs" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 13,
              color: "var(--text-dim)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
          >
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
