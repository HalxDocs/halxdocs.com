export const projects = [
  {
    slug: "reqit",
    title: "reqit",
    label: "Open Source · 300+ downloads",
    oneLiner: "A free, offline, Git-first API client that's been downloaded 300+ times — the Postman alternative developers actually switch to.",
    problem:
      "Postman locked team collaboration behind a $19/user/month paywall, forced your collections into its cloud, and shipped 300MB+ of Electron. Developers wanted a fast, private, Git-native tool that respected how they already work.",
    built:
      "I built reqit to solve that. It's a local-first API client where your collections are plain JSON files in Git — no account, no cloud, no telemetry. Under 20MB, under 400ms startup. It speaks every protocol developers actually use and has now been downloaded 300+ times by engineers who were done paying for Postman.",
    features: [
      "300+ downloads from developers who switched off paid tools",
      "Local-first — your collections are Git files, never locked in a cloud",
      "Protocol-complete — HTTP, WebSocket, gRPC, GraphQL, MQTT, SOAP, SSE",
      "Under 20MB and under 400ms startup — no Electron bloat",
      "Git-native — commit, branch, and review API changes like code",
      "Zero telemetry — nothing leaves your machine unless you push",
    ],
    tech: ["Go", "Wails v2"],
    image: "/reqit.png",
    href: "https://reqit.dev",
    liveLabel: "Visit reqit",
    live: true,
  },
  {
    slug: "dlq-inspector",
    title: "DLQ Inspector",
    label: "Open Source · CLI",
    oneLiner: "A local-first CLI for inspecting, analyzing, classifying, and safely recovering failed messages from dead-letter queues.",
    problem:
      "Background jobs fail, and every failure system routes them to a dead-letter queue — which becomes a pile nobody wants to touch. Teams are stuck between blindly replaying everything (risking duplicate charges and doubled side effects) or manually triaging message-by-message (slow and error-prone). A full DLQ doesn't tell you which failures share a cause or which messages are safe to touch.",
    built:
      "I built a single static Go binary that connects directly to your message infrastructure and gives one consistent workflow: Inspect → Analyze → Classify → Plan → Validate → Dry-run → Recover → Audit. It clusters failures by normalized error signatures, classifies them (REPLAYABLE / REQUIRES_FIX / DO_NOT_REPLAY / INVESTIGATE), dry-runs every mutating command by default, and records everything in an append-only SQLite audit trail so every recovery is reversible.",
    features: [
      "Groups thousands of failures into patterns via normalized error signatures",
      "Honest classification — REPLAYABLE, REQUIRES_FIX, DO_NOT_REPLAY, INVESTIGATE",
      "Dry-run is the default for every mutating command — Changes made: NONE",
      "Safety pipeline — duplicate evidence, destination invariant, explicit --confirm, circuit breaker",
      "Append-only audit trail + full snapshots — every confirmed recovery can be rolled back",
      "Broker-agnostic — same recovery logic on RabbitMQ and Redis Streams",
      "YAML policy engine — teams encode their own judgment as committed policies",
    ],
    tech: ["Go 1.26", "cobra/viper", "amqp091-go", "go-redis", "SQLite", "goreleaser"],
    image: null,
    href: "https://github.com/HalxDocs/dlq_inspector",
    liveLabel: "View on GitHub",
    live: true,
  },
  {
    slug: "myshoplet",
    title: "Myshoplet",
    label: "E-commerce SaaS · Live revenue",
    oneLiner: "An all-in-one selling platform that puts Nigerian small businesses online — with 65+ daily orders and 100+ active vendors.",
    problem:
      "Nigerian SMBs were locked out of selling online. Existing tools had no Naira payments, no WhatsApp-first selling, no local logistics — and foreign pricing that made no sense for the market.",
    built:
      "I built Myshoplet to fix that. Every seller gets a branded storefront, a 24/7 AI WhatsApp sales agent that captures orders in Pidgin and local languages, a POS terminal, and instant Paystack payouts. It now moves 65+ orders a day across 100+ active vendors — real businesses running on it.",
    features: [
      "65+ daily orders and 100+ active vendors on the platform",
      "AI WhatsApp agent that closes sales in Pidgin, Yoruba, Igbo, Hausa",
      "Branded storefronts + a public /discover marketplace",
      "Paystack payouts with instant bank withdrawals",
      "Browser POS, discount engine, and analytics built in",
    ],
    tech: ["Next.js", "Node.js", "Express", "TypeScript", "Tailwind CSS", "MongoDB", "Paystack", "Twilio", "Anthropic Claude", "Cloudinary", "Vercel"],
    image: "/myshoplet.png",
    href: "https://myshoplet.com",
    liveLabel: "Visit Myshoplet",
    live: true,
  },
  {
    slug: "274lab",
    title: "274Lab",
    label: "EdTech · Thousands of students",
    oneLiner: "A structured exam-prep platform that turned scattered JAMB practice into a measurable training cycle for thousands of students.",
    problem:
      "In 2025, ~1.95M candidates sat UTME and ~78% scored below 200/400. Students practiced randomly from PDFs, never saw their weak topics, and walked into the exam blind. No feedback loop, no accountability.",
    built:
      "I built 274Lab to change those numbers. A 26-week program with timed quizzes scored on the real JAMB formula, per-subject weak-spot detection, and weekly parent reports. Thousands of students now train on it with a clear, measurable path to a better score.",
    features: [
      "Thousands of students actively preparing on the platform",
      "Real JAMB scoring (+4/−1) with per-subject weak-topic detection",
      "26-week structured track with a 6-tier consistency system",
      "Weekly WhatsApp reports sent to parents and teachers",
      "Patches Mode that auto-floods low-scoring subjects with key points",
    ],
    tech: ["React 19", "Firebase", "Firestore", "Tailwind CSS", "Paystack", "FCM", "PWA", "Vite"],
    image: null,
    href: "https://274lab.com",
    liveLabel: "Visit 274Lab",
    live: true,
  },
  {
    slug: "jsonstack",
    title: "jsonstack",
    label: "Open Source · Developer tool",
    oneLiner: "A JSON viewer built to handle the large, messy files that break every other formatter — so developers stop fighting their tools.",
    problem:
      "Large API responses and configs froze other formatters. Search broke, readability collapsed, and developers lost time fighting the tool instead of reading the data.",
    built:
      "I built jsonstack.dev to handle real-world JSON without choking — collapsible trees, fast nested search, and one-click path copying. It's the formatter developers reach for when the file is too big for everything else.",
    features: [
      "Handles large JSON files other tools freeze on",
      "Collapsible tree view with path display and copy",
      "Fast search across deeply nested keys and values",
      "Format, minify, and validate in one place",
    ],
    tech: ["React", "TypeScript", "Vite"],
    image: "/jsonstack.png",
    href: "https://jsonstack.dev",
    liveLabel: "Visit jsonstack.dev",
    live: true,
  },
  {
    slug: "norahsbeautyhub",
    title: "Norah's Beauty Hub",
    label: "E-commerce · Live store",
    oneLiner: "A full e-commerce store that took a Nigerian beauty brand from WhatsApp JPEGs to real online sales.",
    problem:
      "A growing beauty brand had no real storefront — just social posts and manual orders. They needed browsing, checkout, and an admin that wasn't a nightmare.",
    built:
      "I built a complete platform: live debounced search, Cloudinary uploads, a real-time admin dashboard with analytics, and full auth with Paystack checkout. The brand now sells online without the manual chaos.",
    features: [
      "Live debounced product search",
      "Cloudinary image upload pipeline",
      "Admin dashboard with real-time analytics + charts",
      "Cart, wishlist, coupons, and Paystack checkout",
    ],
    tech: ["React", "Node.js", "Cloudinary", "MongoDB", "Tailwind CSS"],
    image: "/norahsbeautyhub-hero.png",
    href: "https://norahsbeautyhub.pxxl.click",
    liveLabel: "Visit live",
    live: true,
  },
  {
    slug: "contextpack",
    title: "contextpack",
    label: "Open Source · npm",
    oneLiner: "An open-source CLI that bundles your codebase into one LLM-ready file — so feeding context to AI stops being a copy-paste mess.",
    problem:
      "Feeding a codebase to an LLM meant copying files one by one and losing context. No clean tool bundled a project into a format AI tools could actually use.",
    built:
      "I built a TypeScript CLI published to npm that walks a project and outputs a single markdown or JSON file with all relevant code, properly formatted for LLM windows. Install once, run anywhere.",
    features: [
      "Walks any project directory recursively",
      "Markdown or JSON output, configurable",
      "Custom ignore patterns + .gitignore awareness",
      "Published to npm — install once, run anywhere",
    ],
    tech: ["TypeScript", "Node.js", "npm"],
    image: "/contextpack.png",
    href: "https://npmjs.com/package/@halxdocs/contextpack",
    liveLabel: "View on npm",
    live: true,
  },
  {
    slug: "api-graveyard",
    title: "API Graveyard",
    label: "Web App · Side project",
    oneLiner: "A memorial for the APIs we built on and lost — a place that turns shutdowns into lessons worth remembering.",
    problem:
      "Every year dozens of APIs die and the knowledge of why disappears with them. There was no single place to learn from those endings.",
    built:
      "I built a categorized, searchable graveyard of 20+ major API shutdowns — each with an epitaph and the real story of its demise. It's a quiet reminder of why local-first and open standards matter.",
    features: [
      "20+ API graves with lifespan, epitaph, and cause of death",
      "Category filters and search by name or epitaph",
      "Sort by death date, lifespan, or name",
      "A stats bar of total RIPs and years of service",
    ],
    tech: ["React", "Framer Motion"],
    image: null,
    href: "/api-graveyard",
    liveLabel: "Visit the Graveyard",
    live: true,
  },
  {
    slug: "lazydb",
    title: "lazydb",
    label: "Open Source · TUI",
    oneLiner: "A keyboard-driven database TUI that keeps terminal-native developers out of the GUI and in flow.",
    problem:
      "Switching between a terminal and a GUI DB client broke flow. Terminal-first devs needed to browse and query databases without leaving the keyboard.",
    built:
      "I built a Go TUI with bubbletea — keyboard navigation, sidebar row counts, a live SQL bar, and saved connection configs for Postgres, MySQL, and SQLite. It's the lazygit of databases.",
    features: [
      "Keyboard-only navigation with row highlighting",
      "Sidebar with row counts per table",
      "Live SQL query bar",
      "Saved connection configs (Postgres, MySQL, SQLite)",
    ],
    tech: ["Go", "bubbletea", "lipgloss", "bubbles", "cobra"],
    image: "/lazydb.png",
    href: "https://github.com/HalxDocs/lazydb",
    liveLabel: "View on GitHub",
    live: true,
  },
];

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);
