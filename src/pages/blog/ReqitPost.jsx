import { Link } from "react-router-dom";

export default function ReqitPost() {
  return (
    <article
      className="pt-36 pb-32"
      style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8">

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
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All writing
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <span
            className="font-mono"
            style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--text-muted)", fontWeight: 600 }}
          >
            Open Source
          </span>
          <span style={{ width: 12, height: 1, background: "var(--border)", display: "block" }} />
          <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            May 2026
          </span>
        </div>

        <h1
          className="font-display mb-6"
          style={{
            fontSize: "clamp(32px, 5vw, 54px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--text)",
          }}
        >
          We built reqit because Postman got too expensive.
        </h1>

        <p style={{ fontSize: "19px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 48 }}>
          A free, offline, Git-first API client for developer teams.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
          {[
            { label: "reqit.vercel.app", href: "https://reqit.vercel.app" },
            { label: "github.com/HalxDocs/reqit", href: "https://github.com/HalxDocs/reqit" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
                color: "var(--text-muted)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <Prose>

          <H2>Let's be honest about Postman.</H2>
          <p>
            It used to be the best tool for testing APIs. Lightweight, free, got the job done. Every developer
            had it installed. Every team used it.
          </p>
          <p>Then it changed.</p>
          <p>
            In early 2026, Postman removed free team collaboration entirely. If you want to share API
            collections with even one other person on your team, you now pay $19 per user per month. For a
            team of five developers, that's $95 a month — $1,140 a year — just to share some request files.
          </p>

          <Callout>
            $95/month for 5 devs just to share API collections. There had to be a better way.
          </Callout>

          <p>So we built reqit.</p>
          <p>
            It's a free, open source desktop API client where your collections live in Git — not someone's
            cloud. You already use Git every day. reqit just makes your API collections part of that same
            workflow.
          </p>

          <H2>An API client that thinks like a developer.</H2>
          <p>
            At its core, reqit does what Postman does — you type in a URL, pick a method (GET, POST, PUT,
            DELETE), add your headers and body, and fire the request. You see the response instantly.
          </p>
          <p>The difference is what happens to your work after that.</p>
          <p>
            In Postman, your collections live in Postman's cloud. To share them with your team, you need a
            paid plan. To see the history of changes, you need their version control feature. To work offline,
            you're limited.
          </p>
          <p>
            In reqit, your collections are just plain JSON files sitting in a folder on your computer. That
            folder is a Git repo. You commit your changes, push to GitHub or GitLab, and your whole team pulls
            and stays in sync. No account. No subscription. Just Git.
          </p>

          <Callout>
            Your API collections are just files. They should live where your other files live — in Git.
          </Callout>

          <H2>The problem we kept running into.</H2>
          <p>Here is what a typical day looks like for a dev team using Postman today.</p>

          <ol style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 20, margin: "28px 0" }}>
            {[
              { n: "1", title: "Someone updates an API endpoint", body: "They edit the collection in Postman. Unless everyone is on a paid plan and syncing to Postman's cloud, nobody else knows the collection changed." },
              { n: "2", title: "A junior dev joins the team", body: "You have to manually export collections and send them over Slack or email. They import it. It gets out of date by next week. Repeat forever." },
              { n: "3", title: "You want to see what changed last week", body: "Postman has a version history feature. It is behind the paid plan. On the free plan, you cannot see it." },
              { n: "4", title: "You want to work offline on a flight", body: "Some things sync, some things don't. You spend the first 20 minutes figuring out what state your collections are in." },
              { n: "5", title: "Your company's security team asks where API keys are stored", body: "In Postman's cloud. On their servers. In another country, potentially. Good luck explaining that one." },
            ].map((item) => (
              <li key={item.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", background: "var(--surface-2)",
                  border: "1px solid var(--border)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0,
                  color: "var(--text)", marginTop: 1,
                }}>
                  {item.n}
                </span>
                <div>
                  <strong style={{ color: "var(--text)", display: "block", marginBottom: 4 }}>{item.title}</strong>
                  <span>{item.body}</span>
                </div>
              </li>
            ))}
          </ol>

          <p>
            None of these problems are hard to solve. They are just not in Postman's interest to solve —
            because keeping you dependent on their cloud is how they charge you money.
          </p>

          <H2>Simple idea. Powerful result.</H2>
          <p>
            When you open reqit, you point it at a folder on your computer. That folder is your workspace.
            Inside it, reqit creates a clean structure:
          </p>

          <CodeTable rows={[
            ["collections/", "All your request collections as JSON files"],
            ["environments/", "Your base URLs, variables, and settings"],
            ["environments/*.secrets.json", "Your API keys — gitignored, stays on your machine"],
            [".locks/", "Temporary files that show who is editing what"],
          ]} />

          <p>
            That folder is also a Git repo. You push it to GitHub or GitLab just like you would any codebase.
            Your teammates clone it. When someone adds a new request or updates an endpoint, they commit and
            push. Everyone else pulls. reqit detects the change and reloads automatically.
          </p>

          <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: 12 }}>The collaboration loop</p>
          <CodeTable rows={[
            ["1. Edit", "You change a request in the reqit UI"],
            ["2. Save", "reqit writes the change to the JSON file on disk"],
            ["3. Commit", "You hit 'Commit & Push' inside reqit — no terminal needed"],
            ["4. Push", "reqit pushes to your shared Git repo (GitHub, GitLab, etc.)"],
            ["5. Pull", "Teammates hit 'Pull' — reqit fetches and reloads the UI"],
            ["6. Done", "Everyone is in sync — no cloud, no paid plan, no drama"],
          ]} />

          <H2>Phase 1 is live. More is on the way.</H2>
          <p>
            reqit is being built in public. Phase 1 is out now and fully working. Two more features are
            actively being developed.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "28px 0" }}>
            <Phase status="done" title="Phase 1 — Git-First API Testing (Live Now)">
              Test your endpoints, save requests and responses, commit everything to Git, push to share with
              your team. Works fully offline. Free forever.
            </Phase>
            <Phase status="done" title="Phase 2 — Contract Testing (Live)">
              Link your OpenAPI spec to a collection. After every request, reqit checks if the response
              matches the spec. Green badge = all good. Red badge = something drifted. No cloud monitors.
              No paid plan. Just instant local feedback.
            </Phase>
            <Phase status="done" title="Phase 3 — Local Mock Server (Live)">
              One click spins up a real HTTP server on localhost using your saved responses. Simulate 500
              errors, timeouts, slow responses — without touching the real API. Works offline. Postman charges
              for this. reqit won't.
            </Phase>
          </div>

          <H2>What about Bruno, Hoppscotch, or Insomnia?</H2>
          <p>
            There are other Postman alternatives out there. Here is an honest look at how reqit compares.
          </p>

          <CodeTable rows={[
            ["Bruno", "Git-native files, but still need terminal to commit and push"],
            ["Hoppscotch", "Beautiful web UI — cloud-dependent, no offline, no Git"],
            ["Insomnia", "Polished desktop UI — sync requires paid plan, no Git-first approach"],
            ["Postman", "Mature feature set — paid team features, cloud-dependent, heavy"],
            ["reqit", "Git GUI + offline + free — still early, more features coming"],
          ]} />

          <p>
            The honest difference with Bruno is that Bruno stores files locally too — but you still need a
            terminal to commit and push. reqit gives you the full Git workflow inside the app. No terminal
            needed. That matters for teams that have non-terminal developers.
          </p>

          <H2>Fast by default. Light by design.</H2>
          <p>
            Most desktop apps are built on Electron — basically a full Chrome browser running inside a
            wrapper. That is why apps like Postman and VS Code take several seconds to open and use hundreds
            of megabytes of RAM just sitting there.
          </p>
          <p>reqit is built with Wails and Go.</p>
          <p>
            Wails is a framework that lets you build desktop apps using Go for the backend and React for the
            UI. The result is a native binary — small, fast, and light. No bundled browser. No Node.js
            runtime. Just your computer running Go.
          </p>

          <CodeTable rows={[
            ["Go + Wails", "Native desktop app — fast startup, low memory, no Electron"],
            ["go-git", "Pure Go Git engine — no system Git binary required"],
            ["fsnotify", "Watches for file changes and reloads UI automatically"],
            ["React + TypeScript", "Fast, typed frontend — reliable UI"],
            ["Plain JSON", "Human-readable collections — easy to diff in Git"],
          ]} />

          <H2>Your secrets stay on your machine.</H2>
          <p>This one matters a lot to us.</p>
          <p>
            In reqit, environment variables are split into two files. Your base config — base URLs, timeout
            settings, non-sensitive values — goes in a regular JSON file that gets committed to Git.
          </p>
          <p>
            Your sensitive values — API keys, tokens, passwords, test credentials — go in a separate secrets
            file. That file is automatically added to .gitignore when you create your workspace. It never
            touches the repo. It never leaves your machine.
          </p>

          <CodeTable rows={[
            ["dev.json", "base_url, timeout_ms, feature flags → committed to Git"],
            ["dev.secrets.json", "api_key, auth_token, passwords → gitignored, stays local"],
          ]} />

          <p>
            Your team's Git host — GitHub, GitLab, Bitbucket — handles access control. Only people with repo
            access can pull collections. That is the same access control you already manage for your code.
          </p>

          <H2>Download reqit. It's free.</H2>
          <p>
            Phase 1 is live and working. Download reqit, point it at a folder, and start testing your APIs.
            If you have a Git repo, you have everything you need for team collaboration.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "24px 0 32px" }}>
            {[
              { label: "reqit.vercel.app", href: "https://reqit.vercel.app", desc: "Download the app — Mac, Windows, Linux" },
              { label: "github.com/HalxDocs/reqit", href: "https://github.com/HalxDocs/reqit", desc: "Star the repo — it helps more than you think" },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3, whiteSpace: "nowrap" }}
                >
                  {l.label}
                </a>
                <span style={{ fontSize: 14, color: "var(--text-muted)" }}>— {l.desc}</span>
              </div>
            ))}
          </div>

          <Callout>
            We are building reqit in public. Every piece of feedback shapes what gets built next.
          </Callout>

          <p>
            Thanks for reading. If this resonates with you — share it with a developer who is still paying
            for Postman. They will thank you.
          </p>

          <p style={{ marginTop: 32, fontWeight: 600, color: "var(--text)" }}>
            — Kamsy · <a href="https://halxdocs.com" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>halxdocs.com</a> · <a href="https://x.com/HalxDocs" target="_blank" rel="noreferrer" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}>@HalxDocs</a>
          </p>

        </Prose>
      </div>
    </article>
  );
}

