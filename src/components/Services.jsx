import { motion } from "framer-motion";
import { memo, useState } from "react";

const services = [
  {
    title: "Backend API Development",
    description:
      "Need a solid API that can handle real traffic, real users, and real money? I build production-ready backends — auth systems, payment flows, data pipelines — the kind that don't fall over.",
    tags: ["NestJS", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
  },
  {
    title: "Full-Stack Web Products",
    description:
      "From zero to live. I build complete web products — frontend, backend, database, deployment. You give me the idea and the access. I handle the rest.",
    tags: ["React", "Remix", "Next.js", "NestJS", "Vercel", "Firebase"],
  },
  {
    title: "SaaS & Product Builds",
    description:
      "Got a SaaS idea? I can take it from Figma (or a napkin sketch) to a working product with subscriptions, dashboards, user management — the full thing.",
    tags: ["TypeScript", "React", "NestJS", "Stripe", "AWS / Render"],
  },
  {
    title: "CLI Tools & Dev Tooling",
    description:
      "Need an internal CLI, terminal UI, or developer tool? I build fast, single-binary command-line tools in Go — automation, codegen, ops scripts, terminal dashboards. Distributable, scriptable, no runtime to install.",
    tags: ["Go", "Cobra", "bubbletea", "lipgloss", "TypeScript"],
  },
];

const ServiceCard = memo(function ServiceCard({ service, index, total }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10 py-10 sm:py-14"
      style={{
        borderBottom: index < total - 1 ? "0.5px solid var(--border)" : "none",
      }}
    >
      <div className="flex items-center gap-4 lg:w-32 shrink-0">
        <span
          className="font-mono"
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="flex-1 min-w-0 max-w-2xl">
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--text)",
            opacity: hovered ? 1 : 0.92,
            transition: "opacity 0.3s ease",
            marginBottom: 16,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            maxWidth: 520,
          }}
        >
          {service.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 lg:max-w-[260px] lg:justify-end">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono"
            style={{
              padding: "5px 11px",
              borderRadius: 100,
              fontSize: "11px",
              letterSpacing: "0.02em",
              color: hovered ? "var(--text)" : "var(--text-muted)",
              background: hovered ? "var(--accent-soft)" : "var(--surface)",
              border: `0.5px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
              transition: "color 0.3s ease, background 0.3s ease, border-color 0.3s ease",
              whiteSpace: "nowrap",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 sm:py-28"
      style={{ background: "var(--bg)", color: "var(--text)", borderTop: "1px solid var(--border)" }}
    >
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-7">
            <span style={{ width: 18, height: 1, background: "var(--accent)", display: "block" }} />
            <span
              className="font-mono"
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              Services
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            What I build & ship.{" "}
            <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
              Production-grade.
            </span>
          </h2>
        </motion.div>

        <div>
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} total={services.length} />
          ))}
        </div>

      </div>
    </section>
  );
}
