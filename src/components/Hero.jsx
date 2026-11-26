function NameLink({ href, mark = false, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        color: "var(--text)",
        textDecoration: "underline",
        textUnderlineOffset: 3,
        fontWeight: 500,
      }}
    >
      {mark && <AegisMark />}
      {children}
    </a>
  );
}

// The mark is inline so it inherits the text colour and survives both themes;
// the standalone aegis.svg is white and disappears on the light background.
function AegisMark() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, marginBottom: 1 }}
    >
      <path d="M24 10.4 10.8 36.2" opacity="0.9" />
      <path d="M24 10.4 37.2 36.2" opacity="0.9" />
      <path d="M12.6 36.2h7.2" opacity="0.35" />
      <path d="M28.2 36.2h7.2" opacity="0.35" />
      <path d="M2 24h11l4-6.5 4.5 13 4-6.5H46" opacity="0.95" />
      <circle cx="24" cy="8" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="8" cy="38" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="40" cy="38" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Hero() {
  const links = [
    { label: "GitHub", href: "https://github.com/HalxDocs" },
    { label: "X", href: "https://x.com/HalxDocs" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/halx-docs-633272344" },
  ];

  return (
    <section
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "72px 20px 0",
        color: "var(--text)",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(30px, 6vw, 38px)",
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          marginBottom: 16,
        }}
      >
        HalxDocs.
      </h1>

      <div
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 24,
        }}
      >
        <p style={{ margin: 0 }}>
          Backend-focused software engineer. I build APIs, SaaS backends, and developer
          tools with Go and TypeScript.
        </p>
        <p
          style={{
            margin: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            columnGap: 6,
            rowGap: 2,
          }}
        >
          <span>Creator of</span>
          <NameLink href="https://reqit.dev">reqit</NameLink>
          <span>and</span>
          <NameLink href="https://aegis-labx.vercel.app/" mark>
            Aegis
          </NameLink>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 18,
          marginBottom: 8,
        }}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.textDecoration = "underline";
              e.currentTarget.style.textUnderlineOffset = 4;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            {l.label}
          </a>
        ))}

        <a
          href="https://cal.com/halxdocs"
          target="_blank"
          rel="noreferrer"
          className="cta-btn"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(2px, 2px)";
            e.currentTarget.style.boxShadow = "1px 1px 0 var(--text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0, 0)";
            e.currentTarget.style.boxShadow = "3px 3px 0 var(--text)";
          }}
        >
          Book a call
        </a>
      </div>

      <a href="#contact" className="hero-status">
        <span className="hero-status-dot" aria-hidden="true" />
        <span>
          Open to backend, platform, and consulting work
        </span>
      </a>
    </section>
  );
}
