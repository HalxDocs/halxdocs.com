import { motion } from "framer-motion";
import { FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";
import { memo } from "react";

const skills = [
  "Product Engineering",
  "System Architecture",
  "Shipping to Production",
  "Scalable Backend Systems",
  "Frontend for Real Users",
  "Performance & Reliability",
  "Technical Decision-Making",
];

const socialLinks = [
  {
    icon: <FiGithub size={16} />,
    href: "https://github.com/halxdocs",
    label: "GitHub",
  },
  {
    icon: <FiInstagram size={16} />,
    href: "https://instagram.com/halxdocs_",
    label: "Instagram",
  },
  {
    icon: <FiLinkedin size={16} />,
    href: "https://www.linkedin.com/in/halx-docs-633272344",
    label: "LinkedIn",
  },
];

/* -------------------- Image Stack -------------------- */
const ImageStack = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Back card */}
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -7 }}
      whileInView={{ opacity: 1, y: 0, rotate: -7 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute"
      style={{ zIndex: 1, left: "4%", top: "8%" }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          width: "clamp(150px, 18vw, 200px)",
          aspectRatio: "3/4",
          outline: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <img
          src="/halx4.jpeg"
          alt="HalxDocs"
          className="w-full h-full object-cover grayscale"
        />
      </div>
    </motion.div>

    {/* Front card */}
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 6 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="absolute"
      style={{ zIndex: 2, right: "4%", top: "18%" }}
    >
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          width: "clamp(160px, 20vw, 220px)",
          aspectRatio: "3/4",
          outline: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <img
          src="/halx3.jpeg"
          alt="HalxDocs"
          className="w-full h-full object-cover"
        />
        {/* Label */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            border: "0.5px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.8)",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Engineer
        </div>
      </div>
    </motion.div>

    {/* Chess badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-10 left-[8%] z-10 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "0.5px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="text-xl leading-none">♞</span>
      <div>
        <p
          className="text-[9px] uppercase tracking-widest font-semibold"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Syne', sans-serif" }}
        >
          Strategy
        </p>
        <p className="text-[13px] font-medium text-white/80">Chess Player</p>
      </div>
    </motion.div>

    {/* Years badge */}
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.45, duration: 0.5 }}
      className="absolute top-6 right-[6%] z-10 px-4 py-2 rounded-full"
      style={{
        background: "#fff",
        color: "#000",
        fontFamily: "'Syne', sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      3+ Years
    </motion.div>
  </div>
);

/* -------------------- About Section -------------------- */
export default function About() {
  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ background: "#000", color: "#fff" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-16"
        >
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
            About Me
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 max-w-3xl"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#fff",
          }}
        >
          Building systems that{" "}
          <span style={{ color: "rgba(255,255,255,0.28)", fontStyle: "italic", fontWeight: 400 }}>
            outlast trends
          </span>
        </motion.h2>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Image stack */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative h-[420px] sm:h-[500px]">
              <ImageStack />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">

            {/* Bio */}
            <div className="space-y-5 mb-12">
              {[
                "I'm a Product engineer who helps founders ship faster and scale smarter. I specialize in building high-conversion websites, internal tools, and systems that reduce operational friction.",
                "My approach combines technical depth with business context. I don't just write code — I architect solutions that align engineering decisions with revenue goals and user outcomes.",
                "Currently building developer tools and SaaS platforms while contributing to open-source projects that improve how we ship software.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontSize: "clamp(14px, 1.1vw, 17px)",
                    lineHeight: 1.75,
                    color: i === 2 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)",
                    fontWeight: i === 2 ? 500 : 400,
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", marginBottom: "2.5rem" }} />

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.25)",
                  fontWeight: 600,
                }}
              >
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 100,
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.6)",
                      background: "rgba(255,255,255,0.04)",
                      border: "0.5px solid rgba(255,255,255,0.10)",
                      display: "inline-block",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-4"
            >
              <span
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.22)",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 500,
                }}
              >
                Connect
              </span>
              <div style={{ width: 20, height: "0.5px", background: "rgba(255,255,255,0.15)" }} />
              <div className="flex gap-2.5">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.05)",
                      border: "0.5px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.55)",
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}