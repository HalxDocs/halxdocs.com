import LiveStats from "./LiveStats";

export default function Hero() {
  return (
    <section
      style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "130px 24px 64px",
        color: "var(--text)",
      }}
    >
      <p
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: "var(--text)",
          marginBottom: 8,
          letterSpacing: "-0.01em",
          fontFamily: "'Fraunces', serif",
        }}
      >
        Hey, I'm HalxDocs.
      </p>

      <p
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "var(--text)",
          marginBottom: 28,
          letterSpacing: "0.01em",
        }}
      >
        Full-Stack Engineer (Backend-Focused)
      </p>

      <div
        style={{
          fontSize: 15,
          lineHeight: 1.85,
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <p>
          I build backends, SaaS platforms, CLIs, developer tools, and API-heavy systems. I
          specialize in{" "}
          <strong style={{ color: "var(--text)", fontWeight: 500 }}>Go (Gin)</strong> and{" "}
          <strong style={{ color: "var(--text)", fontWeight: 500 }}>TypeScript</strong>, and I care
          about shipping things that actually work in production.
        </p>

        <p>
          Find me on{" "}
          <a href="https://x.com/HalxDocs" target="_blank" rel="noreferrer" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>X</a>
          {" · "}
          <a href="https://github.com/HalxDocs" target="_blank" rel="noreferrer" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>GitHub</a>
          {" · "}
          <a href="https://www.linkedin.com/in/halx-docs-633272344" target="_blank" rel="noreferrer" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>LinkedIn</a>
          {" "}or reach out via{" "}
          <a href="mailto:halxdocs@gmail.com" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>email</a>
          .
        </p>
        <p>
          I also play <strong style={{ color: "var(--text)", fontWeight: 500 }}>chess</strong> — current rating: <strong style={{ color: "var(--text)", fontWeight: 500 }}>607 Elo</strong>.
        </p>
      </div>

      <LiveStats />

      <a
        href="https://cal.com/halxdocs"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "10px 22px",
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
    </section>
  );
}
