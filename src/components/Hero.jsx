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
          fontSize: 26,
          fontWeight: 500,
          color: "var(--text)",
          marginBottom: 20,
          fontFamily: "'Fraunces', serif",
          letterSpacing: "-0.01em",
        }}
      >
        Hey, I'm HalxDocs.
      </p>

      <div
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <p style={{ margin: 0 }}>
          Backend-focused software engineer building production-ready APIs, distributed
          systems, and developer tools with Go and TypeScript.
        </p>
        <p style={{ margin: 0 }}>
          Creator of <strong style={{ color: "var(--text)", fontWeight: 500 }}>Reqit</strong>, an
          open-source API testing tool. I care about performance, reliability, and great
          developer experience.
        </p>
        <p style={{ margin: 0 }}>
          If you're building something interesting,{" "}
          <a
            href="https://cal.com/halxdocs"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            book a call
          </a>
          .
        </p>
        <p style={{ margin: 0 }}>
          Find me on{" "}
          <a href="https://x.com/HalxDocs" target="_blank" rel="noreferrer" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>X</a>
          {" · "}
          <a href="https://github.com/HalxDocs" target="_blank" rel="noreferrer" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>GitHub</a>
          {" · "}
          <a href="https://www.linkedin.com/in/halx-docs-633272344" target="_blank" rel="noreferrer" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>LinkedIn</a>
          .
        </p>
      </div>

      <LiveStats />
    </section>
  );
}
