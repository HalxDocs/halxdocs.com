export default function Footer() {
  return (
    <footer
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "0 20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid var(--border)",
        paddingTop: 16,
      }}
    >
      <span style={{ fontSize: 11.5, color: "var(--text-dim)" }}>
        © 2026 HalxDocs
      </span>

      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
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
              fontSize: 11.5,
              color: "var(--text-dim)",
              textDecoration: "none",
              transition: "color 0.15s",
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
