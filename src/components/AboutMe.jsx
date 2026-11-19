export default function AboutMe() {
  return (
    <section
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "72px 20px 0",
        color: "var(--text)",
      }}
    >
      <h2
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: 14,
        }}
      >
        About me
      </h2>

      <div
        style={{
          fontSize: 15,
          lineHeight: 1.75,
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <p style={{ margin: 0 }}>
          I'm a backend-focused developer. I build{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>
            APIs, distributed systems, and developer tools
          </strong>
          , mainly with{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>Go</strong> and{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>TypeScript</strong>. I
          care about writing reliable, performant software and making things easier for
          developers.
        </p>
        <p style={{ margin: 0 }}>
          I enjoy taking ideas from concept to working products — whether it's a{" "}
          <a
            href="#projects"
            style={{
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            SaaS platform
          </a>
          , a CLI, or an{" "}
          <a
            href="https://github.com/HalxDocs"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            open-source tool
          </a>
          . I'm also diving deeper into infrastructure engineering and distributed
          systems, learning how to build software that stays reliable at scale.
        </p>
      </div>
    </section>
  );
}
