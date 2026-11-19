import { Link } from "react-router-dom";
import LikeButton from "../../components/LikeButton";

export default function OneEngineManyDoors() {
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
            Architecture
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
          One Engine, Many Doors
        </h1>

        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 40 }}>
          How an HTTP request actually travels through reqit.
        </p>

        <Prose>
          <p>
            Most API clients look the same from the outside: you type a URL, press Send, and JSON
            appears. The interesting part is everything between those two events &mdash; and the
            design question that decides whether the app stays coherent as it grows:{" "}
            <em>where does the request actually live?</em>
          </p>
          <p>
            In reqit, the answer is one Go package. A desktop app, a CLI, a collection runner, a
            scheduler, a load tester and an MCP server for AI agents all end up in the same
            function. This post is about how that center holds, and what connects to it.
          </p>

          <Section title="The boundary: a payload, not a form">
            <p>
              The frontend never sends raw HTTP. It sends a <code>RequestPayload</code> &mdash;
              method, URL, headers, params, body, auth, scripts, timeout, optional client
              certificate. The request <em>editor</em> is a state shape; the payload is the
              contract.
            </p>
            <p>
              Before that payload crosses the bridge, the frontend resolves variables. That
              resolution has three layers, and the order matters:
            </p>

            <ol className="layers">
              <li>
                <strong>Collection variables</strong> &mdash; scoped to the folder the request came
                from.
              </li>
              <li>
                <strong>Environment variables</strong> &mdash; the active environment.
              </li>
              <li>
                <strong>Vault references</strong> &mdash; a value like{" "}
                <code>{"{{VAULT_STRIPE_KEY}}"}</code> is not a string to substitute. It is an
                instruction: fetch <code>STRIPE_KEY</code> from the configured secret store
                (1Password, HashiCorp Vault, AWS Secrets Manager) <em>now</em>.
              </li>
            </ol>

            <p>
              The vault values are fetched once per send, held in memory for the lifetime of the
              request, and never written to disk. That is the whole reason the resolution happens
              in the app layer rather than in the engine: the engine receives a plaintext payload
              and knows nothing about secrets. The CLI and runner resolve variables from a
              scrubbed environment instead. One engine, two trust models.
            </p>
            <p>
              A collection variable with the same name wins over the vault. This is not an accident
              &mdash; it is what lets you pin a value locally while keeping the vault reference as
              the fallback everyone else uses.
            </p>
          </Section>

          <Section title="The engine">
            <p>
              <code>requester.Execute</code> is deliberately boring. It:
            </p>
            <ul className="bullets">
              <li>Joins the URL with enabled query params.</li>
              <li>Builds the body &mdash; JSON, form-encoded, multipart, or raw.</li>
              <li>
                Applies auth. Bearer, token, Basic, API key (header or query), and OAuth 2.0. For
                OAuth, the payload carries either a token or a <code>tokenRef</code> into the OS
                keychain, so a scheduled run can execute from a payload that contains no secret at
                all.
              </li>
              <li>
                Attaches a <code>User-Agent</code> derived from the build version.
              </li>
              <li>
                Sends through a shared <code>http.Transport</code> with a connection pool, or a
                per-request transport when the request supplies a client certificate.
              </li>
            </ul>

            <p>Two things are worth calling out because they are easy to get wrong.</p>

            <Note title="Cookie handling is a jar, not a header">
              The desktop app passes a persisted <code>http.CookieJar</code>, so{" "}
              <code>Set-Cookie</code> from one request is available to the next. The CLI and MCP
              pass <code>nil</code> &mdash; they are one-shot processes and should not silently
              inherit session state.
            </Note>

            <Note title="The SSRF guard is opt-in, and the MCP server turns it on">
              The same function that executes a user&rsquo;s request also executes a model&rsquo;s
              request. The validator allows only <code>http</code>/<code>https</code>, blocks
              literal private IPs and internal hostnames, and resolves the hostname to check{" "}
              <em>every</em> address it returns. Checking only the string would leave the classic
              DNS-rebinding hole: a public IP at validation time, a private one at connection
              time. The engine checks whenever <code>ValidateURL</code> is set; the MCP tool sets
              it unconditionally before dispatch.
            </Note>

            <SubHeading>Timing that survives a fast machine</SubHeading>
            <p>
              A local request can finish in under a millisecond, and{" "}
              <code>Duration.Milliseconds()</code> truncates that to <code>0</code>. Reporting
              &ldquo;0ms DNS, 0ms TCP, 0ms total&rdquo; looks like a bug even though the request
              worked. The engine rounds genuinely elapsed spans up to at least 1ms while leaving a
              true zero at zero. Small detail, disproportionate effect on how trustworthy the
              timings feel.
            </p>
            <p>
              The breakdown itself comes from <code>httptrace</code>: DNS lookup, TCP connect, TLS
              handshake, time to first byte, then download. Those are real phases, not estimates.
            </p>
          </Section>

          <Section title="The back half">
            <p>
              When the response returns, the engine stops. Everything after it is{" "}
              <em>pipeline</em>, and it lives in the app bindings:
            </p>
            <ul className="bullets">
              <li>
                <strong>Post-request scripts</strong> run and can export variables back into the
                environment.
              </li>
              <li>
                <strong>Contract validation</strong> runs when the request belongs to a collection
                with an OpenAPI spec. The response is checked against the spec&rsquo;s schema, and
                the result is emitted as its own event.
              </li>
              <li>
                <strong>History</strong> appends the request and result.
              </li>
              <li>
                <strong>Audit</strong> records who ran what, against which URL, with which status.
              </li>
              <li>
                <strong>Usage profiling</strong> increments.
              </li>
            </ul>
            <p>
              This split is the most important architectural decision in the app. The engine has no
              idea what a collection is, what an assertion is, or that a UI exists. That is what
              makes it reusable.
            </p>
          </Section>

          <Section title="One path for streaming">
            <p>
              The desktop app does not call <code>Execute</code> directly. It calls{" "}
              <code>SendRequestStream</code>, which returns immediately, runs the request in a
              goroutine, and emits <code>sse:event</code> for each Server-Sent Event. For a
              non-streaming response, the same path emits one <code>sse:done</code> event with the
              complete result.
            </p>
            <p>
              Using the streaming path for <em>everything</em> means there are not two response
              pipelines to keep in sync. A normal JSON response is just a stream with one event.
              Cancellation is a context cancel &mdash; <code>CancelRequest</code> fires the
              in-flight cancel function, and the goroutine tears down.
            </p>
          </Section>

          <Section title="The same engine from six doors">
            <div className="doors">
              <Door name="Desktop app">
                Pre/post scripts, contract validation, history, audit, cookies
              </Door>
              <Door name="CLI">Runs a collection, prints a deterministic report</Door>
              <Door name="Collection runner">Variables, conditions, retries, assertions</Door>
              <Door name="Scheduler">Fires saved requests on a timer, no UI</Door>
              <Door name="Load tester">Concurrent workers, shared cookie jar</Door>
              <Door name="MCP server">Tools for agents, with SSRF enforced</Door>
              <Door name="Event inspector">Replays captured webhooks</Door>
            </div>

            <p>
              None of them reimplement HTTP. They build a payload, resolve variables their way,
              call <code>Execute</code>, and interpret the result. When the engine gains a fix
              &mdash; say, correct TTFB accounting &mdash; every surface gains it at once.
            </p>
            <p>
              That was not always true. Variable substitution used to exist in several copies: one
              for the CLI, one for the runner, one for MCP. They drifted. The MCP copy matched only{" "}
              <code>{"{{key}}"}</code> with no whitespace, so <code>{"{{ key }}"}</code> silently
              failed. The fix was not a patch to each copy; it was collapsing them into one{" "}
              <code>vars</code> package with a regex and one rule. Dead copies are a maintenance
              tax that compounds quietly.
            </p>
          </Section>

          <Section title="The mirror image">
            <p>
              A request client needs something to talk to, so reqit also ships a mock server. It is
              the same data model inverted: rules match on method, path, headers and query, and
              answer with a configured status, body and delay. It records real traffic so a
              captured request can become a mock. The frontend can point at it with the normal Send
              button &mdash; no special mode. The engine and the mock are symmetric: one consumes
              HTTP, the other produces it, and both speak the same request shape.
            </p>
          </Section>

          <Section title="What the design buys">
            <p>
              The request engine is roughly one file. It is not clever. But because it is the only
              place that speaks HTTP, the app can add a scheduler, an AI tool surface, a load
              tester and a mock server without four more HTTP implementations. The boundaries are:
            </p>
            <ul className="bullets">
              <li>
                <strong>Variables are resolved before the engine.</strong> The engine gets values,
                not references.
              </li>
              <li>
                <strong>Secrets stay in the app layer.</strong> The engine is secret-free.
              </li>
              <li>
                <strong>The pipeline lives above the engine.</strong> Scripts, contracts, history
                and audit are consequences of a response, not part of getting one.
              </li>
            </ul>

            <blockquote className="pull-quote">
              Make the transport boring and total, and put everything interesting around it.
            </blockquote>

            <p>
              If you are building a client, a test runner, or an agent tool, that is the lesson:
              one path in, many doors out.
            </p>
          </Section>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "28px 0 32px" }}>
            <a
              href="https://reqit.dev"
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
              reqit.dev
            </a>
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
              reqit &mdash; the local-first API client.
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

        <LikeButton slug="/blog/one-engine-many-doors" />
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

