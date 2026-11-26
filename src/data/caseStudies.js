// Long-form engineering case studies. Each entry drives /work and /work/:slug.
// Kept deliberately plain: what was wrong, what I chose, what broke.

export const caseStudies = [
  {
    slug: "reqit",
    name: "reqit",
    kicker: "One request engine, six front doors",
    category: "Developer tools",
    year: "2025 — ongoing",
    status: "Shipping · v2.6",
    live: "https://reqit.dev",
    github: "https://github.com/HalxDocs/reqit",
    summary:
      "An API client that doesn't ask you to sign in. Collections live in Git, requests run through a Go engine, and every phase of a request gets timed.",
    role: "Solo engineer. Product, engine, desktop, CLI, releases.",
    duration: "Ongoing",
    stack: ["Go", "Wails", "TypeScript", "SQLite", "Git"],
    metrics: [
      { value: "880+", label: "downloads" },
      { value: "6", label: "surfaces on one engine" },
      { value: "2.6", label: "current release" },
    ],
    problem: [
      "I built reqit because I got tired of opening an API client and being asked to sign in before I could send a GET request. Somewhere along the way, collections became someone else's cloud data. Your work sat in their format, synced when their service felt like it, and collaboration was a paid feature.",
      "I wanted files. Plain files I could put in a Git repo, review in a pull request, and still read if the app disappeared. I also wanted one engine I could call from the desktop app, the terminal, CI, or an agent, because I was not going to maintain six versions of \"send a request\".",
    ],
    constraints: [
      "Six surfaces, one engine: desktop app, CLI, CI runner, scheduler, load tester, MCP server. No surface gets its own retry logic.",
      "No network calls unless I actually hit Send. No telemetry, no background sync, no sign-in wall.",
      "One binary per platform. If it needs a runtime installed first, it isn't the tool I want.",
      "Secrets cannot end up in exports, logs, or receipts.",
    ],
    architecture: {
      caption:
        "The surfaces are thin. Most of the work happens in the engine and in the files.",
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
        "The desktop app is a view over the engine. When the CLI and the app disagree, I treat it as an engine bug, not a UI bug.",
    },
    decisions: [
      {
        title: "One engine, six front doors",
        body:
          "Every surface calls the same Go package. The desktop app doesn't have a secret second implementation of redirects or auth. Adding the load tester took an adapter, not a rewrite.",
        tradeoff:
          "The engine API has to stay boring and stable. I can't sneak a desktop-only feature into the core without making it work for the CLI too.",
      },
      {
        title: "A collection is just a folder",
        body:
          "Collections are files with a layout I can explain in one screen. Git handles history, branching, and review. I don't need a sync server to tell me what changed.",
        tradeoff:
          "Merging two edited collections is still a pain. Git gives me a conflict, not a friendly merge dialog, and I haven't really solved that.",
      },
      {
        title: "Time the phases, not the request",
        body:
          "I use httptrace to record DNS, connect, TLS, first byte, and body. \"1.4 seconds\" never told me anything useful. \"TLS took 900ms\" tells me where to look.",
        tradeoff:
          "More code, and some of the numbers look odd on reused connections. I'd rather show a slightly messy truth than a clean lie.",
      },
      {
        title: "A receipt for every run",
        body:
          "Every execution writes a redacted, hash-chained, signed receipt. I added it because \"it worked on my machine\" is not a debugging strategy. The receipt records what was sent, what came back, and what the engine saw.",
        tradeoff:
          "Canonical serialization is fiddly. Redaction has to happen before hashing or the chain breaks. And a signature only proves the record wasn't changed. It doesn't prove the server told the truth. I try to say that clearly.",
      },
      {
        title: "Make the network boundary visible",
        body:
          "Nothing leaves the machine unless I run a request. Updates and sync are opt-in. Local-first is behavior, not a slogan.",
        tradeoff:
          "No magic collaboration. Sharing means an export or a Git remote. Less convenient, easier to reason about.",
      },
    ],
    challenges: [
      {
        title: "Streaming, timing, and cancel at the same time",
        problem:
          "A response can stream while timings are still being written, and the user can cancel halfway. My first version leaked connections and occasionally reported timings for a request that never finished.",
        solution:
          "I moved to one lifecycle with typed events. Cancel closes the transport and marks the receipt incomplete. A half-finished run should look half-finished.",
      },
      {
        title: "Redaction versus verification",
        problem:
          "I need to hide tokens and passwords, but verification needs stable bytes. Redact after hashing and the chain breaks. Redact badly and the receipt leaks the secret it was supposed to protect.",
        solution:
          "Redact first, then canonicalize and hash. The rules are explicit and tested, and each receipt records that redaction happened.",
      },
      {
        title: "The app and the CLI drifting apart",
        problem:
          "They started disagreeing about redirects and timeouts. Users don't care which adapter is wrong.",
        solution:
          "The CLI is the reference. Shared fixtures run through every surface. If they disagree, I fix the engine.",
      },
    ],
    outcome: [
      "reqit is what I use every day. It has 880+ downloads and a 2.6 release with signed receipts and an MCP server. Adding the scheduler and load tester didn't require a second request engine, which was the whole bet.",
      "Not everything is finished. The sync story is still a design sketch, and I'm not sure it can stay local-first without becoming the thing I disliked. That's the next hard question.",
    ],
    next: [
      "Work out whether sync can exist without turning reqit into an account.",
      "Compare two receipts properly: what changed, not just pass or fail.",
      "Find a plugin boundary narrow enough that I can still trust the engine.",
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
      "A local CLI for dead-letter queues. Inspect what failed, group it, dry-run the replay, and recover without adding a second outage.",
    role: "Solo engineer. CLI, adapters, recovery model, releases.",
    duration: "2026",
    stack: ["Go", "Cobra", "SQLite", "SQS", "RabbitMQ"],
    metrics: [
      { value: "112", label: "downloads" },
      { value: "5", label: "failure classes" },
      { value: "0", label: "messages lost by design" },
    ],
    problem: [
      "Every team I've worked with has a dead-letter queue. Almost none of them has a recovery process. Messages pile up, someone opens a dashboard, skims two payloads, and replays the batch. Then the duplicates show up.",
      "The queue isn't really the problem. Replay is. It's an operation with side effects, and most tools treat it like a button.",
    ],
    constraints: [
      "SQS, RabbitMQ, Kafka. Operators shouldn't have to relearn recovery for each broker.",
      "Credentials and payloads stay on the machine. This is a local CLI, not another dashboard asking for production access.",
      "At-least-once is real. The tool should make duplicates visible instead of pretending they won't happen.",
      "One bad message can't take down the run.",
    ],
    architecture: {
      caption: "Look first. Replay last.",
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
        "The dry-run and the real replay use the same plan. A preview that lies is worse than no preview.",
    },
    decisions: [
      {
        title: "Sort the pile before touching it",
        body:
          "Each message gets a class: transient, poison, schema-invalid, duplicate, or unknown. I'd rather see the shape of the queue before I move anything. Unknown is allowed. Guessing is not.",
        tradeoff:
          "The classifier is sometimes wrong. The tool shows the evidence and lets me override it. I don't want it pretending to be certain.",
      },
      {
        title: "Publish, then delete",
        body:
          "Replay writes to the destination first and removes from the DLQ second. If the process dies in between, I get a duplicate. A duplicate is annoying. A lost message is gone.",
        tradeoff:
          "Consumers have to be idempotent. I can generate keys, but I can't make another service honor them.",
      },
      {
        title: "Dry-run is the default",
        body:
          "The first run produces a plan: counts by class, destination, sample payloads, estimated time, and the operations that would happen. Replay needs a separate confirmation.",
        tradeoff:
          "Two paths, and they have to share code. If the planner and executor drift, the preview becomes theater.",
      },
      {
        title: "Keys from message identity",
        body:
          "Each replay gets a key derived from the message and the batch. It gives downstream something stable to dedupe on when the broker redelivers.",
        tradeoff:
          "Plenty of consumers ignore idempotency keys. The audit output shows that instead of hiding it.",
      },
      {
        title: "Write down what happened",
        body:
          "Inspect, classify, replay, skip, fail. All of it goes into a local audit log with before and after state, operator, time, and batch. Six weeks later I want to know who replayed what.",
        tradeoff:
          "Audit logs need redaction and storage. An audit log that leaks secrets is just another incident.",
      },
    ],
    challenges: [
      {
        title: "The message that kills the inspector",
        problem:
          "A malformed payload panicked a decoder and took down the whole batch. One bad message shouldn't end the run.",
        solution:
          "Per-message panic recovery, size limits before decode, and a sandboxed classification step. Bad payloads become rows with errors.",
      },
      {
        title: "Half the batch succeeded",
        problem:
          "Publishing to the destination can work while deleting from the source fails. Retrying the whole batch makes a second wave of duplicates.",
        solution:
          "Per-message state and resume. The tool retries the uncertain step and flags anything that needs a human.",
      },
      {
        title: "Replay storms",
        problem:
          "Thousands of messages at full speed is a self-inflicted outage. The broker throttles, the consumer falls over, and I've recreated the original failure.",
        solution:
          "Token bucket, bounded concurrency, circuit breaker. Slow recovery is still recovery.",
      },
    ],
    outcome: [
      "v1.1, 112 downloads, and a recovery flow I trust. The bigger win was writing the article. Putting the pipeline on paper exposed how much risk was hiding inside \"just replay it\".",
    ],
    next: [
      "Add brokers without letting broker-specific weirdness leak into the core.",
      "Simulate replay against the schema before executing.",
      "Export audit reports a team can actually review.",
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
      "A deterministic failure simulator in Go, a TypeScript port, and a drift guard that checks both still describe the same world.",
    role: "Solo engineer. Simulator, port, drift guard, browser lab.",
    duration: "2026",
    stack: ["Go", "TypeScript", "React", "JSONL"],
    metrics: [
      { value: "4", label: "failure scenarios" },
      { value: "2", label: "implementations" },
      { value: "0", label: "wall-clock reads" },
    ],
    problem: [
      "Distributed systems are hard to learn from a real cluster. The interesting failure happens once, at 2am, and turns into a story. You can't rewind it.",
      "A simulator helps, but only if it's deterministic. And if the browser explainer is a separate implementation, it can quietly start describing a different system.",
    ],
    constraints: [
      "Same scenario and seed, same bytes. Every time.",
      "Virtual time. No wall clock in the engine.",
      "Two implementations that must agree, in two languages.",
      "The browser lab has to explain causes, not just draw boxes.",
    ],
    architecture: {
      caption:
        "One scenario, two engines, one trace format. The guard is what makes two implementations safe.",
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
        "The Go engine and the TypeScript port share a format, not code. That's what makes the guard meaningful, and also what makes drift possible.",
    },
    decisions: [
      {
        title: "Determinism first",
        body:
          "Virtual time, a seeded scheduler, stable ordering, and sequence numbers from the recorder. If two runs differ, the simulator is broken.",
        tradeoff:
          "Every scenario is explicit. No ambient concurrency, no sleeps. More work to write a scenario, less work to trust it.",
      },
      {
        title: "JSONL is the contract",
        body:
          "Both implementations emit line-delimited events with the same schema. The port stays idiomatic instead of being a line-by-line translation.",
        tradeoff:
          "Schemas drift. Normalization becomes real code. A loose contract lets a difference hide in a field nobody checks.",
      },
      {
        title: "Put the guard in CI",
        body:
          "Replay a scenario through both engines, normalize the traces, fail the build on a semantic mismatch. Without it, two implementations are twice the risk.",
        tradeoff:
          "Normalization can hide a real bug. The guard needs its own negative tests, or it's just a green checkmark.",
      },
      {
        title: "Explain the cause, not the shape",
        body:
          "Events link to their causes. The browser panel can unwind \"why did suspicion arrive late?\" through the trace instead of guessing in the UI.",
        tradeoff:
          "The engine records more state. Every scenario pays for it.",
      },
    ],
    challenges: [
      {
        title: "Time formatting",
        problem:
          "Go and TypeScript format time differently. A trace can look identical on screen and differ in the bytes the guard compares.",
        solution:
          "Integer ticks, canonical formatting at the boundary, and tests for the normalization rules.",
      },
      {
        title: "Same tick, different order",
        problem:
          "Two events at the same virtual tick came out in different orders and the guard screamed about drift that didn't exist.",
        solution:
          "Sequence IDs and deterministic tie-breakers. Ordering is part of the contract.",
      },
      {
        title: "The guard was lying",
        problem:
          "I audited the guard and found normalization rules dropping fields. It was passing because it wasn't looking.",
        solution:
          "Field coverage checks and negative fixtures that must fail. Now the guard proves it can see drift.",
      },
    ],
    outcome: [
      "Aegis Lab runs four scenarios in the browser. Repeat runs are byte-identical, and the guard has caught real mismatches. I trust it more now that I've tried to break it.",
      "The bigger lesson: \"two implementations agree\" doesn't mean much until you've tested the agreement itself.",
    ],
    next: [
      "Membership changes and clock skew.",
      "Property-based scenarios with shrinking.",
      "A trace format other simulators can use.",
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
      "A storefront and order system for Nigerian small businesses, built for vendors who started on WhatsApp and need something that can keep up.",
    role: "Full-stack engineer. Storefront, orders, vendor tools, payments.",
    duration: "Ongoing",
    stack: ["Next.js", "TypeScript", "Paystack", "Vercel"],
    metrics: [
      { value: "65+", label: "daily orders" },
      { value: "100+", label: "active vendors" },
      { value: "1", label: "storefront, many shops" },
    ],
    problem: [
      "A lot of small businesses in Nigeria sell through WhatsApp. The catalogue is a camera roll. The order book is a chat. Payment proof is a screenshot. Delivery status is whatever the vendor remembers.",
      "It works until it doesn't. Orders get lost, customers pay twice, and nobody can answer \"where is my order?\" without scrolling.",
    ],
    constraints: [
      "Mobile first, and the network is not always there.",
      "Paystack, including bank transfers and the messy confirmation step.",
      "Vendors need to run their own shop without seeing each other's orders.",
      "The people using it are not technical. If onboarding needs a call, it's too complicated.",
    ],
    architecture: {
      caption:
        "One order record. The storefront, vendor console, and delivery timeline are views over it.",
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
        "If chat says one thing and the order record says another, the order record wins.",
    },
    decisions: [
      {
        title: "Orders move through states",
        body:
          "Placed, paid, accepted, packed, dispatched, delivered, cancelled. Illegal transitions get rejected. I don't want a stale webhook to move a delivered order back to pending.",
        tradeoff:
          "More states to explain and more code. But \"lost order\" becomes a visible state instead of a support mystery.",
      },
      {
        title: "Payment webhooks are not trustworthy",
        body:
          "Paystack events repeat. They arrive late. They arrive out of order. I store event IDs, guard transitions, and keep a reconciliation view for payments that don't match an order.",
        tradeoff:
          "A table and a lot of edge cases. The alternative is charging someone twice and hearing about it on WhatsApp.",
      },
      {
        title: "Tenant boundaries in the data layer",
        body:
          "Every vendor query is scoped. The console can't accidentally return another shop's orders because there is no unscoped read to call.",
        tradeoff:
          "More plumbing in every endpoint. Still cheaper than retrofitting isolation after a leak.",
      },
      {
        title: "Build for a bad connection",
        body:
          "Small payloads, forms that survive a refresh, and a retry that doesn't lose the cart. Checkout doesn't assume fibre.",
        tradeoff:
          "Fewer fancy interactions. The app feels quieter, which is fine.",
      },
    ],
    challenges: [
      {
        title: "The webhook that arrived twice",
        problem:
          "A repeated Paystack event double-credited an order, and then a stale event tried to move it backwards.",
        solution:
          "Dedupe by event ID and guard every transition. Paid doesn't go back to pending.",
      },
      {
        title: "Vendor onboarding",
        problem:
          "Non-technical vendors needed to add products and fulfil orders without calling me.",
        solution:
          "A constrained console with defaults, inline validation, and a storefront preview before publishing.",
      },
      {
        title: "Where is my order?",
        problem:
          "The answer lived in a chat.",
        solution:
          "Delivery states owned by the vendor or admin, with a customer timeline. The answer is a page now.",
      },
    ],
    outcome: [
      "Myshoplet runs 65+ orders a day across 100+ vendors. It replaced a chat workflow with an order record that can be tracked and supported.",
      "The lesson wasn't about the storefront. It was about making money and state agree when the network, the webhook, and the human all do something unexpected.",
    ],
    next: [
      "Tell vendors what to restock.",
      "Sync inventory across channels.",
      "Real courier tracking instead of manual states.",
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
      "A 26-week JAMB practice platform with weekly timed quizzes, real +4/−1 scoring, and a backend that owns the clock.",
    role: "Full-stack engineer. Product, quiz engine, analytics, backend.",
    duration: "Ongoing",
    stack: ["React", "Vite", "Go", "PostgreSQL", "Paystack"],
    metrics: [
      { value: "250+", label: "students on the platform" },
      { value: "800+", label: "quizzes taken" },
      { value: "26", label: "weeks of structured practice" },
    ],
    problem: [
      "JAMB is one exam, four subjects, 200 minutes, and it decides where a lot of Nigerian students go to university. Most preparation is still random past questions. You get an answer key, not a picture of what you're bad at.",
      "Three things go wrong. Nobody measures weak topics. Nobody practices weekly. And almost nobody practices with the real scoring: +4 for correct, −1 for wrong, 0 for blank. Guessing feels free until exam day.",
      "274Lab turns the last 274 days into 26 weeks. One timed quiz window a week. Real scoring. A breakdown that tells you which subject is dragging the total down.",
    ],
    constraints: [
      "Quiz window: Friday and Saturday, one hour. The server decides when it closes.",
      "25 questions per subject, shuffled, with the options shuffled too.",
      "JAMB scoring exactly. Practice should hurt the same way the exam does.",
      "It has to run on cheap Android phones and bad networks.",
      "One backend and Postgres. I don't have an ops team.",
    ],
    architecture: {
      caption:
        "The client shows the quiz. The backend owns the window, the score, and access.",
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
        "The countdown is a display. The server's clock is the one that counts.",
    },
    decisions: [
      {
        title: "Score it like JAMB",
        body:
          "+4, −1, 0. The backend computes it from stored answers. Students should learn the cost of a guess before the exam does it for them.",
        tradeoff:
          "Scores look harsh. A 42% can be a decent result under negative marking. The product has to explain that without sounding like an excuse.",
      },
      {
        title: "The server owns the window",
        body:
          "Answers are only accepted during the active window, checked against server time. Refresh the page, change the clock, it doesn't matter.",
        tradeoff:
          "Last-second submissions on bad networks are a pain. There's a grace window and an explicit deadline state. I still don't love how it feels.",
      },
      {
        title: "Shuffle, but keep the paper",
        body:
          "Questions and options are shuffled per attempt. The served order is stored so the review shows exactly what the student saw.",
        tradeoff:
          "More state per attempt. Worth it. \"That question looked different when I took it\" is a bad support thread.",
      },
      {
        title: "Check access at the API",
        body:
          "Two free quizzes, then a Paystack subscription. Entitlement is checked in the backend, not hidden in the UI.",
        tradeoff:
          "Access checks spread across quiz and content routes. Still cheaper than auditing revenue after the fact.",
      },
      {
        title: "Read models for leaderboards",
        body:
          "Leaderboards, tiers, and averages are projections over attempts. The write path stays small, and the dashboard stays fast when a cohort finishes together.",
        tradeoff:
          "A rank can lag. I show it as a snapshot instead of pretending it's live.",
      },
      {
        title: "Meet the phone they have",
        body:
          "Installable PWA, push notifications, and a weekly WhatsApp report for parents or teachers. No app store, no fibre.",
        tradeoff:
          "iOS push is limited. The app degrades instead of pretending every device is the same.",
      },
    ],
    challenges: [
      {
        title: "The last-second submit",
        problem:
          "A student submits at 59:59 on a slow connection. The client says it counted. The server isn't so sure.",
        solution:
          "Server timestamps, a bounded grace window, and an explicit deadline state. The client stops being the authority.",
      },
      {
        title: "Everyone starts at once",
        problem:
          "A cohort opens the quiz together and the leaderboard query takes the result page down.",
        solution:
          "Projections, indexed reads, rate limits. There's a load-test harness in the repo because this happened.",
      },
      {
        title: "Patches mode",
        problem:
          "After June 21, some students need targeted help, not another generic quiz.",
        solution:
          "Flag subjects under 50%, prioritize them in the notification feed, and change the dashboard state so it's obvious.",
      },
    ],
    outcome: [
      "274Lab is live with 250+ students and 800+ quizzes. Timing, scoring, access, and analytics all live on the server, which is where they belong.",
      "Keeping it to one Go service and Postgres was the right call. I've seen what happens when a small product gets a service mesh.",
    ],
    next: [
      "Adaptive practice based on weak topics.",
      "Teacher and school dashboards.",
      "Offline mode that doesn't corrupt attempts.",
    ],
    related: [],
  },
];

export function getCaseStudy(slug) {
  return caseStudies.find((study) => study.slug === slug) ?? null;
}
