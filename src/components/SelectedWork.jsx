import { motion } from "framer-motion";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const ProjectRow = memo(function ProjectRow({ item, index, total }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: index < total - 1 ? "0.5px solid var(--border)" : "none",
      }}
    >
      <div className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 py-10 sm:py-14">
        {/* Left: number + title + one-liner + tech */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span
              className="font-mono"
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--accent)",
                fontWeight: 600,
              }}
            >
              {item.live ? "Live" : "Client Work"}
            </span>
          </div>

          <h3
            className="font-display"
            style={{
              fontSize: "clamp(32px, 5.5vw, 64px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text)",
              opacity: hovered ? 1 : 0.88,
              transition: "opacity 0.3s ease",
            }}
          >
            {item.title}
          </h3>

          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.7,
              color: "var(--text-muted)",
              maxWidth: 540,
            }}
          >
            {item.oneLiner}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {item.tech.map((t) => (
              <span
                key={t}
                className="font-mono"
                style={{
                  padding: "4px 10px",
                  borderRadius: 100,
                  fontSize: "10px",
                  color: "var(--text-muted)",
                  background: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <Link
              to={`/projects/${item.slug}`}
              className="font-mono inline-flex items-center gap-2 transition-all hover:scale-[1.02]"
              style={{
                padding: "10px 18px",
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
              View project
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>

            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono inline-flex items-center gap-2"
                style={{
                  padding: "10px 18px",
                  borderRadius: 100,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  fontWeight: 700,
                  background: "transparent",
                  border: "0.5px solid var(--border)",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.borderColor = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                {item.liveLabel || "Visit live"}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right: arrow indicator */}
        <Link
          to={`/projects/${item.slug}`}
          aria-label={`View ${item.title} details`}
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: hovered ? "var(--accent)" : "var(--surface)",
              border: `0.5px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
              transition: "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
              transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={hovered ? "#fff" : "var(--text-muted)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.3s ease" }}
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </Link>
      </div>
    </motion.div>
  );
});

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="relative py-28 sm:py-36"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8"
        >
          <div className="max-w-2xl">
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
                Selected Work
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
              Six projects.{" "}
              <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
                Real users. Real systems.
              </span>
            </h2>
          </div>

          <p
            className="md:text-right"
            style={{
              maxWidth: 280,
              fontSize: "13px",
              lineHeight: 1.7,
              color: "var(--text-muted)",
            }}
          >
            From fintech backends to wedding apps — production work that ships and stays up.
          </p>
        </motion.div>

        <div>
          {projects.map((item, i) => (
            <ProjectRow key={item.slug} item={item} index={i} total={projects.length} />
          ))}
        </div>

      </div>
    </section>
  );
}
