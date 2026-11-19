import { Link } from "react-router-dom";
import LikeButton from "../../components/LikeButton";

export default function HttpRequestEngine() {
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
            Engineering
          </span>
          <span
            style={{ width: 12, height: 1, background: "var(--border)", display: "block" }}
          />
          <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            November 2026
          </span>
        </div>

        <h1
          className="mb-4"
          style={{
            fontSize: "26px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: "var(--text)",
          }}
        >
          Building an HTTP Request Engine in Go
        </h1>

        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 40 }}>
          What actually happens behind the Send button?
        </p>

        <Prose>
          <p>
            While building{" "}
            <a
              href="https://reqit.dev"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Reqit
            </a>
            , my open-source API client and Postman alternative, one of the most interesting
            engineering challenges has been implementing the HTTP request execution engine.
          </p>
          <p>
            Sending an HTTP request might look simple from the outside. You provide a URL, select a
            method, add headers, and click Send. But what actually happens behind that button?
          </p>
          <p>
            In Reqit, I implemented a request execution pipeline in Go that handles several
            responsibilities.
          </p>

          <div style={{ margin: "8px 0 28px" }}>
            <Step n="01" title="Connection Management">
              <p style={{ margin: 0 }}>
                I use Go&rsquo;s <code>http.Transport</code> with connection pooling to reuse
                connections instead of repeatedly establishing new ones.
              </p>
            </Step>

            <Step n="02" title="Request Construction">
              <p style={{ margin: 0 }}>
                The engine builds URLs, handles query parameters, prepares request bodies, and
                applies custom headers.
              </p>
            </Step>

            <Step n="03" title="Authentication">
              <p style={{ margin: 0 }}>
                It supports different authentication mechanisms, including Bearer, Basic, API Key,
                and OAuth2.
              </p>
            </Step>

            <Step n="04" title="Timeout and Cancellation">
              <p style={{ margin: 0 }}>
                Requests run with context-based timeouts, allowing execution to be cancelled or
                stopped when necessary.
              </p>
            </Step>

            <Step n="05" title="Performance Monitoring">
              <p style={{ margin: "0 0 10px" }}>
                One feature I particularly enjoyed implementing was HTTP request timing using
                Go&rsquo;s <code>net/http/httptrace</code>.
              </p>
              <p style={{ margin: "0 0 8px" }}>This allows Reqit to measure:</p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  listStyleType: "disc",
                  listStylePosition: "outside",
                }}
              >
                <li style={{ marginBottom: 4 }}>DNS lookup time</li>
                <li style={{ marginBottom: 4 }}>TCP connection time</li>
                <li style={{ marginBottom: 4 }}>TLS handshake time</li>
                <li style={{ marginBottom: 4 }}>Time to First Byte (TTFB)</li>
                <li>Response download time</li>
              </ul>
              <p style={{ margin: "10px 0 0" }}>
                Rather than displaying only the total response time, Reqit provides insight into
                where time is spent during request execution.
              </p>
            </Step>

            <Step n="06" title="Response Processing">
              <p style={{ margin: 0 }}>
                The engine processes response headers, cookies, body content, binary responses, and
                response size.
              </p>
            </Step>
          </div>

          <p>
            Building this feature reminded me that developing an API client isn&rsquo;t simply about
            sending HTTP requests. It&rsquo;s about understanding the HTTP lifecycle, managing
            connections, handling failures, and presenting useful information to developers.
          </p>
          <p>I&rsquo;m continuing to explore these engineering challenges while building Reqit.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "28px 0 32px" }}>
            <a
              href="https://github.com/HalxDocs/reqit/blob/main/flux/internal/requester/requester.go"
              target="_blank"
              rel="noreferrer"
              className="font-mono"
              style={{
                fontSize: 11.5,
                color: "var(--text)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                alignSelf: "flex-start",
                wordBreak: "break-all",
              }}
            >
              flux/internal/requester/requester.go
            </a>
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
              The request engine, on GitHub.
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

        <LikeButton slug="/blog/http-request-engine-in-go" />
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

function Step({ n, title, children }) {
  return (
    <div style={{ padding: "16px 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <span
          className="font-mono"
          style={{ fontSize: 10.5, color: "var(--text-dim)", minWidth: 18 }}
        >
          {n}
        </span>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.35,
            color: "var(--text)",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      <div
        style={{
          paddingLeft: 30,
          fontSize: 14,
          lineHeight: 1.7,
          color: "var(--text-muted)",
        }}
      >
        {children}
      </div>
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
        .prose-content code {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 0.88em;
          color: var(--text);
          background: rgba(127, 127, 127, 0.12);
          padding: 1px 5px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
