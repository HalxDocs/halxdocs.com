import { Link } from "react-router-dom";
import LikeButton from "../../components/LikeButton";

export default function SignedRunReceipts() {
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
            Release
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
          Every API Request Now Leaves a Signed Receipt
        </h1>

        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 40 }}>
          reqit 2.6.0 &mdash; Signed Run Receipts
        </p>

        <Prose>
          <p>There is a particular kind of silence after an API call goes wrong.</p>
          <p>
            The request returned a 500. Or it returned a 200 that should have been a 500. Or it
            worked on your machine and failed in CI. Someone asks, &ldquo;What exactly did we
            send?&rdquo; and the honest answer is: a URL reconstructed from memory, a header
            someone edited an hour ago, a token that has since rotated, and a response that only
            exists in a screenshot.
          </p>
          <p>
            reqit has always been good at sending the request. Version 2.6.0 is about remembering
            it &mdash; safely, durably, and in a form you can prove.
          </p>
          <p>
            Every execution now writes a <strong>run receipt</strong>: a small, versioned record of
            what was asked for, how each variable was resolved, what came back, and whether it
            matched. Receipts are redacted by construction, hash-chained, and signed with a key
            held in your operating system&rsquo;s keychain.
          </p>

          <ReceiptFigure />

          <Section title="The idea: a receipt, not a log">
            <p>
              Logs are written for machines. They are noisy, mutable, and usually live somewhere you
              cannot attach to a bug report. A receipt is different. It is written for the person
              who has to answer, &ldquo;Did this actually happen, and can I trust the answer?&rdquo;
            </p>
            <p>
              Think about the receipt in your pocket after buying coffee. It is not a recording of
              the entire shop. It is a compact, structured claim: what was purchased, when, for how
              much, and from whom. reqit&rsquo;s run receipts follow the same principle for HTTP.
            </p>
            <p>Each receipt answers four questions:</p>

            <ol className="layers">
              <li>
                <strong>What did we mean to send?</strong> The request as written, with{" "}
                <code>{"{{variables}}"}</code> still visible.
              </li>
              <li>
                <strong>Where did the values come from?</strong> The variable names and their
                sources &mdash; environment, vault, collection &mdash; never the resolved secrets.
              </li>
              <li>
                <strong>What came back?</strong> Status, safe headers, timing, and a SHA-256
                fingerprint of the body.
              </li>
              <li>
                <strong>Has anything changed since?</strong> A hash that commits to the previous
                receipt, plus a signature from your machine&rsquo;s key.
              </li>
            </ol>

            <p>That last point is what makes a receipt more than a log line.</p>
          </Section>

          <Section title="How it works">
            <p>The illustration above follows one request through the system.</p>

            <Step n="01" title="You write the request">
              <p>
                You compose the request the way you always have, with placeholders instead of
                secrets: <code>{"GET /{{env}}/users"}</code>,{" "}
                <code>{"Authorization: {{token}}"}</code>. The receipt records this templated form
                rather than the expanded one. Six months later, <code>{"{{env}}"}</code> still
                tells you which environment was meant, and <code>{"{{token}}"}</code> tells you a
                credential was involved without storing the credential.
              </p>
            </Step>

            <Step n="02" title="It crosses the trust boundary">
              <p>
                Every surface in reqit &mdash; the desktop app, the CLI, the collection runner, the
                scheduler, the MCP server, and event replay &mdash; now executes through one
                boundary, <code>internal/trust</code>. That boundary does three things before a
                byte reaches disk:
              </p>
              <ul className="bullets">
                <li>
                  <strong>Redacts</strong> URLs, path segments and headers.
                </li>
                <li>
                  <strong>Records</strong> the request, response summary and timing.
                </li>
                <li>
                  <strong>Signs</strong> the resulting receipt with a key from the OS keychain.
                </li>
              </ul>
              <p>
                The transport layer still sends the real request. The trust layer decides what is
                safe to remember.
              </p>
            </Step>

            <Step n="03" title="It goes on the wire">
              <p>
                The resolved request is sent normally. Nothing about the transport changes. There
                is no proxy, no capture daemon, and no extra round trip.
              </p>
            </Step>

            <Step n="04" title="A receipt is written">
              <p>
                The receipt lands in <code>.reqit/runs/</code> inside your workspace. Writes are
                atomic, so a crash cannot leave a half-written file. Each receipt points at the
                hash of the one before it, forming a chain.
              </p>
              <p>
                At the bottom of the illustration, the two halves of the guarantee sit side by
                side: the <strong>hash chain</strong> makes silent edits visible, and the{" "}
                <strong>signature</strong> makes a recomputed hash insufficient.
              </p>
            </Step>
          </Section>

          <Section title="What is inside a receipt">
            <p>Here is a real receipt shape, with hashes shortened for readability:</p>

            <CodeBlock
              label="run-receipt.json"
              code={`{
  "version": 1,
  "id": "20261113T091422.184000000Z-9f2c4e1b7a30",
  "kind": "run",
  "time": "2026-11-13T09:14:22.184Z",
  "source": "cli",
  "environment": "staging",
  "request": {
    "method": "GET",
    "url": "https://api.example.com/{{env}}/users?limit=20&api_key=«redacted»",
    "headers": [
      { "name": "Accept", "value": "application/json" },
      { "name": "Authorization", "redacted": true }
    ]
  },
  "resolution": [
    { "name": "env", "source": "environment" },
    { "name": "api_key", "source": "vault" }
  ],
  "response": {
    "status": "200 OK",
    "statusCode": 200,
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-store"
    },
    "bodySha256": "sha256:9f2c4e…",
    "bodyBytes": 18422
  },
  "timing": {
    "dnsLookupMs": 3,
    "tcpConnectMs": 14,
    "tlsHandshakeMs": 27,
    "ttfbMs": 71,
    "downloadMs": 9,
    "totalMs": 124
  },
  "prevHash": "sha256:1a7d…",
  "hash": "sha256:5c93…",
  "keyId": "4c1d9a7f3e2b8a60",
  "signature": "hmac-sha256:8b41…"
}`}
            />

            <p>Notice what is present and what is absent.</p>
            <p>
              <strong>Present:</strong> the method, the endpoint shape, the parameter names, the
              variable names and where they came from, the status, the safe headers, the body
              fingerprint, and the timing breakdown.
            </p>
            <p>
              <strong>Absent:</strong> the resolved token, the resolved environment value if it is
              sensitive, the response body, and any header value that is not on a small allowlist.
            </p>
            <p>
              The <code>«redacted»</code> marker is deliberate. It tells you a value existed
              without telling you what it was.
            </p>
          </Section>

          <Section title="Redaction is a default, not a cleanup step">
            <p>
              Most tools redact after the fact: write everything, then run a filter over it. That
              fails in two ways. A crash between write and filter leaves secrets on disk, and a
              filter that misses one field leaks silently.
            </p>
            <p>reqit redacts before the receipt exists.</p>
            <ul className="bullets">
              <li>
                <strong>Query values</strong> are masked unless the parameter name is on a short,
                safe allowlist (<code>limit</code>, <code>offset</code>, <code>page</code>,{" "}
                <code>sort</code>, <code>order</code>, <code>format</code>, <code>lang</code>, and
                a handful of others). An innocuously named <code>?id=sk_live_…</code> is still
                masked.
              </li>
              <li>
                <strong>Path segments</strong> are kept when they identify a resource, but masked
                when they match a known credential prefix or the high-entropy shape of a token.
                Placeholders such as <code>{"/{{tenant}}/users"}</code> stay readable, because
                they are not values.
              </li>
              <li>
                <strong>Headers</strong> always keep their names. Values survive only for headers
                like <code>Content-Type</code>, <code>Accept</code>, <code>User-Agent</code> and{" "}
                <code>X-Request-Id</code>. A custom header such as <code>X-Internal-Auth</code>{" "}
                keeps its name and loses its value.
              </li>
              <li>
                <strong>Bodies</strong> are reduced to a SHA-256 hash and a byte count. Body
                previews are off by default and capped at 8 KiB when explicitly enabled.
              </li>
            </ul>
            <p>
              The result is a receipt you can attach to a ticket, paste into Slack, or commit to a
              repository without doing a secret sweep first.
            </p>
          </Section>

          <Section title="Using receipts from the CLI">
            <p>Four commands cover the workflow:</p>

            <CodeBlock
              label="shell"
              code={`# Newest first, with source, status, URL and timing
reqit runs list

# The full receipt; a unique ID prefix is enough
reqit runs show 20261113T0914

# Compare two executions; exits non-zero when they differ
reqit runs diff <id> <id>

# Verify hashes, chain links and signatures
reqit runs verify`}
            />

            <p>
              <code>reqit runs verify</code> is the one to put in CI or a pre-release checklist. It
              reports signed and unsigned receipts separately:
            </p>

            <CodeBlock code={"✓ 128 receipts verified — hashes and chain intact (128 signed, 0 unsigned)"} />

            <p>
              An unsigned receipt does not fail verification. It is reported honestly: the history
              is intact, but it was written on a machine where no signing key was available.
            </p>
            <p>
              Both <code>list</code> and <code>show</code> support <code>--json</code>, so receipts
              fit into scripts without scraping the table output.
            </p>
          </Section>

          <Section title="Using receipts in the desktop app">
            <p>
              The same history is available under <strong>Trust &rarr; Run receipts</strong>. The
              panel lists executions with their source, status and duration. Selecting one opens
              the full receipt: the templated request, the resolution sources, the response
              summary, the load-test block when present, the chain hashes, and the signature
              status.
            </p>
            <p>
              Verification runs in place. There is no separate export step, and no second format to
              keep in sync with the CLI &mdash; both read the same files.
            </p>
          </Section>

          <Section title="Why a hash chain and a signature">
            <p>
              A hash alone answers a narrow question: &ldquo;Does this file still match the hash
              recorded next to it?&rdquo; It does not stop someone from editing the file and
              updating the hash.
            </p>
            <p>
              A hash chain raises the cost. Each receipt includes the hash of its predecessor, so
              changing receipt 40 invalidates the link from 41. To hide the edit, an attacker must
              rewrite every later receipt too.
            </p>
            <p>
              A signature raises it again. Each receipt&rsquo;s hash is signed with HMAC-SHA256
              using a key stored in the OS keychain under the <code>reqit-receipts</code> service.
              Recomputing the chain is no longer enough: without the key, the final signature will
              not match. A receipt committed to a repository, shared with a teammate, or attached
              to an incident report therefore carries evidence of whether it was altered elsewhere.
            </p>
            <p>
              This is <strong>tamper-evident</strong>, not tamper-proof. The distinction matters,
              and it is covered in the limitations below.
            </p>
          </Section>

          <Section title="Load tests leave one receipt, not ten thousand">
            <p>
              A load test can issue thousands of requests per second. Writing one receipt per
              request would bury the history that receipts exist to make reviewable, and it would
              turn a diagnostic feature into a disk-space problem.
            </p>
            <p>
              Instead, a load test writes a single summary receipt with{" "}
              <code>{'kind: "loadtest"'}</code>:
            </p>
            <ul className="bullets">
              <li>virtual users, duration and iterations</li>
              <li>total requests, passed and failed counts</li>
              <li>average, p50, p95 and p99 latency</li>
              <li>the error, if the test itself failed</li>
            </ul>
            <p>
              The request that was under test is recorded once, in templated form, alongside those
              numbers. Individual load-test requests are intentionally not replayable.
            </p>
          </Section>

          <Section title="Safe history when several processes write at once">
            <p>
              The desktop app, a scheduled job, the CLI and an MCP client can all finish a request
              at the same moment. A naive lock file can go stale when a process crashes, leaving
              the history permanently stuck.
            </p>
            <p>
              reqit uses a real advisory OS lock instead: <code>flock</code> on Unix and{" "}
              <code>LockFileEx</code> on Windows. The kernel releases the lock when the owning
              process exits, so a crash cannot strand the chain. A polling fallback exists for
              platforms that provide neither primitive.
            </p>
            <p>
              Receipt writes remain best-effort. If the disk is full or the workspace is read-only,
              the request still succeeds and the failure is logged. Recording must never be the
              reason a request fails.
            </p>
          </Section>

          <Section title="What this does not do">
            <p>
              A release note that only lists wins is marketing. Here is the honest boundary of what
              shipped.
            </p>
            <ul className="bullets">
              <li>
                <strong>Redaction is defense in depth, not a guarantee.</strong> Query values and
                credential-shaped path segments are masked, but a low-entropy secret placed in an
                innocuously named path segment cannot be distinguished from a resource ID. Do not
                put secrets in URL paths.
              </li>
              <li>
                <strong>Receipts are tamper-evident, not tamper-proof.</strong> Anyone who can read
                the signing key from your OS keychain can sign a forged receipt. The signature
                detects edits made elsewhere, or receipts committed to a repository, without that
                key. It does not defend against a local attacker who already controls your unlocked
                account.
              </li>
              <li>
                <strong>Recording is best-effort by design.</strong> A failed write is logged and
                never fails the request. Use <code>reqit runs verify</code> and the receipts panel
                to confirm history was written.
              </li>
              <li>
                <strong>Advisory locks depend on the filesystem honouring them.</strong> They are
                reliable on local disks. A network filesystem with broken lock semantics can still
                allow two writers to fork the chain.
              </li>
              <li>
                <strong>Load tests record one summary receipt, not one receipt per request.</strong>{" "}
                Individual load-test requests are intentionally not replayable.
              </li>
              <li>
                <strong>
                  The UI, app and MCP surfaces are covered by tests at the boundary, but they are
                  not a proof of every path.
                </strong>{" "}
                The trust layer is the single execution point; if a future surface bypasses it, it
                will not produce receipts.
              </li>
            </ul>
            <p>These limits are documented in the changelog rather than buried in a wiki.</p>
          </Section>

          <Section title="Upgrading">
            <p>Version 2.6.0 is available now:</p>

            <div className="resources">
              <Resource
                href="https://github.com/HalxDocs/reqit/releases/tag/v2.6.0"
                title="Release"
                meta="v2.6.0 on GitHub"
              />
              <Resource
                href="https://github.com/HalxDocs/reqit/blob/main/flux/CHANGELOG.md#260---2026-11-13--signed-run-receipts"
                title="Changelog"
                meta="reqit 2.6.0, Signed Run Receipts"
              />
              <Resource
                href="https://github.com/HalxDocs/reqit"
                title="Source"
                meta="github.com/HalxDocs/reqit"
              />
            </div>

            <p>
              Existing workspaces pick up the <code>.reqit/runs/</code> ignore rule on launch.
              Receipts are local by default and are not committed unless you choose to share them.
            </p>

            <blockquote className="pull-quote">
              The next time someone asks what you sent, the answer will not be a reconstruction. It
              will be a receipt &mdash; redacted, chained, signed, and one command away from proof.
            </blockquote>

            <p
              style={{
                fontSize: 12,
                fontStyle: "italic",
                lineHeight: 1.7,
                color: "var(--text-dim)",
              }}
            >
              reqit 2.6.0 was released on 13 November 2026. The changelog linked above includes the
              full feature list, implementation notes and limitations.
            </p>
          </Section>

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

        <LikeButton slug="/blog/signed-run-receipts" />
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

