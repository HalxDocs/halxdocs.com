import { Link } from "react-router-dom";

const posts = [
  {
    slug: "/blog/signed-run-receipts",
    title: "Every API Request Now Leaves a Signed Receipt",
    date: "November 2026",
    excerpt:
      "reqit 2.6.0 writes a redacted, hash-chained, signed run receipt for every execution — what is inside one, how verification works, and where the guarantees stop.",
    tag: "Release",
  },
  {
    slug: "/blog/one-engine-many-doors",
    title: "One Engine, Many Doors",
    date: "November 2026",
    excerpt:
      "How one Go package carries requests for a desktop app, CLI, runner, scheduler, load tester, and MCP server — and how that center holds.",
    tag: "Architecture",
  },
  {
    slug: "/blog/http-request-engine-in-go",
    title: "Building an HTTP Request Engine in Go",
    date: "November 2026",
    excerpt:
      "Connection pooling, authentication, context timeouts, and timing every phase of a request with Go's httptrace — what actually happens behind the Send button.",
    tag: "Engineering",
  },
  {
    slug: "/blog/two-implementations-one-truth",
    title: "Two Implementations, One Truth",
    date: "November 2026",
    excerpt:
      "Keeping a Go simulator and its TypeScript port from quietly describing different worlds — and what happened when I audited the guard itself.",
    tag: "Case Study",
  },
  {
    slug: "/blog/learning-raft-in-go",
    title: "Learning Raft by Building It in Go",
    date: "October 2026",
    excerpt:
      "What implementing a consensus algorithm actually teaches you about distributed systems — from RPC communication and timeouts to why agreeing is harder than connecting.",
    tag: "Distributed Systems",
  },
  {
    slug: "/blog/why-i-built-reqit",
    title: "Why I Built Reqit",
    date: "October 2026",
    excerpt:
      "Reqit started with a problem I was experiencing myself: a heavy API client, forced accounts, and paid collaboration. So I built something fast, local-first, and Git-native.",
    tag: "Build Story",
  },
];

export default function Blog() {
  return (
    <section
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "48px 20px 72px",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      <p className="label" style={{ marginBottom: 12 }}>Writing</p>

      <h1
        style={{
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
          color: "var(--text)",
          marginBottom: 8,
        }}
      >
        Notes from the build.
      </h1>

      <p
        style={{
          fontSize: 13.5,
          lineHeight: 1.6,
          color: "var(--text-muted)",
          maxWidth: 480,
          marginBottom: 36,
        }}
      >
        Thoughts on building products, tools, and systems — from real work, real bugs, real problems.
      </p>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={post.slug}
            style={{
              display: "block",
              padding: "18px 0",
              borderBottom: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 5 }}>
              <span
                className="font-mono"
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--text-dim)",
                }}
              >
                {post.tag}
              </span>
              <span
                className="font-mono"
                style={{ fontSize: 10, color: "var(--text-dim)", opacity: 0.6 }}
              >
                {post.date}
              </span>
            </div>

            <h2
              style={{
                fontSize: 14.5,
                fontWeight: 500,
                lineHeight: 1.4,
                color: "var(--text)",
                marginBottom: 4,
              }}
            >
              {post.title}
            </h2>

            <p
              style={{
                fontSize: 12.5,
                lineHeight: 1.55,
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
