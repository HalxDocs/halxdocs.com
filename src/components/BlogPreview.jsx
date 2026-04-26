import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const posts = [
  {
    slug: "/blog/symphony-wedding-app",
    title: "I Built a Digital Wedding Invitation App in a Week — Here's What Happened",
    date: "2026",
    excerpt:
      "Nigerian weddings deserve better than a WhatsApp JPEG. So I built Symphony — a full wedding invitation web app with animated envelopes, live RSVPs, and a guest dashboard. Here's how it came together.",
    tag: "Build Story",
  },
  {
    slug: "/blog/bibleplus-production-fix",
    title: "Two Production Bugs, One Weekend, Zero Downtime — Fixing the BiblePlus Backend on Render",
    date: "2025",
    excerpt:
      "The app was crashing in production. A missing API key was taking the whole service down. The daily quiz wasn't delivering consistent content. Here's how I fixed both — and what I learned about production deployments on Render.",
    tag: "Engineering",
  },
];

export default function BlogPreview() {
  return (
    <section
      id="blog"
      className="relative py-28 sm:py-36"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8"
        >
          <div className="max-w-2xl">
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

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "var(--text)",
              }}
            >
              Notes from the build.{" "}
              <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
                Real work, real problems.
              </span>
            </h2>
          </div>

          <Link
            to="/blog"
            className="font-mono inline-flex items-center gap-2 transition-colors"
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--text-muted)",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            All posts
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={post.slug}
                className="group block h-full transition-all hover:-translate-y-1"
                style={{
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  borderRadius: 20,
                  padding: "32px 30px",
                  textDecoration: "none",
                  height: "100%",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div className="flex items-center gap-3 mb-6">
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
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {post.date}
                  </span>
                </div>

                <h3
                  className="font-display mb-5"
                  style={{
                    fontSize: "clamp(22px, 2.4vw, 28px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    color: "var(--text)",
                  }}
                >
                  {post.title}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "var(--text-muted)",
                    marginBottom: 24,
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
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
