// Single source of truth for the homepage list, the "All projects" popup,
// and the /work index. `caseStudy` points at a long-form entry in caseStudies.js.
export const projects = [
  {
    title: "reqit",
    description:
      "An API client that doesn't ask you to sign in. Collections live in Git, requests run through a Go engine, and every phase of a request gets timed.",
    live: "https://reqit.dev",
    github: "https://github.com/HalxDocs/reqit",
    category: "tools",
    featured: true,
    stack: ["Go", "Wails", "TypeScript", "SQLite"],
    caseStudy: "reqit",
  },
  {
    title: "Aegis",
    description:
      "A deterministic failure simulator in Go, with a TypeScript port and a drift guard that checks both still describe the same world.",
    live: "https://aegis-labx.vercel.app/",
    github: "https://github.com/HalxDocs/aegis",
    category: "tools",
    featured: true,
    stack: ["Go", "TypeScript", "React", "JSONL"],
    caseStudy: "aegis",
  },
  {
    title: "DLQ Inspector",
    description:
      "A CLI for dead-letter queues. Inspect what failed, group it, dry-run the replay, and recover without turning duplicates into a second outage.",
    github: "https://github.com/HalxDocs/dlq_inspector",
    category: "tools",
    featured: true,
    stack: ["Go", "Cobra", "SQLite", "SQS"],
    caseStudy: "dlq-inspector",
  },
  {
    title: "Myshoplet",
    description:
      "A storefront and order system for Nigerian small businesses, built for vendors who started on WhatsApp and need something that can keep up.",
    live: "https://myshoplet.com",
    category: "products",
    featured: true,
    stack: ["Next.js", "TypeScript", "Paystack", "Vercel"],
    caseStudy: "myshoplet",
  },
  {
    title: "274Lab",
    description:
      "A 26-week JAMB practice platform. Weekly timed quizzes, real +4/−1 scoring, and analytics that show which subject is dragging the total down.",
    live: "https://274lab.com",
    category: "products",
    featured: true,
    stack: ["React", "Vite", "Go", "PostgreSQL"],
    caseStudy: "274lab",
  },
  {
    title: "jsonstack",
    description:
      "A JSON viewer for the large files that make other formatters give up. It streams, collapses, searches, and copies paths without freezing the tab.",
    live: "https://jsonstack.dev",
    github: "https://github.com/HalxDocs/json-formatter",
    category: "tools",
    stack: ["React", "TypeScript", "Vite"],
  },
  {
    title: "Norah's Beauty Hub",
    description:
      "A store for a beauty brand that used to take orders in WhatsApp DMs. Paystack checkout, inventory, and a small admin dashboard.",
    live: "https://norahsbeautyhub.pxxl.click",
    category: "products",
    stack: ["React", "Paystack", "Vercel"],
  },
  {
    title: "contextpack",
    description:
      "An npm CLI that packs a codebase into one file for an LLM, with ignore rules and token limits so you don't waste half the context on node_modules.",
    live: "https://npmjs.com/package/@halxdocs/contextpack",
    github: "https://github.com/HalxDocs/contextpack",
    category: "tools",
    stack: ["TypeScript", "Node.js", "npm"],
  },
  {
    title: "API Graveyard",
    description:
      "A searchable archive of API shutdowns and the migration notes they left behind.",
    live: "/api-graveyard",
    category: "products",
    stack: ["React", "Vite", "TypeScript"],
  },
  {
    title: "lazydb",
    description:
      "A database TUI for people who would rather not open a GUI. Connect, query, and edit from the terminal.",
    github: "https://github.com/HalxDocs/lazydb",
    category: "tools",
    stack: ["Go", "bubbletea", "SQLite"],
  },

  // ── More open source ──
  {
    title: "keyway",
    description:
      "Self-hosted SSO for Go apps. One integration in your service, SAML or OIDC to each customer's IdP, and a single binary to deploy.",
    github: "https://github.com/HalxDocs/keyway",
    category: "tools",
    stack: ["Go", "SAML", "OIDC"],
  },
  {
    title: "dashdev",
    description:
      "One command to run a local service stack with health checks, logs, and a shutdown that actually kills everything.",
    github: "https://github.com/HalxDocs/dashdev",
    category: "tools",
    stack: ["Go", "YAML", "Docker"],
  },
  {
    title: "zryl",
    description:
      "A CLI that records what happened when a command ran (output, exit status, environment) and gives you a link to share.",
    live: "https://zryl.vercel.app",
    github: "https://github.com/HalxDocs/zryl",
    category: "tools",
    stack: ["Go", "CLI", "Vercel"],
  },
  {
    title: "onceo-core",
    description:
      "Webhook reconciliation for African payment providers. HMAC verification and idempotent storage for the events that always arrive twice.",
    github: "https://github.com/HalxDocs/onceo-core",
    category: "tools",
    stack: ["Go", "HMAC", "PostgreSQL"],
  },
  {
    title: "TraceLite",
    description:
      "A local tracing tool that turns backend requests into timelines and flame graphs without a hosted agent.",
    live: "https://tracelite.vercel.app",
    github: "https://github.com/HalxDocs/tracelite",
    category: "tools",
    stack: ["Go", "OpenTelemetry", "React"],
  },
  {
    title: "ImpactGraph",
    description:
      "A dependency impact analyzer that answers 'if I change this, what breaks?' by walking the graph instead of grepping.",
    live: "https://impactgraph-kappa.vercel.app",
    github: "https://github.com/HalxDocs/impactgraph",
    category: "tools",
    stack: ["TypeScript", "Graph analysis", "React"],
  },
  {
    title: "bachs-go",
    description:
      "A Go SDK for the Bachs payments API: checkouts, subscriptions, payouts, and webhooks, with sandbox defaults.",
    github: "https://github.com/HalxDocs/bachs-go",
    category: "tools",
    stack: ["Go", "REST", "Webhooks"],
  },

  // ── Products & client work ──
  {
    title: "Adeola Memorial College",
    description:
      "A school site with voice navigation and spoken page reading, plus the usual admissions and news pages.",
    live: "https://amc-2-one.vercel.app",
    category: "products",
    stack: ["React", "Vite", "Web Speech API"],
  },
  {
    title: "MediCare Hospital",
    description:
      "A hospital site with services, doctors, appointment booking, and contact.",
    live: "https://med-iota-neon.vercel.app",
    category: "products",
    stack: ["React", "Vite", "CSS"],
  },
  {
    title: "PetGuard Pro",
    description:
      "A storefront for a veterinary brand that was tired of selling through DMs.",
    live: "https://petcare-ochre.vercel.app",
    github: "https://github.com/HalxDocs/petcare",
    category: "products",
    stack: ["React", "Vite", "Vercel"],
  },
  {
    title: "JambQuiz",
    description:
      "A timed practice app and the Go backend behind it: leaderboards, rate limits, and a public guestbook.",
    live: "https://jambquiz.pxxl.click",
    github: "https://github.com/HalxDocs/jambquiz",
    category: "products",
    stack: ["React", "Go", "PostgreSQL", "Paystack"],
  },
  {
    title: "Symphony",
    description:
      "A digital wedding invitation that opens like an envelope on a phone and collects RSVPs without a group thread.",
    live: "https://symphony-wedding.vercel.app",
    category: "products",
    stack: ["React", "Vite", "Vercel"],
  },
];
