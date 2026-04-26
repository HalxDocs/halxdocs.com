import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { projects, projectBySlug } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectBySlug(slug);

  if (!project) return <Navigate to="/" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article
      className="pt-32 pb-32"
      style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8">

        {/* Back link */}
        <Link
          to="/#work"
          className="font-mono inline-flex items-center gap-2 mb-12 transition-colors"
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--text-muted)",
            fontWeight: 600,
            textDecoration: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All projects
        </Link>

        {/* Label + status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6 flex-wrap"
        >
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--accent)",
              fontWeight: 600,
            }}
          >
            {project.label}
          </span>
          <span style={{ width: 12, height: 1, background: "var(--border)", display: "block" }} />
          <span
            className="font-mono"
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            {project.live ? "Live in production" : "Client / contract"}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display"
          style={{
            fontSize: "clamp(40px, 6.5vw, 72px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--text)",
            marginBottom: 20,
          }}
        >
          {project.title}
        </motion.h1>

        {/* One-liner */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55 }}
          style={{
            fontSize: "19px",
            lineHeight: 1.55,
            color: "var(--text-muted)",
            maxWidth: 620,
            marginBottom: 36,
          }}
        >
          {project.oneLiner}
        </motion.p>

        {/* External link button */}
        {project.href && (
          <motion.a
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="font-mono inline-flex items-center gap-2 mb-12 transition-all hover:scale-[1.02]"
            style={{
              padding: "12px 22px",
              borderRadius: 100,
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontWeight: 700,
              background: "var(--accent)",
              color: "#fff",
              textDecoration: "none",
              boxShadow: "var(--shadow-accent)",
            }}
          >
            {project.liveLabel || "Visit live"}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.a>
        )}

        {/* Hero image */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="overflow-hidden mb-16"
            style={{
              borderRadius: 20,
              border: "0.5px solid var(--border)",
              background: "var(--surface)",
              aspectRatio: "16 / 10",
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </motion.div>
        )}

        {/* The Problem */}
        <Section heading="The Problem">{project.problem}</Section>

        {/* What Was Built */}
        <Section heading="What Was Built">{project.built}</Section>

        {/* Features */}
        {project.features?.length > 0 && (
          <div className="mb-16">
            <Heading>Highlights</Heading>
            <ul className="space-y-3">
              {project.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.65,
                    color: "var(--text)",
                    opacity: 0.85,
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "11px",
                      color: "var(--accent)",
                      paddingTop: 4,
                      minWidth: 24,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech */}
        <div className="mb-16">
          <Heading>Tech</Heading>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono"
                style={{
                  padding: "6px 13px",
                  borderRadius: 100,
                  fontSize: "11px",
                  color: "var(--text)",
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  letterSpacing: "0.02em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Note */}
        {project.note && (
          <div
            className="mb-16"
            style={{
              padding: "20px 22px",
              borderRadius: 14,
              background: "var(--surface)",
              border: "0.5px solid var(--border)",
              fontSize: "14px",
              lineHeight: 1.65,
              color: "var(--text-muted)",
            }}
          >
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>Note —</strong> {project.note}
          </div>
        )}

        {/* Next project */}
        <div
          className="mt-20 pt-12"
          style={{ borderTop: "0.5px solid var(--border)" }}
        >
          <Link
            to={`/projects/${next.slug}`}
            className="group flex flex-col gap-3 transition-all hover:-translate-y-0.5"
            style={{ textDecoration: "none" }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              Next project →
            </span>
            <span
              className="font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                color: "var(--text)",
              }}
            >
              {next.title}
            </span>
          </Link>
        </div>

      </div>
    </article>
  );
}

function Heading({ children }) {
  return (
    <h2
      className="font-mono mb-5"
      style={{
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.22em",
        color: "var(--accent)",
        fontWeight: 600,
      }}
    >
      {children}
    </h2>
  );
}

function Section({ heading, children }) {
  return (
    <div className="mb-16">
      <Heading>{heading}</Heading>
      <p
        style={{
          fontSize: "17px",
          lineHeight: 1.75,
          color: "var(--text)",
          opacity: 0.85,
          maxWidth: 640,
        }}
      >
        {children}
      </p>
    </div>
  );
}
