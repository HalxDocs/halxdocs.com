import { Link } from "react-router-dom";
import LikeButton from "../../components/LikeButton";

export default function RaftPost() {
  return (
    <article
      className="pt-12 pb-20"
      style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}
    >
      <div className="mx-auto max-w-[640px] px-5">
        <BackLink />

        <div className="flex items-center gap-3 mb-8">
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--text-muted)",
              fontWeight: 600,
            }}
          >
            Distributed Systems
          </span>
          <span
            style={{ width: 12, height: 1, background: "var(--border)", display: "block" }}
          />
          <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            October 2026
          </span>
        </div>

        <h1
          className="mb-6"
          style={{
            fontSize: "26px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: "var(--text)",
          }}
        >
          Learning Raft by Building It in Go
        </h1>

        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 40 }}>
          What implementing a consensus algorithm actually teaches you about distributed systems.
        </p>

        <Prose>
          <p>
            I've been working on a small Raft project in Go, and honestly, it's been a good way to
            understand distributed systems beyond just reading about them.
          </p>
          <p>
            Raft is a consensus algorithm that helps multiple servers agree on the same state, even
            when some of them run into problems. Sounds simple when you read it, but implementing it
            makes you appreciate how much is happening under the hood.
          </p>
          <p>
            So far, I've been working on the node structure, RPC communication, and connecting the
            client to the nodes. It's still a work in progress, but I'm already learning a lot from
            the process.
          </p>

          <H2>Communication is not consensus</H2>

          <Callout>
            One thing this project is teaching me is that getting two nodes to communicate is one
            thing; getting multiple nodes to agree reliably is a completely different problem.
          </Callout>

          <p>
            I'm also getting more comfortable with Go's concurrency model, network communication,
            timeouts, and thinking about what happens when things don't go as planned.
          </p>

          <H2>A few things I've learned along the way</H2>

          <div style={{ margin: "4px 0 28px" }}>
            <Insight n="01" lead="Distributed systems aren't just about communication.">
              They're about handling what happens when communication fails.
            </Insight>
            <Insight n="02" lead="Timeouts matter.">
              A request that hasn't received a response doesn't necessarily mean the other server is
              dead.
            </Insight>
            <Insight n="03" lead="Concurrency needs careful thinking.">
              Multiple goroutines accessing shared state can introduce bugs that aren't always easy
              to reproduce.
            </Insight>
            <Insight n="04" lead="Understanding the why matters.">
              It's tempting to jump straight into implementing leader elections, but understanding
              how nodes communicate first makes the bigger picture easier to grasp.
            </Insight>
          </div>

          <H2>If you're learning distributed systems</H2>

          <p>
            If you're also learning distributed systems, my advice is to build something small
            instead of trying to understand everything at once. Start with two nodes communicating,
            then introduce failures, timeouts, and eventually leader elections.
          </p>
          <p>You'll start asking better questions once you see the problems in your own code.</p>
          <p>
            I'm still learning, and there's more to implement, but that's what makes the project
            interesting. Every new feature introduces another problem to understand.
          </p>
          <p style={{ color: "var(--text)", fontWeight: 500 }}>One step at a time.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "24px 0 32px" }}>
            <a
              href="https://github.com/HalxDocs/raft"
              target="_blank"
              rel="noreferrer"
              className="font-mono"
              style={{
                fontSize: 11.5,
                color: "var(--text)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                alignSelf: "flex-start",
              }}
            >
              github.com/HalxDocs/raft
            </a>
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
              The implementation, in progress.
            </span>
          </div>

          <p style={{ marginTop: 32, fontWeight: 600, color: "var(--text)" }}>
            — HalxDocs ·{" "}
            <a
              href="https://halxdocs.com"
              style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              halxdocs.com
            </a>{" "}
            ·{" "}
            <a
              href="https://x.com/HalxDocs"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              @HalxDocs
            </a>
          </p>
        </Prose>

        <LikeButton slug="/blog/learning-raft-in-go" />
      </div>
    </article>
  );
}

function BackLink() {
  return (
    <Link
      to="/blog"
      className="font-mono inline-flex items-center gap-2 mb-12 transition-colors"
      style={{
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        color: "var(--text-muted)",
        fontWeight: 600,
        textDecoration: "none",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      All writing
    </Link>
  );
}

function H2({ children }) {
  return (
    <h2
      style={{
        fontSize: "17px",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        lineHeight: 1.35,
        color: "var(--text)",
        marginTop: 40,
        marginBottom: 12,
      }}
    >
      {children}
    </h2>
  );
}

function Callout({ children }) {
  return (
    <blockquote
      style={{
        borderLeft: "2px solid var(--text)",
        paddingLeft: 16,
        margin: "24px 0",
        fontSize: 13.5,
        color: "var(--text)",
        lineHeight: 1.65,
      }}
    >
      {children}
    </blockquote>
  );
}

function Insight({ n, lead, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        padding: "10px 0",
        borderTop: "1px solid var(--border)",
      }}
    >
      <span className="font-mono" style={{ fontSize: 10.5, color: "var(--text-dim)", minWidth: 18 }}>
        {n}
      </span>
      <p style={{ margin: 0 }}>
        <strong style={{ color: "var(--text)", fontWeight: 600 }}>{lead}</strong> {children}
      </p>
    </div>
  );
}

function Prose({ children }) {
  return (
    <div
      style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-muted)" }}
      className="prose-content"
    >
      {children}
      <style>{`
        .prose-content > p { margin-bottom: 1.4em; }
        .prose-content strong { color: var(--text); font-weight: 600; }
      `}</style>
    </div>
  );
}
