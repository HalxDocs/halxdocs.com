import { Link } from "react-router-dom";
import LikeButton from "../components/LikeButton";

const posts = [
  {
    slug: "/blog/dead-letter-queues-safe-recovery",
    title: "Dead-Letter Queues: Designing Safe Message Recovery in Distributed Systems",
    date: "November 2026",
    excerpt:
      "Why replaying a failed batch is never just a button, and what a safe recovery path actually needs.",
    tag: "Distributed Systems",
  },
  {
    slug: "/blog/signed-run-receipts",
    title: "Every API Request Now Leaves a Signed Receipt",
    date: "November 2026",
    excerpt:
      "reqit 2.6.0 writes a redacted, hash-chained, signed receipt for every run. What is inside one, how verification works, and where the guarantee stops.",
    tag: "Release",
  },
  {
    slug: "/blog/one-engine-many-doors",
    title: "One Engine, Many Doors",
    date: "November 2026",
    excerpt:
      "One Go package sits behind reqit's desktop app, CLI, runner, scheduler, load tester, and MCP server. Here's how that holds up.",
    tag: "Architecture",
  },
  {
    slug: "/blog/http-request-engine-in-go",
    title: "Building an HTTP Request Engine in Go",
    date: "November 2026",
    excerpt:
      "What happens between hitting Send and getting a response: connection reuse, auth, timeouts, and timing each phase with httptrace.",
    tag: "Engineering",
  },
  {
    slug: "/blog/two-implementations-one-truth",
    title: "Two Implementations, One Truth",
    date: "November 2026",
    excerpt:
      "A Go simulator and a TypeScript port can both look right and still describe different systems. Here's how I check, and what happened when I audited the check.",
    tag: "Case Study",
  },
  {
    slug: "/blog/learning-raft-in-go",
    title: "Learning Raft by Building It in Go",
    date: "October 2026",
    excerpt:
      "What building Raft actually taught me about distributed systems, from RPC and timeouts to why agreeing is harder than connecting.",
    tag: "Distributed Systems",
  },
  {
    slug: "/blog/why-i-built-reqit",
    title: "Why I Built Reqit",
    date: "October 2026",
    excerpt:
      "reqit started with a small annoyance: an API client that wanted an account before it would send a request. So I built the one I wanted.",
    tag: "Build Story",
  },
];

const paths = [
  {
    title: "New to distributed systems",
    note: "Start here if consensus and at-least-once still feel abstract.",
    posts: [
      { label: "Learning Raft in Go", to: "/blog/learning-raft-in-go" },
      { label: "Dead-letter queues", to: "/blog/dead-letter-queues-safe-recovery" },
    ],
  },
  {
    title: "Inside reqit",
    note: "How one Go package ended up behind everything reqit does.",
    posts: [
      { label: "Why I built reqit", to: "/blog/why-i-built-reqit" },
      { label: "The HTTP engine", to: "/blog/http-request-engine-in-go" },
      { label: "One engine, many doors", to: "/blog/one-engine-many-doors" },
      { label: "Signed run receipts", to: "/blog/signed-run-receipts" },
    ],
  },
  {
    title: "Production judgment",
    note: "Failure stories, and what I'd do differently.",
    posts: [
      { label: "Two implementations, one truth", to: "/blog/two-implementations-one-truth" },
      { label: "Safe DLQ recovery", to: "/blog/dead-letter-queues-safe-recovery" },
      { label: "Verifiable run receipts", to: "/blog/signed-run-receipts" },
    ],
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
          marginBottom: 32,
        }}
      >
        Things I&apos;ve had to figure out while building. Mostly from bugs, outages, and code I had to maintain.
      </p>

      <div className="reading-paths">
        <div className="reading-paths-head">
          <p className="label">Reading paths</p>
          <Link to="/work" className="reading-work-link">
            Case studies
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {paths.map((path, index) => (
          <div key={path.title} className="reading-path">
            <span className="reading-path-num font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="reading-path-body">
              <div className="reading-path-title-line">
                <h2>{path.title}</h2>
                <span className="reading-path-note">{path.note}</span>
              </div>
              <div className="reading-path-links">
                {path.posts.map((post) => (
                  <Link key={post.to + post.label} to={post.to}>
                    {post.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="blog-list-head">
        <p className="label">All writing</p>
        <span className="font-mono">{posts.length} posts</span>
      </div>

      <div className="blog-posts">
        {posts.map((post) => (
          <div className="post-row" key={post.slug}>
            <Link to={post.slug} className="post-link">
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

            <LikeButton slug={post.slug} variant="compact" />
          </div>
        ))}
      </div>

      <div className="work-cta">
        <div>
          <h2>Open to backend, platform, and consulting work.</h2>
          <p>
            I can walk through any of these in more detail, or help you build one.
          </p>
        </div>
        <div className="work-cta-actions">
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
          <a href="mailto:halxdocs@gmail.com" className="email-link">
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