function H2({ children }) {
  return (
    <h2
      className="font-display"
      style={{
        fontSize: "clamp(22px, 3vw, 30px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        color: "var(--text)",
        marginTop: 56,
        marginBottom: 20,
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
        borderLeft: "3px solid var(--text-muted)",
        paddingLeft: 20,
        margin: "28px 0",
        fontSize: 16,
        fontStyle: "italic",
        color: "var(--text)",
        lineHeight: 1.7,
      }}
    >
      {children}
    </blockquote>
  );
}

function CodeTable({ rows }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        overflow: "hidden",
        margin: "20px 0 28px",
        fontSize: 13,
      }}
    >
      {rows.map(([key, val], i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 16,
            padding: "11px 16px",
            borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
            flexWrap: "wrap",
          }}
        >
          <code
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: "var(--text)",
              minWidth: 200,
              flexShrink: 0,
            }}
          >
            {key}
          </code>
          <span style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>{val}</span>
        </div>
      ))}
    </div>
  );
}

function Phase({ status, title, children }) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "18px 20px",
        background: "var(--surface)",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>
        {status === "done" ? "✓" : "◻"}
      </span>
      <div>
        <strong style={{ color: "var(--text)", display: "block", marginBottom: 6, fontSize: 15 }}>
          {title}
        </strong>
        <span style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.65 }}>{children}</span>
      </div>
    </div>
  );
}

function Prose({ children }) {
  return (
    <div
      style={{ fontSize: "17px", lineHeight: 1.8, color: "var(--text-muted)" }}
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
