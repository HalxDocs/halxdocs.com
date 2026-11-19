import { Link } from "react-router-dom";
import LikeButton from "../../components/LikeButton";

export default function WhyIBuiltReqit() {
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
            Build Story
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
          Why I Built Reqit
        </h1>

        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 40 }}>
          How a frustrating workflow led to a fast, local-first, Git-native API client.
        </p>

        <Prose>
          <p>Reqit started with a problem I was experiencing myself.</p>
          <p>
            My laptop has limited resources, and running a heavy application on it wasn't always a
            pleasant experience. I was using Postman to test my APIs, but the loading times and lag
            started getting frustrating. Sometimes, I just wanted to open the app, send a request,
            inspect the response, and get back to writing code.
          </p>
          <p>
            Instead, I had to deal with an application that felt heavier than what I needed. I also
            didn't like having to create an account just to get started with testing my APIs, and
            when I needed team collaboration features, those came with paid plans.
          </p>
          <p>
            I started thinking: What if I built an API client that focused on what developers
            actually need, without all the extra weight?
          </p>
          <p>That's how Reqit started.</p>
          <p>
            I wanted something fast, lightweight, local-first, and open source. Something I could
            open and use without being forced into an account or having my work depend on someone
            else's cloud. I also wanted my API collections to be files I could keep in Git and
            manage like the rest of my project.
          </p>
          <p>
            Building Reqit has taught me a lot more about APIs than I expected. It's one thing to
            send an HTTP request from your code. It's another thing to build a tool that handles
            different HTTP methods, headers, query parameters, authentication, request bodies,
            response inspection, environments, and all the little edge cases developers run into.
          </p>
          <p>
            Working on features like OAuth 2.0 also pushed me to understand authentication flows
            better instead of treating them as something that just magically works.
          </p>
          <p>
            I've also had to think about application performance, data storage, security, and how to
            make features useful without making the application unnecessarily complicated.
          </p>
          <p>
            One thing I've come to appreciate is that building developer tools is a learning
            experience of its own. When you're building something other developers will rely on, the
            small details matter.
          </p>
          <p>
            Reqit has grown beyond the tool I initially wanted for myself. It's now an open-source,
            local-first, Git-native API client, and seeing other developers download it and give it
            stars has been encouraging.
          </p>
          <p>
            I'm still improving it, but I'm glad I decided to solve a problem I was personally
            experiencing rather than just complain about it.
          </p>
          <p>
            If you're building software and something in your workflow keeps frustrating you, pay
            attention to it. Sometimes, that's a good place to start building.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "24px 0 32px" }}>
            {[
              { label: "reqit.dev", href: "https://reqit.dev", desc: "Download the app — Mac, Windows, Linux" },
              { label: "github.com/HalxDocs/reqit", href: "https://github.com/HalxDocs/reqit", desc: "Star the repo — it helps more than you think" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono"
                  style={{ fontSize: 11.5, color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3, whiteSpace: "nowrap" }}
                >
                  {l.label}
                </a>
                <span style={{ fontSize: 14, color: "var(--text-muted)" }}>— {l.desc}</span>
              </div>
            ))}
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

        <LikeButton slug="/blog/why-i-built-reqit" />
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
