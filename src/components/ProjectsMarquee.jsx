import { motion } from "framer-motion";
import { marqueeProjects } from "../data/marqueeProjects";
import { memo, useRef, useState } from "react";

/* -------------------- Project Card -------------------- */
const ProjectCard = memo(function ProjectCard({ src, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale: hovered ? 1.02 : 1 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="shrink-0 will-change-transform cursor-pointer"
      style={{
        borderRadius: "16px",
        outline: hovered
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid rgba(255,255,255,0.07)",
        outlineOffset: "0px",
        overflow: "hidden",
        transition: "outline-color 0.35s ease",
        width: "clamp(210px, 26vw, 340px)",
        aspectRatio: "16 / 10",
        position: "relative",
      }}
    >
      {/* Image fills entire card */}
      <img
        src={src}
        alt={`Project ${index + 1}`}
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translateZ(0)",
          display: "block",
        }}
      />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "14px 16px",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontWeight: 600,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </motion.div>
    </motion.div>
  );
});

/* -------------------- Marquee Section -------------------- */
export default function MarqueeProjects() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative z-30 w-full overflow-hidden bg-transparent"
      style={{ marginTop: "-120px" }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 px-8 sm:px-12 mb-6"
      >
        <span
          style={{ width: 16, height: 1, background: "rgba(255,255,255,0.2)", display: "block" }}
        />
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 500,
          }}
        >
          Selected Work
        </span>
      </motion.div>

      <div
        className="py-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex items-center">

          {/* Edge fades — update #000 to match your exact bg color */}
          <div
            className="absolute inset-y-0 left-0 w-[10%] z-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-[10%] z-20 pointer-events-none"
            style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
          />

          <motion.div
            style={{ display: "flex", gap: "20px", width: "max-content", paddingInline: 24 }}
            animate={isHovered ? {} : { x: ["0%", "-50%"] }}
            transition={{
              duration: 70,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...marqueeProjects, ...marqueeProjects].map((src, i) => (
              <ProjectCard
                key={`project-${i}`}
                src={src}
                index={i % marqueeProjects.length}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}