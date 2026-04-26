import { Link } from "react-router-dom";

const posts = [
  {
    slug: "/blog/symphony-wedding-app",
    title: "I Built a Digital Wedding Invitation App in a Week — Here's What Happened",
    date: "2025",
    excerpt:
      "Nigerian weddings deserve better than a WhatsApp JPEG. So I built Symphony — a full wedding invitation web app with animated envelopes, live RSVPs, and a guest dashboard.",
    tag: "Build Story",
  },
  {
    slug: "/blog/bibleplus-production-fix",
    title: "Two Production Bugs, One Weekend, Zero Downtime — Fixing the BiblePlus Backend on Render",
    date: "2025",
    excerpt:
      "The app was crashing in production. A missing API key was taking the whole service down. The daily quiz wasn't delivering consistent content. Here's how I fixed both.",
    tag: "Engineering",
  },
];

export default function Blog() {
  return (
    <section
      className="pt-36 pb-32"
      style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8">

        <Link
          to="/"
          className="font-mono inline-flex items-center gap-2 mb-12 hover:text-white transition-colors"
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--text-muted)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        <div className="flex items-center gap-3 mb-7">
          <span style={{ width: 18, height: 1, background: "var(--accent)", display: "block" }} />
          <span
            className="font-mono"
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            Writing
          </span>
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            color: "var(--text)",
            marginBottom: 24,
          }}
        >
          Notes from the build.
        </h1>

        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            maxWidth: 560,
            marginBottom: 56,
          }}
        >
          Thoughts on building products, tools, and systems — from real work, real bugs, real problems.
        </p>

        <div className="space-y-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={post.slug}
              className="group block transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--surface)",
                border: "0.5px solid var(--border)",
                borderRadius: 16,
                padding: "28px 28px",
                textDecoration: "none",
                transition: "border-color 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono"
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--accent)",
                    fontWeight: 600,
                  }}
                >
                  {post.tag}
                </span>
                <span style={{ width: 12, height: 1, background: "var(--border)", display: "block" }} />
                <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  {post.date}
                </span>
              </div>

              <h2
                className="font-display mb-3"
                style={{
                  fontSize: "clamp(20px, 2.4vw, 26px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  color: "var(--text)",
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "var(--text-muted)",
                  marginBottom: 18,
                }}
              >
                {post.excerpt}
              </p>

              <span
                className="font-mono inline-flex items-center gap-2"
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--text)",
                  fontWeight: 600,
                }}
              >
                Read more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
