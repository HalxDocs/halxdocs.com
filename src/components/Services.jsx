import { motion, useMotionValue, useSpring } from "framer-motion";
import { memo, useRef, useState } from "react";

/* -------------------- Service Row -------------------- */

const ServiceRow = memo(function ServiceRow({ left, right, video, index, total }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-10 sm:py-14"
      style={{
        borderBottom: index < total - 1 ? "0.5px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      {/* Index */}
      <span
        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.18)",
          fontWeight: 500,
          width: 32,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Left word */}
      <h3
        className="text-center lg:text-left w-full lg:w-auto"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(36px, 7vw, 88px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          textTransform: "uppercase",
          color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.12)",
          transition: "color 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          userSelect: "none",
        }}
      >
        {left}
      </h3>

      {/* Video card */}
      <motion.div
        animate={{
          scale: hovered ? 1 : 0.92,
          opacity: hovered ? 1 : 0.35,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative shrink-0 rounded-2xl overflow-hidden"
        style={{
          width: "clamp(220px, 22vw, 300px)",
          aspectRatio: "16/10",
          outline: "0.5px solid rgba(255,255,255,0.10)",
        }}
      >
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
            transition: "filter 0.6s ease",
          }}
        />
        {/* Dark scrim */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.25) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Right word */}
      <h3
        className="text-center lg:text-right w-full lg:w-auto"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(36px, 7vw, 88px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          textTransform: "uppercase",
          color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.12)",
          transition: "color 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          userSelect: "none",
        }}
      >
        {right}
      </h3>
    </motion.div>
  );
});

/* -------------------- Services Section -------------------- */

const services = [
  { left: "Web", right: "Platforms", video: "/web_develop.mp4" },
  { left: "Mobile", right: "Apps", video: "/solid_engineering.mp4" },
  { left: "Product", right: "Engineering", video: "/3d_web_experiences.mp4" },
  { left: "Backend", right: "Systems", video: "/interface_design.mp4" },
  { left: "Growth", right: "Optimization", video: "/web_develop.mp4" },
];

export default function Services() {
  return (
    <section
      id="services"
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

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 sm:mb-28"
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <span
              style={{
                width: 16,
                height: 1,
                background: "rgba(255,255,255,0.2)",
                display: "block",
              }}
            />
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
              Services
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#fff",
              maxWidth: 600,
            }}
          >
            What I{" "}
            <span
              style={{
                color: "rgba(255,255,255,0.28)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              build & ship
            </span>
          </h2>
        </motion.div>

        {/* Service rows — offset left to accommodate index numbers */}
        <div style={{ paddingLeft: "clamp(0px, 3vw, 48px)" }}>
          {services.map((s, i) => (
            <ServiceRow
              key={i}
              index={i}
              total={services.length}
              left={s.left}
              right={s.right}
              video={s.video}
            />
          ))}
        </div>

      </div>
    </section>
  );
}