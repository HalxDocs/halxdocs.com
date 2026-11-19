// Single source of truth for the homepage list and the "All projects" popup.
// `featured` items also render as rows in the SelectedWork section.
export const projects = [
  {
    title: "reqit",
    description:
      "A free, offline, Git-first API client that's been downloaded 700+ times — the Postman alternative developers actually switch to.",
    live: "https://reqit.dev",
    github: "https://github.com/HalxDocs/reqit",
    category: "tools",
    featured: true,
  },
  {
    title: "Aegis",
    description:
      "A failure lab for distributed systems — a deterministic Go simulator and its TypeScript port, kept honest by a drift guard that proves both describe the same world.",
    live: "https://aegis-labx.vercel.app/",
    github: "https://github.com/HalxDocs/aegis",
    category: "tools",
    featured: true,
  },
  {
    title: "DLQ Inspector",
    description:
      "A local-first CLI for inspecting, analyzing, classifying, and safely recovering failed messages from dead-letter queues.",
    github: "https://github.com/HalxDocs/dlq_inspector",
    category: "tools",
    featured: true,
  },
  {
    title: "Myshoplet",
    description:
      "An all-in-one selling platform that puts Nigerian small businesses online — with 65+ daily orders and 100+ active vendors.",
    live: "https://myshoplet.com",
    category: "products",
    featured: true,
  },
  {
    title: "274Lab",
    description:
      "A structured exam-prep platform that turned scattered JAMB practice into a measurable training cycle for thousands of students.",
    live: "https://274lab.com",
    category: "products",
    featured: true,
  },
  {
    title: "jsonstack",
    description:
      "A JSON viewer built to handle the large, messy files that break every other formatter — collapsible trees, fast search, and path copying.",
    live: "https://jsonstack.dev",
    github: "https://github.com/HalxDocs/json-formatter",
    category: "tools",
    featured: true,
  },
  {
    title: "Norah's Beauty Hub",
    description:
      "A full e-commerce store that took a Nigerian beauty brand from WhatsApp JPEGs to real online sales, with Paystack checkout and an admin dashboard.",
    live: "https://norahsbeautyhub.pxxl.click",
    category: "products",
    featured: true,
  },
  {
    title: "contextpack",
    description:
      "An open-source CLI that bundles your codebase into a single LLM-ready file, published to npm.",
    live: "https://npmjs.com/package/@halxdocs/contextpack",
    github: "https://github.com/HalxDocs/contextpack",
    category: "tools",
    featured: true,
  },
  {
    title: "API Graveyard",
    description:
      "A memorial for the APIs we built on and lost — a searchable graveyard of shutdowns turned into lessons worth remembering.",
    live: "/api-graveyard",
    category: "products",
    featured: true,
  },
  {
    title: "lazydb",
    description:
      "A keyboard-driven database TUI that keeps terminal-native developers out of the GUI and in flow.",
    github: "https://github.com/HalxDocs/lazydb",
    category: "tools",
    featured: true,
  },

  // ── More open source ──
  {
    title: "keyway",
    description:
      "Self-hosted enterprise SSO for Go — one OAuth2-style flow in your app, SAML or OIDC to each customer's IdP, packaged as a single static binary.",
    github: "https://github.com/HalxDocs/keyway",
    category: "tools",
    featured: true,
  },
  {
    title: "dashdev",
    description:
      "One command to run your whole local service stack — lifecycle, health checks, logs, and a terminal dashboard, with no orphaned processes when you quit.",
    github: "https://github.com/HalxDocs/dashdev",
    category: "tools",
    featured: true,
  },
  {
    title: "zryl",
    description:
      "An open-source CLI that captures what actually happened when a command ran — output, exit status, environment — and turns it into a shareable link.",
    live: "https://zryl.vercel.app",
    github: "https://github.com/HalxDocs/zryl",
    category: "tools",
  },
  {
    title: "onceo-core",
    description:
      "Open-source payment webhook reconciliation for African providers — exactly-once delivery, HMAC verification, and idempotent stores.",
    github: "https://github.com/HalxDocs/onceo-core",
    category: "tools",
  },
  {
    title: "TraceLite",
    description:
      "A local-first backend tracing tool that turns requests into live timelines, span trees, and flame graphs.",
    live: "https://tracelite.vercel.app",
    github: "https://github.com/HalxDocs/tracelite",
    category: "tools",
  },
  {
    title: "ImpactGraph",
    description:
      "Answers \"if this dependency changes, what else breaks?\" — a dependency impact analyzer backed by a graph database.",
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
      "A voice-enabled school website — spoken page reading and voice commands for navigation, plus academics, admissions, news, and contact sections.",
    live: "https://amc-2-one.vercel.app",
    category: "products",
  },
  {
    title: "MediCare Hospital",
    description:
      "A multi-page hospital site covering services, doctors, appointment booking, and contact — responsive and deployed.",
    live: "https://med-iota-neon.vercel.app",
    category: "products",
  },
  {
    title: "PetGuard Pro",
    description:
      "A storefront for a veterinary animal shampoo and disinfectant brand — product catalogue, about, and contact pages.",
    live: "https://petcare-ochre.vercel.app",
    github: "https://github.com/HalxDocs/petcare",
    category: "products",
  },
  {
    title: "JambQuiz",
    description:
      "A timed, exam-style JAMB practice quiz for UTME candidates.",
    live: "https://jambquiz.pxxl.click",
    github: "https://github.com/HalxDocs/jambquiz",
    category: "products",
  },
  {
    title: "Symphony",
    description:
      "A digital wedding invitation guests open on their phone — animated envelope, a personal invitation, and RSVP without the group chat.",
    live: "https://symphony-wedding.vercel.app",
    category: "products",
  },
];
