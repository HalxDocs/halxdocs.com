import { Link } from "react-router-dom";

export default function BiblePlusPost() {
  return (
    <article
      className="pt-36 pb-32"
      style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8">

        <Link
          to="/blog"
          className="font-mono inline-flex items-center gap-2 mb-12 hover:text-white transition-colors"
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "#888",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All writing
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#E94560",
              fontWeight: 600,
            }}
          >
            Engineering
          </span>
          <span style={{ width: 12, height: 1, background: "#2A2A2A", display: "block" }} />
          <span className="font-mono" style={{ fontSize: "11px", color: "#888" }}>
            2025
          </span>
        </div>

        <h1
          className="font-display mb-12"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "#F0F0F0",
          }}
        >
          Two Production Bugs, One Weekend, Zero Downtime — Fixing the BiblePlus Backend on Render
        </h1>

        <Prose>
          <p>
            Some of the best engineering lessons don't come from building new things. They come from
            inheriting someone else's production system and having to keep it alive while you fix it.
          </p>
          <p>That's what happened with BiblePlus.</p>
          <p>
            BiblePlus is a Bible quiz and devotional app. I was brought in to sort out the backend, which was
            running on Render and had two problems that were making the product unreliable. I had a weekend.
            Here's what I found and how I fixed it.
          </p>

          <H2>Bug 1: The Hard Crash</H2>
          <p>
            The first issue was simple and brutal: the server was crashing on startup when a specific API key
            wasn't present in the environment.
          </p>
          <p>
            The code was reading an environment variable at module load time, and if it wasn't there, throwing
            an error that killed the process. No graceful handling. No fallback. Just a crash.
          </p>
          <p>
            On Render, environment variables are set in the dashboard. The key had been accidentally omitted
            from the production environment config. Every deploy was failing silently from the start.
          </p>
          <p>
            The fix had two parts. First, I added the missing key to Render's environment variable settings.
            Second — and more importantly — I hardened the startup code to validate required environment
            variables at boot and fail with a clear, descriptive error message rather than a cryptic crash
            trace.
          </p>
          <p>
            A server that fails with 'Missing required environment variable: FIREBASE_API_KEY' is infinitely
            easier to debug than one that fails with a null pointer exception three layers deep.
          </p>

          <H2>Bug 2: The Gitignored Secret</H2>
          <p>
            The second issue was trickier. The app used Firebase — specifically, a service account JSON file
            for server-side Firebase Admin SDK authentication. That file had been added to .gitignore, which
            is the right security practice. But it also meant the file was never in the repository, which
            meant it was never on Render.
          </p>
          <p>
            The service was trying to initialise Firebase Admin at startup, couldn't find the service account
            file, and failing.
          </p>
          <p>
            The solution: environment variables. Instead of a file, I serialised the service account JSON into
            a single environment variable — base64 encoded to avoid any newline or special character issues.
            At runtime, the app reads the variable, decodes it, parses the JSON, and passes it directly to the
            Firebase Admin initialiser.
          </p>
          <p>
            This is the correct pattern for secrets in containerised or PaaS deployments. Files get gitignored
            and forgotten. Environment variables are managed by the platform and persist across deploys.
          </p>

          <H2>Bug 3: The Unreliable Daily Quiz</H2>
          <p>
            Once the server was stable, I looked at the actual product functionality. The daily quiz feature —
            which should serve the same quiz question to all users on the same day — was not behaving
            consistently.
          </p>
          <p>
            The original implementation was pulling questions dynamically in a way that could return different
            results for different users depending on timing. For a daily quiz, you want deterministic
            behaviour — everyone gets question 47 on Tuesday, everyone gets question 112 on Wednesday.
          </p>
          <p>
            I rebuilt the QuizDailyService around a hardcoded verse pool: a JSON file containing 205 carefully
            selected questions. The daily question is selected using a deterministic seed algorithm — take the
            current date, hash it into a number, use that number to index into the question pool. Same date,
            same question, every time, for every user.
          </p>
          <p>
            No database dependency for question selection. No randomness. Fully predictable.
          </p>

          <H2>What I Took Away</H2>
          <p>
            <strong>Always validate environment variables at startup.</strong> Not buried in a function that
            runs when a feature is used — at startup. If something is required, check for it immediately and
            fail loudly if it's missing.
          </p>
          <p>
            <strong>Never rely on files for secrets in a PaaS deployment.</strong> Render, Railway, Heroku,
            Vercel — none of them have access to your gitignored files. Use environment variables. Always.
          </p>
          <p>
            <strong>Determinism is a feature.</strong> For any system where consistent, reproducible output
            matters — daily content, scheduled jobs, seeded random selection — design for determinism
            explicitly.
          </p>
          <p>
            <strong>Production debugging is different from development debugging.</strong> Clear error messages
            and good logging aren't nice-to-haves — they're the difference between a two-hour fix and a
            two-day investigation.
          </p>

          <p>
            The app is stable now. Both bugs are fixed. The daily quiz is consistent. The Firebase integration
            is solid.
          </p>
          <p>
            If you're building on Render and hitting environment or deployment issues, feel free to DM me on
            X. I've seen a few of these patterns now and most of them have clean solutions.
          </p>

          <p style={{ marginTop: 32, fontWeight: 600, color: "#F0F0F0" }}>— HalxDocs</p>
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
        fontSize: "clamp(24px, 3vw, 32px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        color: "#F0F0F0",
        marginTop: 56,
        marginBottom: 20,
      }}
    >
      {children}
    </h2>
  );
}

function Prose({ children }) {
  return (
    <div
      style={{
        fontSize: "17px",
        lineHeight: 1.8,
        color: "#bbb",
      }}
      className="prose-content"
    >
      {children}
      <style>{`
        .prose-content > p {
          margin-bottom: 1.4em;
        }
        .prose-content strong {
          color: #F0F0F0;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
