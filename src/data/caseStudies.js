// Long-form engineering case studies. Each entry drives /work and /work/:slug.
// The goal is evidence, not marketing: problem, constraints, architecture,
// decisions with trade-offs, what broke, and what shipped.

export const caseStudies = [
  {
    slug: "reqit",
    name: "reqit",
    kicker: "One request engine, six surfaces",
    category: "Developer tools",
    year: "2025 — ongoing",
    status: "Shipping · v2.6",
    live: "https://reqit.dev",
    github: "https://github.com/HalxDocs/reqit",
    summary:
      "A local-first API client that treats a request as a first-class artifact: one Go engine, many surfaces, Git-native collections, and a signed receipt for every run.",
    role: "Solo engineer — product, engine, desktop, CLI, releases",
    duration: "Ongoing",
    stack: ["Go", "Wails", "TypeScript", "SQLite", "Git"],
    metrics: [
      { value: "880+", label: "downloads" },
      { value: "6", label: "surfaces on one engine" },
      { value: "2.6", label: "current release" },
    ],
    problem: [
      "API clients slowly turned into accounts. Collections moved into someone else's cloud, collaboration sat behind a paywall, and the simple act of sending a request started depending on a login, a sync daemon, and a network round trip to a vendor.",
      "I wanted the opposite: collections I could read, diff, review, and branch with Git; a request engine I could call from a desktop app, a CLI, CI, and an agent; and timing data precise enough to tell me which phase of a request was actually slow.",
    ],
    constraints: [
      "One execution engine shared by a desktop app, CLI, CI runner, scheduler, load tester, and MCP server.",
      "Offline by default — no network traffic unless a request is explicitly run.",
      "Single cross-platform binaries with no runtime to install.",
      "Secrets must never appear in logs, exports, or run receipts.",
    ],
    architecture: {
      caption:
        "Every surface is an adapter. Execution, storage, and verification live in the core.",
      layers: [
        {
          label: "Surfaces",
          nodes: ["Desktop", "CLI", "CI runner", "Scheduler", "Load tester", "MCP server"],
        },
        {
          label: "Core",
          nodes: ["Request engine", "Auth", "Streaming", "Scripts", "Contract checks", "httptrace"],
        },
        {
          label: "State",
          nodes: ["Git collections", "Environments", "Secret refs", "Run receipts"],
        },
        {
          label: "Edges",
          nodes: ["HTTP / HTTPS", "Git", "OS keychain"],
        },
      ],
      note:
        "The desktop app is a view over the engine, not a second implementation. If the CLI and the app disagree, the engine is wrong.",
    },
    decisions: [
      {
        title: "One engine, many doors",
        body:
          "Execution lives in a single Go package. The desktop app, CLI, runner, scheduler, load tester, and MCP server are thin adapters over the same request lifecycle. A new surface cannot invent its own retry policy or timeout semantics.",
        tradeoff:
          "No surface-specific shortcuts. Every feature has to make sense at the engine boundary, and the public interface has to stay stable.",
      },
      {
        title: "Git is the database",
        body:
          "Collections and environments are plain files with a deliberate layout. That means branches, diffs, code review, and a real history for free — and a collection is still readable when the app is gone.",
        tradeoff:
          "There is no server to perform magic merges. Conflict handling becomes a schema and migration problem instead of a sync-button problem.",
      },
      {
        title: "Measure phases, not totals",
        body:
          "The engine records DNS, connect, TLS, first byte, and body timings with httptrace. A number like '1.4s' is not useful; 'TLS took 900ms' is.",
        tradeoff:
          "More instrumentation, more platform differences to normalize, and a timing model that has to stay honest under redirects and connection reuse.",
      },
      {
        title: "Receipts instead of logs",
        body:
          "A run writes a redacted, hash-chained, signed receipt: what was sent, what came back, and what the engine observed. Receipts can be verified without trusting the machine that produced them.",
        tradeoff:
          "Canonical serialization, key handling, and redaction all become correctness concerns. The guarantee also stops at the signature — it proves the record was not altered, not that the server told the truth.",
      },
      {
        title: "Make the network boundary explicit",
        body:
          "Nothing leaves the machine unless a request runs. Sync, telemetry, and updates are opt-in and visible. Local-first is a behavior, not a marketing line.",
        tradeoff:
          "No silent collaboration features. Sharing is an explicit export or a Git remote, which is less convenient and much easier to reason about.",
      },
    ],
    challenges: [
      {
        title: "Streaming, timing, and cancellation at once",
        problem:
          "A response body can stream while phase timings are still being recorded, and the user can cancel halfway through. Naive code leaks connections or reports timings for a request that never finished.",
        solution:
          "One request lifecycle with typed events. Cancellation closes the transport and marks the receipt incomplete instead of pretending the run succeeded. Streaming and timing share the same context.",
      },
      {
        title: "Redaction that survives verification",
        problem:
          "Receipts need to hide tokens and passwords, but verification needs stable bytes. Redacting after hashing breaks the chain; redacting badly leaks secrets.",
        solution:
          "Redact before canonicalization, hash the redacted representation, and keep the redaction rules explicit and testable. Receipts carry a marker showing that redaction happened.",
      },
      {
        title: "Surface parity",
        problem:
          "The desktop app and CLI could quietly drift: different redirect behavior, different auth handling, different timeouts. Users would blame the tool, not the adapter.",
        solution:
          "The CLI is the reference surface for engine behavior. Shared fixtures run through every adapter, and parity bugs are treated as engine bugs.",
      },
    ],
    outcome: [
      "reqit is now my daily driver and a real shipped product: 880+ downloads, a 2.6 release with signed receipts, and an MCP surface that lets agents use the same engine as a human.",
      "The architecture has held: adding the load tester and scheduler did not require a second request implementation. That is the part I am proudest of.",
    ],
    next: [
      "Sync that preserves local-first semantics instead of quietly becoming a hosted service.",
      "Diffable run comparison: what changed between two receipts, not just pass/fail.",
      "A plugin boundary that is narrow enough to keep the engine trustworthy.",
    ],
    related: [
      { label: "One Engine, Many Doors", to: "/blog/one-engine-many-doors" },
      { label: "Every API Request Now Leaves a Signed Receipt", to: "/blog/signed-run-receipts" },
    ],
  },
  {
    slug: "dlq-inspector",
    name: "DLQ Inspector",
    kicker: "Recovery you can audit",
    category: "Distributed systems",
    year: "2026",
    status: "Shipping · v1.1",
    live: null,
    github: "https://github.com/HalxDocs/dlq_inspector",
    summary:
      "A local-first CLI that turns a dead-letter queue from a graveyard into an inspectable, classifiable, dry-runnable, auditable recovery queue.",
    role: "Solo engineer — CLI, adapters, recovery model, releases",
    duration: "2026",
    stack: ["Go", "Cobra", "SQLite", "SQS", "RabbitMQ"],
    metrics: [
      { value: "112", label: "downloads" },
      { value: "5", label: "failure classes" },
      { value: "0", label: "messages lost by design" },
    ],
    problem: [
      "Every team has a dead-letter queue and almost no team has a recovery process. Messages pile up until someone opens a dashboard, skims a few payloads, and replays the whole batch. That is how duplicates, partial failures, and second outages happen.",
      "A DLQ is not the problem. The problem is that replay is treated as a button instead of a controlled operation with classification, validation, rate limits, and an audit trail.",
    ],
    constraints: [
      "Broker-agnostic: the operator should not need a different mental model for SQS, RabbitMQ, or Kafka.",
      "Credentials stay local. No message payloads leave the machine by default.",
      "At-least-once delivery is the reality; the tool must make duplicates visible instead of pretending they cannot happen.",
      "A bad message must never crash the inspector or stop the rest of the batch.",
    ],
    architecture: {
      caption:
        "Inspect, classify, plan, replay, record. Execution is the last step, never the first.",
      layers: [
        {
          label: "Sources",
          nodes: ["SQS adapter", "RabbitMQ adapter", "Kafka adapter", "Local fixtures"],
        },
        {
          label: "Analyze",
          nodes: ["Canonical envelope", "Classifier", "Schema check", "Duplicate detection"],
        },
        {
          label: "Plan",
          nodes: ["Dry-run", "Destination mapping", "Rate limit", "Circuit breaker"],
        },
        {
          label: "Execute",
          nodes: ["Replay worker", "Idempotency keys", "Per-message state", "Audit log"],
        },
      ],
      note:
        "The dry-run planner and the real replay share the same plan object. A preview that does not match execution is worse than no preview.",
    },
    decisions: [
      {
        title: "Classify before replay",
        body:
          "Every message gets a class: transient, poison, schema-invalid, duplicate, or unknown. The operator sees the distribution before touching a single message, and 'unknown' is a valid answer instead of a guess.",
        tradeoff:
          "Classification can be wrong. The tool has to show evidence and let a human override, not pretend the classifier is an oracle.",
      },
      {
        title: "Publish before acknowledge",
        body:
          "Recovery writes to the destination first, then removes from the DLQ. A crash in between produces a duplicate, not a lost message. Duplicates are recoverable; losses are not.",
        tradeoff:
          "Consumers must be idempotent. The tool generates idempotency keys, but it cannot force a downstream service to honor them.",
      },
      {
        title: "Dry-run is a first-class mode",
        body:
          "The default path produces a plan: counts by class, destination, sample payloads, estimated duration, and the exact operations that would run. Execution requires an explicit confirmation.",
        tradeoff:
          "Two paths to maintain. Keeping them honest means the planner and executor must share code, not just documentation.",
      },
      {
        title: "Idempotency from message identity",
        body:
          "Each replay derives a key from the message's identity plus the batch. That gives downstream consumers something stable to deduplicate on, even when the broker redelivers.",
        tradeoff:
          "Some consumers ignore keys entirely. The audit output makes that visible instead of hiding it.",
      },
      {
        title: "Audit every operation",
        body:
          "Every inspect, classify, replay, skip, and failure is appended to a local audit log with before/after state, operator, timestamp, and batch. Recovery becomes reviewable after the fact.",
        tradeoff:
          "Storage and redaction become part of the product. Audit logs without a redaction story are a liability.",
      },
    ],
    challenges: [
      {
        title: "The poison message that kills the tool",
        problem:
          "A single malformed payload could panic a decoder or allocate far too much memory, taking down the inspector in the middle of a batch.",
        solution:
          "Per-message panic recovery, size limits before decode, and a sandboxed classification step. A bad message becomes a row with an error, not a crashed process.",
      },
      {
        title: "Partial failure across two brokers",
        problem:
          "Publishing to the destination can succeed while deleting from the source fails. Retrying the whole batch creates a second wave of duplicates.",
        solution:
          "Per-message state machine with resume. The tool records what completed, retries only the uncertain step, and surfaces messages that need manual reconciliation.",
      },
      {
        title: "Rate limits and backpressure",
        problem:
          "Replaying thousands of messages at full speed is a self-inflicted incident. Brokers throttle, consumers fall over, and the original failure repeats.",
        solution:
          "Token-bucket rate limiting, bounded concurrency, and a circuit breaker that pauses the batch when the destination starts failing. Slow recovery is still recovery.",
      },
    ],
    outcome: [
      "DLQ Inspector is at v1.1 with 112 downloads and a recovery model I trust: classify, preview, replay with idempotency, and leave a trail.",
      "The deeper result is the article it produced. Writing the recovery pipeline down exposed the places where 'just replay it' was hiding all the risk.",
    ],
    next: [
      "More broker adapters without leaking broker-specific behavior into the core.",
      "Schema-aware replay simulation before execution.",
      "Team-exportable audit reports for change review.",
    ],
    related: [
      {
        label: "Dead-Letter Queues: Designing Safe Message Recovery",
        to: "/blog/dead-letter-queues-safe-recovery",
      },
    ],
  },
  {
    slug: "aegis",
    name: "Aegis",
    kicker: "Two implementations, one truth",
    category: "Distributed systems",
    year: "2026",
    status: "Live lab",
    live: "https://aegis-labx.vercel.app/",
    github: "https://github.com/HalxDocs/aegis",
    summary:
      "A deterministic failure lab: a Go simulator, a TypeScript port, and a drift guard that proves both describe the same world.",
    role: "Solo engineer — simulator, port, drift guard, browser lab",
    duration: "2026",
    stack: ["Go", "TypeScript", "React", "JSONL"],
    metrics: [
      { value: "4", label: "failure scenarios" },
      { value: "2", label: "implementations" },
      { value: "0", label: "wall-clock reads" },
    ],
    problem: [
      "Distributed-systems intuition is usually built from anecdotes. A real cluster is slow, noisy, and hard to reproduce, so the interesting failure happens once and becomes a story instead of a test.",
      "A simulator can fix that — but only if it is deterministic. And if a browser explainer reimplements the simulator, the explainer can quietly start describing a different system than the engine.",
    ],
    constraints: [
      "The same scenario and seed must produce byte-identical output.",
      "Virtual time only — no wall clock anywhere in the engine.",
      "The Go engine and the TypeScript port must stay semantically aligned.",
      "The browser lab has to explain causes, not just draw a timeline.",
    ],
    architecture: {
      caption:
        "One scenario definition, two implementations, one normalized trace the guard can compare.",
      layers: [
        {
          label: "Input",
          nodes: ["Scenario", "Seed", "Virtual clock"],
        },
        {
          label: "Engines",
          nodes: ["Go simulator", "TypeScript port"],
        },
        {
          label: "Contract",
          nodes: ["JSONL events", "Sequence IDs", "Causal links"],
        },
        {
          label: "Proof",
          nodes: ["Trace normalization", "Drift guard", "CI gate"],
        },
        {
          label: "Explainer",
          nodes: ["Timeline", "Span tree", "Why did this happen?"],
        },
      ],
      note:
        "The two implementations share a format, not code. That is what makes the drift guard meaningful — and what makes it possible for them to drift at all.",
    },
    decisions: [
      {
        title: "Determinism is the product",
        body:
          "Virtual time, a seeded scheduler, stable event ordering, and sequence numbers assigned by the recorder. Two runs of the same scenario must produce the same bytes, or the simulator is not a lab.",
        tradeoff:
          "Every scenario has to be explicit. There is no 'just sleep 200ms' and no ambient concurrency to lean on.",
      },
      {
        title: "JSONL is the contract",
        body:
          "The Go engine and the TypeScript port both emit line-delimited events with the same schema. The port stays idiomatic instead of being a transliteration, and the guard compares meaning at the event boundary.",
        tradeoff:
          "Schema versioning and normalization become real work. A loose contract lets drift hide in fields nobody checks.",
      },
      {
        title: "A drift guard in CI",
        body:
          "The guard replays a scenario through both implementations, normalizes the traces, and fails the build on a semantic mismatch. It is the only reason two implementations are safer than one.",
        tradeoff:
          "Normalization can hide a real difference. The guard itself needs tests, including negative cases that must fail.",
      },
      {
        title: "Explain from causality",
        body:
          "Events carry links to their causes. The browser panel unwinds one event back through the chain, so 'why did suspicion arrive late?' has an answer in the trace instead of a guess in the UI.",
        tradeoff:
          "The engine has to record causality, not just outcomes. That is more state and more discipline in every scenario.",
      },
    ],
    challenges: [
      {
        title: "Time precision across languages",
        problem:
          "Go and TypeScript format and compare time differently. A trace can look identical in a screenshot and differ in the bytes the guard compares.",
        solution:
          "Integer virtual ticks everywhere, canonical formatting at the boundary, and normalization rules that are tested rather than assumed.",
      },
      {
        title: "Event ordering ties",
        problem:
          "Two events at the same virtual tick can be emitted in different orders by the two implementations, producing a false drift signal.",
        solution:
          "Deterministic tie-breakers and sequence IDs assigned once, at recording time. Ordering is part of the contract, not an accident of iteration.",
      },
      {
        title: "The guard had blind spots",
        problem:
          "Auditing the guard found normalization rules that dropped fields — the comparison was passing because it was not looking.",
        solution:
          "Field-coverage checks and negative fixtures that must fail. The guard now proves it can detect drift, not just report success.",
      },
    ],
    outcome: [
      "Aegis Lab runs four failure scenarios in the browser with byte-identical repeat runs, causal explanations, and a drift guard that has caught real mismatches.",
      "The most useful outcome was philosophical: 'two implementations agree' is not evidence until you have tested the agreement mechanism itself.",
    ],
    next: [
      "More failure modes: membership changes, clock skew, partial recovery.",
      "Property-based scenario generation with shrinking.",
      "A public trace format so other simulators can be compared.",
    ],
    related: [
      {
        label: "Two Implementations, One Truth",
        to: "/blog/two-implementations-one-truth",
      },
    ],
  },
  {
    slug: "myshoplet",
    name: "Myshoplet",
    kicker: "Commerce for businesses that run on DMs",
    category: "Product engineering",
    year: "2025 — ongoing",
    status: "Live · in production",
    live: "https://myshoplet.com",
    github: null,
    summary:
      "An e-commerce platform that moved Nigerian small businesses from WhatsApp threads to a real storefront — vendor tools, Paystack checkout, and a delivery state machine.",
    role: "Full-stack engineer — storefront, orders, vendor tools, payments",
    duration: "Ongoing",
    stack: ["Next.js", "TypeScript", "Paystack", "Vercel"],
    metrics: [
      { value: "65+", label: "daily orders" },
      { value: "100+", label: "active vendors" },
      { value: "1", label: "storefront, many shops" },
    ],
    problem: [
      "A huge number of small businesses sell entirely through WhatsApp. The catalogue is a camera roll, the order book is a chat, payment proof is a screenshot, and delivery status lives in someone's memory.",
      "The result is predictable: lost orders, duplicate payments, vendors who cannot answer 'where is my order?', and a business that cannot grow past the person typing replies.",
    ],
    constraints: [
      "Mobile-first, low-bandwidth users on inconsistent networks.",
      "Paystack as the payment rail, including bank-transfer and confirmation realities.",
      "Vendors need autonomy without seeing each other's data.",
      "The platform has to work for businesses that are not technical.",
    ],
    architecture: {
      caption:
        "Storefront, order state machine, vendor console, and payment reconciliation around one order record.",
      layers: [
        {
          label: "Customer",
          nodes: ["Storefront", "Product pages", "Checkout", "Order tracking"],
        },
        {
          label: "Commerce",
          nodes: ["Order API", "State machine", "Pricing", "Delivery states"],
        },
        {
          label: "Vendors",
          nodes: ["Vendor console", "Catalogue", "Fulfilment", "Scoped data"],
        },
        {
          label: "Money",
          nodes: ["Paystack checkout", "Webhooks", "Idempotency", "Reconciliation"],
        },
      ],
      note:
        "The order record is the source of truth. Chat, email, and dashboards are views over it, never the place where state actually changes.",
    },
    decisions: [
      {
        title: "An order state machine, not status strings",
        body:
          "Orders move through explicit transitions: placed, paid, accepted, packed, dispatched, delivered, cancelled. Illegal transitions are rejected instead of silently overwriting a string.",
        tradeoff:
          "More code and more states to explain. In exchange, 'lost order' becomes a visible state instead of a mystery.",
      },
      {
        title: "Webhook idempotency and reconciliation",
        body:
          "Paystack events can repeat and arrive out of order. Events are stored by ID, transitions are guarded, and a reconciliation view shows payments that do not match an order.",
        tradeoff:
          "An extra table and more moving parts. The alternative is charging someone twice and finding out from a support message.",
      },
      {
        title: "Vendor-scoped data from day one",
        body:
          "Every vendor query carries a tenant boundary. The console cannot accidentally return another shop's orders because the data layer does not offer an unscoped read.",
        tradeoff:
          "More plumbing in every endpoint. It is much cheaper than retrofitting isolation after the first data leak.",
      },
      {
        title: "Design for the network people actually have",
        body:
          "Small payloads, resilient forms, and optimistic UI that degrades to a clear retry. The checkout does not assume fibre.",
        tradeoff:
          "Fewer flashy interactions and more edge-case handling. The product feels calmer because it is built for interruption.",
      },
    ],
    challenges: [
      {
        title: "Payments that arrive twice",
        problem:
          "A repeated webhook can double-credit an order or move it backwards after fulfilment.",
        solution:
          "Event deduplication plus transition guards. A paid order cannot return to pending because a stale event arrived late.",
      },
      {
        title: "Vendor onboarding without support tickets",
        problem:
          "Non-technical vendors need to add products, set prices, and fulfil orders without a call.",
        solution:
          "A constrained console with sensible defaults, inline validation, and a preview of the storefront before publishing.",
      },
      {
        title: "Delivery truth",
        problem:
          "Customers ask 'where is my order?' and the answer only exists in a chat.",
        solution:
          "Delivery states owned by the vendor or admin, with a customer-facing timeline. The answer is a page, not a person.",
      },
    ],
    outcome: [
      "Myshoplet runs 65+ daily orders across 100+ active vendors. The platform replaced a chat-based workflow with an order record that can be tracked, audited, and supported.",
      "The engineering lesson is unglamorous: in commerce, the hard part is not the storefront. It is making money and state agree when the network, the webhook, and the human all misbehave.",
    ],
    next: [
      "Vendor analytics that answer 'what should I restock?'",
      "Inventory sync across channels.",
      "Courier integrations with real tracking events.",
    ],
    related: [],
  },
  {
    slug: "274lab",
    name: "274Lab",
    kicker: "A 26-week exam engine",
    category: "Product engineering",
    year: "2025 — ongoing",
    status: "Live · in production",
    live: "https://274lab.com",
    github: null,
    summary:
      "A 26-week JAMB practice platform: timed weekly quizzes, JAMB's exact +4/−1 scoring, per-subject analytics, consistency tiers, and a Go backend that owns the clock.",
    role: "Full-stack engineer — product, quiz engine, analytics, backend",
    duration: "Ongoing",
    stack: ["React", "Vite", "Go", "PostgreSQL", "Paystack"],
    metrics: [
      { value: "250+", label: "students on the platform" },
      { value: "800+", label: "quizzes taken" },
      { value: "26", label: "weeks of structured practice" },
    ],
    problem: [
      "JAMB decides university admission for roughly two million Nigerian students a year, and most of them prepare by grinding random past questions. They get an answer key, not a profile of themselves.",
      "That produces three predictable failures: no feedback loop, no weekly cadence, and practice under the wrong scoring model. UTME is +4 for a correct answer and −1 for a wrong one, yet most students practise as if every guess is free.",
      "274Lab turns the last 274 days before the exam into a 26-week training cycle: one timed quiz window per week, real JAMB scoring, per-subject weaknesses, and a leaderboard that rewards consistency instead of cramming.",
    ],
    constraints: [
      "A fixed Friday/Saturday quiz window with a server-enforced deadline.",
      "25 shuffled questions per subject, with shuffled options, under exam timing.",
      "JAMB's exact +4 / −1 / 0 scoring — practice must match the real risk-reward.",
      "Installable on low-end Android phones, often on unreliable networks.",
      "A small operations budget: one backend and Postgres, not a service mesh.",
    ],
    architecture: {
      caption:
        "The quiz window, scoring, access, and read models are backend concerns. The client renders a session it does not own.",
      layers: [
        {
          label: "Client",
          nodes: ["Installable PWA", "Timed quiz", "Result review", "Dashboard"],
        },
        {
          label: "API",
          nodes: ["Go HTTP", "Quiz service", "Access checks", "Rate limits", "Deadline"],
        },
        {
          label: "Data",
          nodes: ["PostgreSQL", "Attempts", "Question versions", "Subscriptions"],
        },
        {
          label: "Read",
          nodes: ["Leaderboard", "Consistency tiers", "Per-subject analytics"],
        },
        {
          label: "Reach",
          nodes: ["Push notifications", "Weekly WhatsApp report"],
        },
      ],
      note:
        "The client timer is a display. If the client and the server disagree about the deadline, the server is right.",
    },
    decisions: [
      {
        title: "Score like the real exam",
        body:
          "Every quiz uses JAMB's formula: +4 for correct, −1 for wrong, 0 for unanswered. The backend computes the score from stored answers, so a student learns the actual cost of guessing before exam day.",
        tradeoff:
          "The result is harsher than a percentage. That is the point, but it has to be explained clearly so a low score reads as information rather than punishment.",
      },
      {
        title: "The server owns the window",
        body:
          "A quiz is only writable during the active week's Friday/Saturday window, and submissions are checked against server time with an explicit deadline error. The countdown is a courtesy, not the authority.",
        tradeoff:
          "More careful handling of slow networks and last-second submissions. Refreshing the page or changing a device clock buys nothing.",
      },
      {
        title: "Shuffle the paper, keep the record",
        body:
          "Questions and options are shuffled per attempt to make memorisation useless. The served order is stored, so the result review can show exactly what the student saw.",
        tradeoff:
          "More state per attempt and a stricter review model. It prevents the worst support conversation: 'that question did not look like that when I took it.'",
      },
      {
        title: "Gate access at the API",
        body:
          "Two free quizzes, then a low-friction Paystack subscription. Entitlement is checked in the backend on every quiz path, not hidden in the UI.",
        tradeoff:
          "Access checks spread across the quiz and content surfaces. It is much cheaper than auditing revenue after the fact.",
      },
      {
        title: "Read models for the social layer",
        body:
          "Leaderboards, consistency tiers, and per-subject averages are projections over attempts. The write path stays small, and the dashboard stays fast when a cohort finishes together.",
        tradeoff:
          "Eventual consistency. A rank can lag by a refresh interval, which is acceptable if the interface is honest about it.",
      },
      {
        title: "Meet students on the phone they have",
        body:
          "The product ships as an installable PWA with push notifications and a weekly WhatsApp report for parents or teachers. No app-store gate, no fibre assumption.",
        tradeoff:
          "Platform limits, especially around iOS push. The web app has to degrade cleanly instead of pretending every device is the same.",
      },
    ],
    challenges: [
      {
        title: "Deadlines on a bad connection",
        problem:
          "A student submits at the last second on a slow network and the client and server disagree about whether the answer counted.",
        solution:
          "Server timestamps, a bounded grace window, and an explicit deadline state instead of silently accepting or rejecting. The countdown is rendered from the server's window.",
      },
      {
        title: "Exam-season bursts",
        problem:
          "Traffic arrives in clusters when a cohort starts together, and an expensive leaderboard query can take the result page down.",
        solution:
          "Projections for leaderboards and averages, indexed attempt reads, and rate limits that protect the API without blocking legitimate bursts. There is a load-test harness in the repo for exactly this.",
      },
      {
        title: "Patches mode after June 21",
        problem:
          "Late in the season, students need targeted help, not another generic quiz. The product has to notice which subject is dragging the total down.",
        solution:
          "Flag subjects whose average falls below 50% and prioritize their key points in the notification feed, with a visibly different dashboard state. Intervention becomes a product behavior, not a manual email.",
      },
    ],
    outcome: [
      "274Lab is live with 250+ students and 800+ quizzes taken. Timing, scoring, entitlement, and analytics are backend concerns, so the product can be trusted when it matters.",
      "The most valuable constraint was the small operations budget. It forced a simple architecture — one Go service, Postgres, and read models — instead of a pile of services that would be harder to keep correct.",
    ],
    next: [
      "Adaptive practice driven by per-topic weakness.",
      "Cohort analytics for teachers and schools.",
      "A resilient offline mode for patchy networks.",
    ],
    related: [],
  },
];

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug) ?? null;
}
