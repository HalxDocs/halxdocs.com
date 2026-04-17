import { motion, useSpring, useMotionValue } from "framer-motion";
import { useState, memo, useRef } from "react";

/* -------------------- Project Data -------------------- */

const items = [
  {
    label: "Cosmetics / E-commerce",
    title: "Norahsbeautyhub",
    description:
      "Full-stack cosmetics platform with cart, wishlist, Paystack payments, coupon system, email notifications, and an admin dashboard.",
    href: "https://norahsbeautyhub.pxxl.click/",
    image: "/norahsbeautyhub-hero.png",
  },
  {
    label: "Developer Tool",
    title: "Jsonstack.dev",
    description:
      "A toolkit for validating, formatting, and comparing JSON — reducing errors and saving debugging time.",
    href: "https://jsonstack.dev",
    image: "/jsonstack.png",
  },
  {
    label: "Business Website",
    title: "SavBites",
    description:
      "Conversion-focused restaurant website designed to showcase menus, ambience, and drive customer engagement.",
    href: "https://sav-six.vercel.app",
    image: "/savbites.png",
  },
  {
    label: "AI Utility",
    title: "Cortex",
    description:
      "AI-powered reflection tool to help users organise thoughts, improve clarity, and make better decisions.",
    href: "https://corte-x.vercel.app",
    image: "/cortex.png",
  },
  {
    label: "Healthcare Platform",
    title: "Medcare",
    description:
      "Medical web platform for managing patients, appointments, and healthcare workflows efficiently.",
    href: "https://med-iota-neon.vercel.app/",
    image: "/med.png",
  },
  {
    label: "CLI Tool",
    title: "Zryl",
    description:
      "Records terminal activity — commands, timestamps, OS — and generates a shareable session link.",
    href: "https://zryl.vercel.app",
    image: "/zryl.png",
  },
];

/* -------------------- Project Row -------------------- */

const ProjectItem = memo(function ProjectItem({ item, index }) {
  const [hovered, setHovered] = useState(false);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 140, damping: 22 });
  const y = useSpring(mouseY, { stiffness: 140, damping: 22 });

  const handleMove = (e) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 160);
    mouseY.set(e.clientY - rect.top - 105);
  };

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block"
      style={{
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        padding: "clamp(28px, 4vw, 56px) 0",
        textDecoration: "none",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

        {/* Left */}
        <div className="relative z-10 max-w-2xl">
          {/* Label + index */}
          <div className="flex items-center gap-3 mb-4">
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.25)",
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.15)",
                letterSpacing: "0.1em",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(30px, 6vw, 72px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
              transition: "color 0.4s ease",
              marginBottom: 12,
            }}
          >
            {item.title}
          </h3>

          {/* Description */}
          <motion.p
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: "13px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 420,
            }}
          >
            {item.description}
          </motion.p>

          {/* Mobile image */}
          <div
            className="md:hidden mt-5 rounded-xl overflow-hidden"
            style={{
              aspectRatio: "16/10",
              outline: "0.5px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right — arrow */}
        <div className="relative z-10 shrink-0 flex items-center gap-3">
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500,
            }}
          >
            View
          </motion.span>

          <motion.div
            animate={{
              background: hovered ? "#fff" : "rgba(255,255,255,0.05)",
              borderColor: hovered ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.12)",
            }}
            transition={{ duration: 0.35 }}
            className="flex items-center justify-center rounded-full"
            style={{
              width: 48,
              height: 48,
              border: "0.5px solid rgba(255,255,255,0.12)",
              flexShrink: 0,
            }}
          >
            <motion.svg
              animate={{ rotate: hovered ? 0 : -45, color: hovered ? "#000" : "rgba(255,255,255,0.7)" }}
              transition={{ duration: 0.35 }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </motion.svg>
          </motion.div>
        </div>
      </div>

      {/* Desktop hover image */}
      {!isTouch && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.94 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block absolute top-0 left-0 rounded-2xl overflow-hidden"
          style={{
            x,
            y,
            width: 320,
            height: 210,
            outline: "0.5px solid rgba(255,255,255,0.10)",
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 60%)",
            }}
          />
        </motion.div>
      )}
    </motion.a>
  );
});

/* -------------------- Section -------------------- */

export default function SelectedWork() {
  const githubRef = useRef(null);
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 120, damping: 18 });
  const gy = useSpring(my, { stiffness: 120, damping: 18 });

  return (
    <section
      id="work"
      className="relative overflow-hidden py-28 md:py-40"
      style={{ background: "#000", color: "#fff" }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Section label */}
            <div className="flex items-center gap-3 mb-8">
              <span style={{ width: 16, height: 1, background: "rgba(255,255,255,0.2)", display: "block" }} />
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.28)",
                  fontWeight: 500,
                }}
              >
                Selected Work
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                color: "#fff",
              }}
            >
              Built to Ship.{" "}
              <span style={{ color: "rgba(255,255,255,0.28)", fontStyle: "italic", fontWeight: 400 }}>
                Built to Scale.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block"
            style={{
              maxWidth: 240,
              fontSize: 13,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.3)",
              textAlign: "right",
            }}
          >
            Production-grade systems that handle real traffic, real users, and real revenue.
          </motion.p>
        </div>

        {/* Projects */}
        <div>
          {items.map((item, i) => (
            <ProjectItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <motion.a
            ref={githubRef}
            href="https://github.com/HalxDocs"
            target="_blank"
            rel="noreferrer"
            onMouseMove={(e) => {
              if (isTouch || !githubRef.current) return;
              const rect = githubRef.current.getBoundingClientRect();
              mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
              my.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
            }}
            onMouseLeave={() => { mx.set(0); my.set(0); }}
            style={{ x: gx, y: gy, textDecoration: "none" }}
            className="group inline-flex items-center gap-2.5"
          >
            <span
              className="relative"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.05em",
                color: "rgba(255,255,255,0.4)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              Explore more on GitHub
              <span
                className="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.4)" }}
              />
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-white transition-colors duration-200"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}