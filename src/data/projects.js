export const projects = [
  {
    slug: "symphony",
    title: "Symphony",
    label: "Wedding Tech",
    oneLiner: "Digital wedding invitations for Nigerian couples who actually care about the details.",
    problem:
      "Nigerian weddings are big, expensive, deeply important affairs. The invitations are still blurry JPEGs on WhatsApp. Guests RSVP in a group chat. There's no guest list. No tracking. Nothing.",
    built:
      "A full web app with an animated envelope opening experience, shareable guest links, a live admin dashboard showing RSVPs in real time, WhatsApp sharing integration, and CSV guest list export. Deployed on Vercel, powered by Firebase Firestore.",
    features: [
      "Animated envelope unwrap on link open",
      "Per-guest shareable links with personalised names",
      "Live RSVP dashboard for the couple",
      "WhatsApp share button that pre-composes messages",
      "Password-protected admin",
      "One-click CSV guest list export",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Firebase Firestore", "Vercel"],
    image: "/symphony.png",
    href: null,
    note: "Available on request — DM me on X to set one up for your wedding.",
    live: false,
  },
  {
    slug: "fintech-backend",
    title: "Nigerian Fintech Backend",
    label: "Fintech / Banking",
    oneLiner: "Production-grade backend for a Nigerian mobile banking application.",
    problem:
      "A fintech product needed a backend that could handle real Nigerian users — phone-number-first authentication, wallets tied to Nigerian phone numbers, proper transaction handling, and the security that financial products actually require.",
    built:
      "A complete NestJS backend with phone-number-first auth, OTP verification with brute-force lockout, account numbers derived from Nigerian phone numbers, atomic wallet creation using MongoDB transactions, and a full ledger system split into money movement, query, reconciliation, and helper services. Strict TypeScript throughout.",
    features: [
      "Phone-number-first auth with OTP + brute-force lockout",
      "Account numbers derived deterministically from phone numbers",
      "Atomic wallet creation via MongoDB transactions",
      "Ledger split into movement, query, reconciliation, helpers",
      "Strict TypeScript throughout the stack",
    ],
    tech: ["NestJS", "MongoDB", "Mongoose", "TypeScript", "JWT"],
    image: "/fintech.png",
    href: null,
    note: "Client project — no public link. Details available on request.",
    live: false,
  },
  {
    slug: "norahsbeautyhub",
    title: "Norah's Beauty Hub",
    label: "E-commerce",
    oneLiner: "Full-stack e-commerce platform for a Nigerian makeup and beauty business.",
    problem:
      "A Nigerian beauty brand needed an online store that could actually handle customers — product browsing, cart, checkout, and an admin side that wasn't a nightmare to manage.",
    built:
      "A complete e-commerce platform with live debounced product search, Cloudinary image uploads, a responsive admin dashboard with real-time analytics and charts, and a full auth system. Production bugs tracked and fixed.",
    features: [
      "Live debounced product search",
      "Cloudinary image upload pipeline",
      "Admin dashboard with real-time analytics + charts",
      "Full auth (customers + admin)",
      "Cart, wishlist, coupon system, Paystack checkout",
    ],
    tech: ["React", "Node.js", "Cloudinary", "MongoDB", "Tailwind CSS"],
    image: "/public/norahsbeautyhub-hero.png",
    href: "https://norahsbeautyhub.pxxl.click",
    liveLabel: "Visit live",
    live: true,
  },
  {
    slug: "bibleplus",
    title: "BiblePlus Backend",
    label: "Backend Rescue",
    oneLiner: "Backend for a Bible quiz app — rebuilt for reliability and daily consistency.",
    problem:
      "The app was crashing in production. A missing API key was taking down the entire service. The daily quiz system was unreliable — users weren't getting consistent content.",
    built:
      "A redesigned QuizDailyService using a verse pool of 205 questions with a deterministic daily seed algorithm. Two Render deployment issues resolved: a hard crash from a missing API key, and a gitignored Firebase service account fixed via runtime environment variable injection.",
    features: [
      "Deterministic daily quiz selection from 205-question pool",
      "Hardened startup with explicit env-var validation",
      "Firebase service account loaded via base64 env var",
      "Zero downtime during the fix",
    ],
    tech: ["Node.js", "TypeScript", "Firebase", "Render"],
    image: "/bibleplus.png",
    href: null,
    note: "Backend contract project — no public link.",
    live: false,
  },
  {
    slug: "contextpack",
    title: "contextpack",
    label: "Open Source · CLI",
    oneLiner: "Open-source CLI that bundles your entire codebase into one LLM-ready file.",
    problem:
      "Feeding a codebase to an LLM is messy — copying files one by one, losing context, missing imports. No clean tool existed for bundling a project into a format AI tools could actually use well.",
    built:
      "A TypeScript CLI published to npm that walks a project directory and outputs a single markdown or JSON file with all relevant code, properly formatted for LLM context windows. Configurable ignore patterns, multiple output formats, clean CLI interface.",
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
    slug: "lazydb",
    title: "lazydb",
    label: "Open Source · TUI",
    oneLiner: "A keyboard-driven terminal UI for databases — like lazygit but for SQL.",
    problem:
      "Switching between a terminal and a GUI database client breaks flow. Developers who live in the terminal needed a way to browse, query, and manage databases without leaving the keyboard.",
    built:
      "A terminal UI built in Go using bubbletea, lipgloss, and bubbles. Supports Postgres, MySQL, and SQLite. Features include keyboard navigation with highlighted rows, row counts in the sidebar, a live SQL query bar, and saved connection configs.",
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