function Section({ title, children }) {
  return (
    <section style={{ marginTop: 36 }}>
      <h2
        style={{
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          lineHeight: 1.35,
          color: "var(--text)",
          margin: "0 0 14px",
          paddingTop: 18,
          borderTop: "1px solid var(--border)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubHeading({ children }) {
  return (
    <h3
      style={{
        fontSize: 13.5,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        color: "var(--text)",
        margin: "26px 0 10px",
      }}
    >
      {children}
    </h3>
  );
}

function Note({ title, children }) {
  return (
    <div
      style={{
        margin: "18px 0",
        padding: "14px 16px",
        borderLeft: "2px solid var(--text)",
        background: "var(--surface)",
      }}
    >
      <p
        className="font-mono"
        style={{
          margin: "0 0 6px",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--text)",
          fontWeight: 600,
        }}
      >
        {title}
      </p>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: "var(--text-muted)" }}>
        {children}
      </p>
    </div>
  );
}

function Door({ name, children }) {
  return (
    <div className="door-row">
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.5 }}>
        {name}
      </span>
      <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55 }}>
        {children}
      </span>
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
        .prose-content > p,
        .prose-content section p { margin-bottom: 1.4em; }
        .prose-content strong { color: var(--text); font-weight: 600; }
        .prose-content code {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 0.88em;
          color: var(--text);
          background: rgba(127, 127, 127, 0.12);
          padding: 1px 5px;
          border-radius: 4px;
        }
        .prose-content .bullets,
        .prose-content .layers {
          margin: 0 0 1.4em;
          padding-left: 20px;
        }
        .prose-content .bullets { list-style: disc outside; }
        .prose-content .layers { list-style: decimal outside; }
        .prose-content .bullets li,
        .prose-content .layers li {
          margin-bottom: 7px;
          padding-left: 3px;
        }
        .prose-content .bullets li::marker,
        .prose-content .layers li::marker { color: var(--text-muted); }
        .prose-content .pull-quote {
          margin: 26px 0 1.4em;
          padding: 2px 0 2px 18px;
          border-left: 2px solid var(--text);
          font-size: 16px;
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: var(--text);
        }
        .prose-content .doors {
          margin: 4px 0 1.4em;
          border-top: 1px solid var(--border);
        }
        .prose-content .door-row {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 16px;
          padding: 9px 0;
          border-bottom: 1px solid var(--border);
        }
        @media (max-width: 520px) {
          .prose-content .door-row {
            grid-template-columns: 1fr;
            gap: 2px;
          }
        }
      `}</style>
    </div>
  );
}