function Step({ n, title, children }) {
  return (
    <div
      style={{
        paddingTop: 18,
        marginTop: 22,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
        <span
          className="font-mono"
          style={{ fontSize: 10.5, color: "var(--text-dim)", minWidth: 18 }}
        >
          {n}
        </span>
        <h3
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.35,
            color: "var(--text)",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function CodeBlock({ code, label }) {
  const lines = code.split("\n");

  return (
    <div className="code-wrap">
      {label && <div className="code-label">{label}</div>}
      <pre className="code-block">
        <code>
          {lines.map((line, i) => (
            <span
              key={i}
              className={line.trimStart().startsWith("#") ? "code-comment" : undefined}
            >
              {line}
              {i < lines.length - 1 ? "\n" : ""}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function Resource({ href, title, meta }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="resource-row">
      <span className="resource-title">{title}</span>
      <span className="resource-meta">{meta}</span>
    </a>
  );
}

function ReceiptFigure() {
  return (
    <figure className="receipt-figure">
      <img
        src="/blog/run-receipts.svg"
        alt="How reqit signed run receipts work: a templated request passes through a trust boundary that redacts, records and signs it; the real request is sent; a receipt is written to .reqit/runs/, protected by a hash chain and an HMAC-SHA256 signature from the OS keychain."
        width="1200"
        height="680"
      />
      <figcaption>
        One request, four steps &mdash; and the two proofs that make the receipt verifiable.
      </figcaption>
    </figure>
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

        /* Code */
        .prose-content .code-wrap { margin: 0 0 1.5em; }
        .prose-content .code-label {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-dim);
          margin-bottom: 6px;
        }
        .prose-content .code-block {
          margin: 0;
          max-width: 100%;
          padding: 13px 15px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          overflow-x: auto;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          line-height: 1.7;
          color: var(--text);
          tab-size: 2;
        }
        .prose-content .code-comment { color: var(--text-dim); }

        /* Receipt figure */
        .prose-content .receipt-figure {
          margin: 30px 0 34px;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          background: var(--surface);
        }
        .prose-content .receipt-figure img {
          display: block;
          width: 100%;
          height: auto;
        }
        .prose-content .receipt-figure figcaption {
          padding: 10px 14px;
          border-top: 1px solid var(--border);
          font-size: 11.5px;
          line-height: 1.5;
          color: var(--text-dim);
        }
        @media (min-width: 760px) {
          .prose-content .receipt-figure {
            width: 940px;
            max-width: calc(100vw - 64px);
            margin-left: 50%;
            transform: translateX(-50%);
          }
        }

        /* Resource rows */
        .prose-content .resources {
          margin: 4px 0 1.4em;
          border-top: 1px solid var(--border);
        }
        .prose-content .resource-row {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 16px;
          padding: 9px 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
        }
        .prose-content .resource-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
        }
        .prose-content .resource-meta {
          font-size: 13px;
          color: var(--text-muted);
          overflow-wrap: anywhere;
        }
        .prose-content .resource-row:hover .resource-meta {
          color: var(--text);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        @media (max-width: 560px) {
          .prose-content .resource-row {
            grid-template-columns: 1fr;
            gap: 1px;
          }
        }
      `}</style>
    </div>
  );
}
