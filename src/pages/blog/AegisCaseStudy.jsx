import { Link } from "react-router-dom";
import LikeButton from "../../components/LikeButton";

export default function AegisCaseStudy() {
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
            Case Study
          </span>
          <span
            style={{ width: 12, height: 1, background: "var(--border)", display: "block" }}
          />
          <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            November 2026
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
          Two Implementations, One Truth
        </h1>

        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--text-muted)", marginBottom: 40 }}>
          How Aegis keeps a Go simulator and its TypeScript port from quietly describing different
          worlds — and what happened when I audited the guard itself.
        </p>

        <Prose>
          <p>
            Aegis is a deterministic distributed-systems simulator in Go. It runs four scenarios
            &mdash; a node crash, a one-way partition, a recovered crash, a lone witness &mdash; on
            virtual time, and emits a JSONL log: one event per line, sequence numbers assigned by the
            recorder, no wall clock anywhere. Two runs of the same scenario with the same seed must
            produce identical bytes. That determinism is the product, not a nicety: it is what lets a
            claim like &ldquo;the suspicion arrived 355&nbsp;ms after the crash, not the configured
            350&rdquo; be checked instead of asserted.
          </p>
          <p>
            <a
              href="https://aegis-labx.vercel.app/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Aegis Lab
            </a>{" "}
            is the explainer: the same engine ported to TypeScript, replayed in a browser, with a
            &ldquo;why did this happen?&rdquo; panel that unwinds one event back to its causes. It is
            the thing people actually look at.
          </p>
          <p>Two implementations, one truth. Which is the entire problem.</p>

          <H2>How a port drifts</H2>

          <p>
            A port and an original drift in a specific, nasty way: each side keeps working. A
            constant changes on one side &mdash; <code>350</code> becomes <code>351</code> &mdash; and
            nothing throws. The Go program still produces a log. The page still renders a timeline.
            They simply describe different worlds, and the only thing that notices is a person
            reading both carefully enough to spot a millisecond.
          </p>
          <p>
            The obvious response &mdash; keep a copy of the expected output and compare &mdash;
            creates a second problem. A committed copy of the truth is itself a third
            implementation: it can be updated to match the bug. Copies are how drift gets preserved
            rather than caught. So the design rule became: if a check needs to know something, it
            asks the source. A number that appears twice is a number that will one day disagree with
            itself.
          </p>

          <H2>The guard, in layers</H2>

          <p>
            <strong>CI gates both ways.</strong> The Go workflow checks out the page and runs{" "}
            <code>make check-all</code>, which runs the Go checks and then, with{" "}
            <code>LAB</code> pointed at the checkout, the page&rsquo;s own proof. A page-only change
            is gated without a commit to the implementation.
          </p>
          <p>
            <strong>Fixture parity, byte for byte.</strong> The page replays four fixture logs
            captured from Go: <code>node-crash</code> (16 events), <code>one-way-partition</code>{" "}
            (75), <code>recovered-crash</code> (37), <code>lone-witness</code> (11) &mdash; 139
            events in total. Comparing parsed events would miss reordering, and reordering is
            exactly what a virtual-time simulator produces, so the comparison is on text.
          </p>
          <p>
            <strong>Diagnosing the right side.</strong> A byte diff that says &ldquo;these
            differ&rdquo; is a bug report nobody can act on. Parity decides whether the fixture is
            stale or the port drifted from a fixture that still matches Go, and prints the event with
            both sides aligned:
          </p>

          <Code>{`✗ parity failed

node-crash: the port differs from the fixture at event 14

    fixture: {"seq":14,"at":570000000,"kind":"suspicion_raised",…}
    engine:  {"seq":14,"at":571000000,"kind":"suspicion_raised",…}

  The fixture matches the Go program, so the divergence is in the port:
  fix src/engine/ until it reproduces src/engine/fixtures/node-crash.jsonl.`}</Code>

          <p>
            Absent fields render as <code>(absent)</code> rather than <code>undefined</code>, because{" "}
            <code>undefined</code> in a diff between two languages reads as a value. Drift across a
            whole log is summarised with field tallies instead of seventy lines of diff, and a
            renamed event kind is called out as a rename caveat rather than as fifteen unrelated
            changes.
          </p>
          <p>
            <strong>Coverage, not just agreement.</strong> Agreement is satisfiable by covering less.
            If a fifth scenario exists in Go and the page has no world for it, every committed
            fixture still matches &mdash; the page is simply describing a smaller universe. Parity
            therefore compares the sets and fails by name:{" "}
            <code>the implementation runs 5 scenarios; the page covers 4. uncovered: cluster-split</code>
            .
          </p>
          <p>
            <strong>Measurements are measured.</strong> The page&rsquo;s proof card shows 10 packages,
            91.7% coverage, and 4 scenarios replayed. None of those numbers is typed into the page:{" "}
            <code>npm run gate</code> measures them in the Go repository and writes{" "}
            <code>gate.json</code>, and parity re-measures and fails with{" "}
            <code>run: npm run gate</code> when the committed card has drifted. A card that is copied
            goes stale exactly the way a fixture does.
          </p>

          <H2>Auditing the guard</H2>

          <p>
            With six layers green, the guard still had five weaknesses. The useful thing about them
            is that four were not logic errors &mdash; they were checks that could not fail, or
            failed for the wrong reason.
          </p>

          <Callout>
            A test that reads the same source as the thing it tests is a formatting check wearing a
            test&rsquo;s clothing. The fix is not a better assertion; it is removing the copy.
          </Callout>

          <p>
            <strong>The test that proved nothing.</strong> One test asserted that the error message
            for an unknown scenario contains the right names &mdash; but the message is generated
            from the same table the test read. It compared a string to itself modulo wording, and
            could not detect a scenario the binary refuses to run. Deleting the copy left nothing for
            it to catch <em>about content</em>; what remained worth testing is that the advice works.
            It now parses the <code>available:</code> list back out, requires set and order equality,
            and feeds every offered name through <code>lookup</code>. The assertion changed from
            &ldquo;the sentence is spelled correctly&rdquo; to &ldquo;the sentence is
            executable&rdquo;.
          </p>
          <p>
            <strong>A copy that had become the interface.</strong> Two parsers read Go source as
            text. A regex over another repository&rsquo;s source is not an interface; it is a copy
            that happens to be regenerated. The interface now exists:{" "}
            <code>aegis scenarios</code> prints one name per line and rejects arguments with usage.
            One of the two parse sites deliberately stayed a regex &mdash; the one that locates the
            file and line of a declaration, which must answer &ldquo;roughly where&rdquo; and degrade
            to <code>null</code> rather than throw. A locator that shrugs beats one that fails.
          </p>
          <p>
            <strong>A hardcoded path.</strong> The fixture sync located the scenario table at{" "}
            <code>cmd/aegis/main.go</code>. If that file moved, the check failed with the right
            loudness and the wrong diagnosis. It now shells out to{" "}
            <code>go run ./cmd/aegis scenarios</code>, and the failure message names the command and
            the repository &mdash; verified by pointing it at a directory containing no Go at all,
            rather than reasoned about. The same stale path survived in one other script, found by
            grepping after the refactor, which is the only reliable way to find the last copy.
          </p>
          <p>
            <strong>Forty-three errors nobody could see.</strong> The <code>scripts/</code> directory
            that <em>enforces</em> the guard sat outside every <code>tsconfig</code>, so it was the
            only untyped code in the repository, carrying 43 strict errors. All 43 had one cause:
            TypeScript narrows control flow on a <code>never</code> return only when the annotation
            is on the binding, not the expression. Every guard written as{" "}
            <code>{'if (!x) fail("…")'}</code> therefore left the compiler believing control
            continued, and everything below it was unreachable, unreported dead code. One
            declaration change; 43 errors to zero. Then, because a compiler that reports zero is
            indistinguishable from one that reports nothing, a deliberate type error was added, seen
            to fail, and removed.
          </p>
          <p>
            <strong>A bus error explained by a byte count.</strong> The linter died with SIGBUS and
            had been filed mentally as &ldquo;pre-existing, unrelated breakage&rdquo;. That framing
            was a hypothesis, and it was wrong: the native binding on disk was 5,691,165 bytes; the
            published platform package is 15,265,392. A truncated <code>node_modules</code> entry &mdash;
            a partial download, not a version conflict &mdash; makes <code>dlopen</code> map pages
            that are not there, and that is SIGBUS rather than a clean error. No configuration change
            could have fixed it. &ldquo;Unrelated pre-existing breakage&rdquo; is a claim about a
            mechanism, and a size comparison tests that claim in four seconds.
          </p>

          <H2>The setting the platform cannot offer</H2>

          <p>
            Both repositories needed branch protection, and one of the sensible settings turns out to
            be impossible for a repository that pushes directly to <code>main</code>. Enabled and
            tested, it rejects the push that would satisfy it:
          </p>

          <Code>{`remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: - 2 of 2 required status checks are expected.
 ! [remote rejected] main -> main (protected branch hook declined)`}</Code>

          <p>
            The mechanism is circular by design: checks run on the commit being pushed, so a new
            commit has none, so requiring them rejects the push that would create them. With{" "}
            <code>enforce_admins</code> on, there is no bypass for anyone. The setting is only usable
            with a branch-and-pull-request flow, which trades a ninety-second wait for a workflow
            nobody asked for.
          </p>
          <p>
            So the gate moved to where it can actually fire: a committed pre-push hook, installed
            with <code>make hooks</code> / <code>npm run hooks</code>. Installing it surfaced a
            smaller finding of its own &mdash; <code>make hooks</code> reported &ldquo;up to
            date&rdquo;, because a directory named <code>hooks/</code> shadows a target of the same
            name. Only a real installation would have revealed that.
          </p>
          <p>
            The hook was then proven to block, which is the only evidence that matters for a guard.
            The detector window was changed <code>350 &rarr; 351</code>, committed, and pushed:
            parity failed at event 14, the push died locally, and the commit was removed. The
            subsequent real pushes both ran through the hook and landed green.
          </p>

          <H2>What the mutations proved</H2>

          <div style={{ margin: "4px 0 28px" }}>
            <Insight n="01" lead="A fifth scenario added:">
              parity reports the uncovered name, so agreement cannot be bought by covering less.
            </Insight>
            <Insight n="02" lead="Usage line drops a scenario:">
              the test fails on the advice, not the wording &mdash; the offered name does not run.
            </Insight>
            <Insight n="03" lead="Heartbeat 100 &rarr; 101 ms:">
              fixtures no longer reproduce, and parity says which side moved.
            </Insight>
            <Insight n="04" lead="Attempt field added to the event type:">
              schema drift appears as a field tally with <code>(absent)</code> on the old side.
            </Insight>
            <Insight n="05" lead="350 &rarr; 351 ms in the port:">
              the pre-push hook rejects the push before anything leaves the machine.
            </Insight>
          </div>

          <p>
            Every guard here was exercised by mutation rather than described. A passing check is not
            a working check; a guard that has never failed is an assumption.
          </p>

          <H2>What is still missing</H2>

          <p>
            Required status checks are off, not by oversight &mdash; they cannot coexist with direct
            pushes. The hook is per-clone: <code>core.hooksPath</code> is local git configuration, so
            a fresh clone installs it once, and <code>git push --no-verify</code> bypasses it by
            design, with CI as the backstop. The error-message test guards shape, not content;
            calling that coverage would be the original mistake wearing a new hat.
          </p>

          <Callout>
            Guards fail less often by being wrong than by being satisfied for the wrong reason.
          </Callout>

          <p>
            The through-line is that every layer of this guard is a comparison of two things, and
            every weakness was a comparison of a thing with itself.
          </p>
        </Prose>

        <LikeButton slug="/blog/two-implementations-one-truth" />
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

function Code({ children }) {
  return (
    <pre
      className="font-mono"
      style={{
        fontSize: 11.5,
        lineHeight: 1.6,
        color: "var(--text)",
        background: "var(--surface, rgba(127,127,127,0.08))",
        border: "1px solid var(--border)",
        borderRadius: 6,
        padding: "14px 16px",
        margin: "20px 0",
        overflowX: "auto",
        whiteSpace: "pre",
      }}
    >
      {children}
    </pre>
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
        .prose-content pre code { background: none; padding: 0; }
      `}</style>
    </div>
  );
}
