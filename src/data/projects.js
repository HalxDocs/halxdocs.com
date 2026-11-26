// Single source of truth for the homepage list and the "All projects" popup.
// `featured` items also render as rows in the SelectedWork section.
export const projects = [
  {
    title: "reqit",
    description:
      "A local-first API client built because the alternatives demanded accounts and cloud sync — Git-native collections, a Go execution engine, and full request timing.",
    live: "https://reqit.dev",
    github: "https://github.com/HalxDocs/reqit",
    category: "tools",
    featured: true,
  },
  {
    title: "Aegis",
    description:
      "A deterministic failure simulator in Go and its TypeScript port, kept honest by a drift guard that proves both describe the same world.",
    live: "https://aegis-labx.vercel.app/",
    github: "https://github.com/HalxDocs/aegis",
    category: "tools",
    featured: true,
  },
  {
    title: "DLQ Inspector",
    description:
      "Dead-letter queues are where messages go to be forgotten — this CLI makes them inspectable, classifiable, dry-runnable, and safe to replay.",
    github: "https://github.com/HalxDocs/dlq_inspector",
    category: "tools",
    featured: true,
  },
  {
    title: "Myshoplet",
    description:
      "An e-commerce platform for Nigerian small businesses — 65+ daily orders and 100+ active vendors, with checkout, vendor tools, and delivery flow.",
    live: "https://myshoplet.com",
    category: "products",
    featured: true,
  },
  {
    title: "274Lab",
    description:
      "Exam prep built around measurable practice, not endless question banks — timed quizzes, performance analytics, and leaderboards for thousands of students.",
    live: "https://274lab.com",
    category: "products",
    featured: true,
  },
  {
    title: "jsonstack",
    description:
      "A JSON viewer for the large, messy files that break other formatters — streaming input, collapsible trees, fast search, and path copying in the browser.",
    live: "https://jsonstack.dev",
    github: "https://github.com/HalxDocs/json-formatter",
    category: "tools",
    featured: true,
  },
  {
    title: "Norah's Beauty Hub",
    description:
      "An e-commerce store that moved a beauty brand from WhatsApp orders to real online sales — Paystack checkout, inventory, and an admin dashboard.",
    live: "https://norahsbeautyhub.pxxl.click",
    category: "products",
    featured: true,
  },
  {
    title: "contextpack",
    description:
      "An npm CLI that turns a codebase into one LLM-ready file — respecting ignore rules and token limits instead of dumping every file.",
    live: "https://npmjs.com/package/@halxdocs/contextpack",
    github: "https://github.com/HalxDocs/contextpack",
    category: "tools",
    featured: true,
  },
  {
    title: "API Graveyard",
    description:
      "A searchable archive of API shutdowns and the migration lessons they left behind — because the dependency you build on can disappear overnight.",
    live: "/api-graveyard",
    category: "products",
    featured: true,
  },
  {
    title: "lazydb",
    description:
      "A keyboard-driven database TUI for terminal-native developers — connect, query, and edit without ever reaching for a GUI.",
    github: "https://github.com/HalxDocs/lazydb",
    category: "tools",
    featured: true,
  },

  // ── More open source ──
  {
    title: "keyway",
    description:
      "Self-hosted SSO for Go apps — one integration in your service, SAML or OIDC to each customer's IdP, shipped as a single static binary.",
    github: "https://github.com/HalxDocs/keyway",
    category: "tools",
    featured: true,
  },
  {
    title: "dashdev",
    description:
      "One command to run a whole local service stack with health checks, logs, and clean shutdown — no orphaned processes when you quit.",
    github: "https://github.com/HalxDocs/dashdev",
    category: "tools",
    featured: true,
  },
  {
    title: "zryl",
    description:
      "A CLI that captures what actually happened when a command ran — output, exit status, and environment — and turns it into a shareable link.",
    live: "https://zryl.vercel.app",
    github: "https://github.com/HalxDocs/zryl",
    category: "tools",
  },
  {
    title: "onceo-core",
    description:
      "Webhook reconciliation for African payment providers — HMAC verification, exactly-once delivery, and idempotent stores for events that arrive twice.",
    github: "https://github.com/HalxDocs/onceo-core",
    category: "tools",
  },
  {
    title: "TraceLite",
    description:
      "A local-first tracing tool that turns backend requests into timelines, span trees, and flame graphs — without a hosted agent.",
    live: "https://tracelite.vercel.app",
    github: "https://github.com/HalxDocs/tracelite",
    category: "tools",
  },
  {
    title: "ImpactGraph",
    description:
      "A dependency impact analyzer that answers 'if this changes, what breaks?' by walking a graph instead of grepping the codebase.",
    live: "https://impactgraph-kappa.vercel.app",
    github: "https://github.com/HalxDocs/impactgraph",
    category: "tools",
  },
  {
    title: "bachs-go",
    description:
      "An idiomatic Go SDK for the Bachs payments API — checkouts, subscriptions, payouts, and webhooks, with sandbox-first defaults.",
    github: "https://github.com/HalxDocs/bachs-go",
    category: "tools",
    featured: true,
  },

  // ── Products & client work ──
  {
    title: "Adeola Memorial College",
    description:
      "A voice-enabled school website — spoken page reading and voice navigation, plus academics, admissions, news, and contact.",
    live: "https://amc-2-one.vercel.app",
    category: "products",
  },
  {
    title: "MediCare Hospital",
    description:
      "A multi-page hospital site with services, doctors, appointment booking, and contact — responsive and deployed.",
    live: "https://med-iota-neon.vercel.app",
    category: "products",
  },
  {
    title: "PetGuard Pro",
    description:
      "A storefront for a veterinary care brand — catalogue, product details, and contact, built to take the business beyond social DMs.",
    live: "https://petcare-ochre.vercel.app",
    github: "https://github.com/HalxDocs/petcare",
    category: "products",
  },
  {
    title: "JambQuiz",
    description:
      "A timed, exam-style practice app — and the Go backend behind it, with leaderboards, rate limiting, and a public guestbook.",
    live: "https://jambquiz.pxxl.click",
    github: "https://github.com/HalxDocs/jambquiz",
    category: "products",
  },
  {
    title: "Symphony",
    description:
      "A digital wedding invitation that opens like an envelope on a phone and collects RSVPs without a group thread.",
    live: "https://symphony-wedding.vercel.app",
    category: "products",
  },
];
