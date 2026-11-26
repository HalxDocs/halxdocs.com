import { Link } from "react-router-dom";

const linkStyle = {
  color: "inherit",
  textDecoration: "underline",
  textUnderlineOffset: 3,
  transition: "color 0.15s",
};

function HoverLink({ to, href, children }) {
  const handlers = {
    onMouseEnter: (e) => (e.currentTarget.style.color = "var(--text)"),
    onMouseLeave: (e) => (e.currentTarget.style.color = "var(--text-muted)"),
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" style={linkStyle} {...handlers}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} style={linkStyle} {...handlers}>
      {children}
    </Link>
  );
}

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
          I build backends. Mostly{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>Go</strong> and{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>TypeScript</strong>:
          APIs, queue workers, internal tools, the parts that have to keep working once the
          demo is over.
        </p>
        <p style={{ margin: 0 }}>
          I got into this because I wanted to know why systems fall over. That turned into
          building the tools I was missing — an API client that keeps collections in Git, a
          dead-letter queue inspector, a simulator for failures I could not reproduce on a
          real cluster. Some of them are{" "}
          <HoverLink to="/work">written up properly</HoverLink>, and most of the rest are
          on{" "}
          <HoverLink href="https://github.com/HalxDocs">GitHub</HoverLink>.
        </p>
        <p style={{ margin: 0 }}>
          Lately I&apos;ve been spending most of my time on Postgres internals, Raft, and
          platform work. Not for a new job title — those are just the things that keep
          embarrassing me in production, so I&apos;d rather understand them properly.
        </p>
        <p style={{ margin: 0 }}>
          If any of that is useful to you, I&apos;m open to work. Otherwise the{" "}
          <HoverLink to="/blog">blog</HoverLink> is where I write down what I got wrong.
        </p>
      </div>
    </section>
  );
}
