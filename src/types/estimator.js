export const PROJECT_TYPES = [
  { id: "backend", label: "REST API / Backend", desc: "Auth, CRUD, database, deployment", min: 1000, max: 2000, weeks: "1-2" },
  { id: "saas", label: "SaaS Platform", desc: "Multi-tenant, billing, dashboards", min: 2500, max: 6000, weeks: "3-6" },
  { id: "cli", label: "CLI Tool", desc: "Go or TypeScript, published to npm/pkg", min: 400, max: 1000, weeks: "3-7 days" },
  { id: "fintech", label: "Fintech System", desc: "Wallets, ledger, KYC, compliance", min: 3500, max: 8500, weeks: "4-8" },
  { id: "devtool", label: "Dev Tool / SDK", desc: "SDK, API wrapper, DX-focused", min: 600, max: 1500, weeks: "1-2" },
  { id: "fullstack", label: "Full-Stack App", desc: "React frontend + Go/TypeScript backend", min: 1800, max: 4500, weeks: "2-5" },
];

export const FEATURES = [
  { id: "auth", label: "Auth system", cost: 450 },
  { id: "payments", label: "Payment integration", cost: 700 },
  { id: "admin", label: "Admin dashboard", cost: 850 },
  { id: "api", label: "3rd-party API integration", cost: 375 },
  { id: "realtime", label: "Real-time (WebSocket/SSE)", cost: 600 },
  { id: "uploads", label: "File uploads + storage", cost: 350 },
  { id: "ratelimit", label: "Rate limiting + security", cost: 225 },
  { id: "multitenant", label: "Multi-tenancy", cost: 950 },
];

export const TIMELINES = [
  { id: "asap", label: "ASAP", desc: "1-2 weeks", mult: 1.4, warn: "40% rush premium applied" },
  { id: "normal", label: "Normal", desc: "3-5 weeks", mult: 1.0, warn: null },
  { id: "relaxed", label: "Relaxed", desc: "5-8 weeks", mult: 0.9, warn: null },
  { id: "flexible", label: "Flexible", desc: "8+ weeks", mult: 0.85, warn: null },
];

export const USD_TO_NGN = 1370;
