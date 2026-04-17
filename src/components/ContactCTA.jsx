import { motion } from "framer-motion";
import Beams from "./Beams";

export default function ContactCTA() {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: "88vh", background: "#000" }}
    >
      {/* Beams background */}
      <div className="absolute inset-0">
        <Beams
          beamWidth={2}
          beamHeight={18}
          beamNumber={10}
          lightColor="#ffffff"
          speed={1.6}
          noiseIntensity={1.4}
          scale={0.22}
          rotation={0}
        />
      </div>

      {/* Gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "30%", background: "linear-gradient(to top, #000, transparent)" }}
      />
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "20%", background: "linear-gradient(to bottom, #000, transparent)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-10 py-24">
        <div className="mx-auto max-w-3xl text-center">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex items-center justify-center gap-3 mb-10"
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
                color: "rgba(255,255,255,0.28)",
                fontWeight: 500,
              }}
            >
              Start a project
            </span>
            <span
              style={{ width: 16, height: 1, background: "rgba(255,255,255,0.2)", display: "block" }}
            />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(36px, 7vw, 80px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#fff",
              marginBottom: 0,
            }}
          >
            Let's build something{" "}
            <br className="hidden sm:block" />
            <span
              style={{
                color: "rgba(255,255,255,0.28)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              that actually matters.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.6 }}
            style={{
              marginTop: 24,
              fontSize: "clamp(14px, 1.1vw, 17px)",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.4)",
              maxWidth: 480,
              marginInline: "auto",
            }}
          >
            I work with founders and product teams to design and ship
            focused digital products — built for clarity, performance,
            and long-term growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            style={{ marginTop: 40 }}
          >
            {/* Primary */}
            <a
              href="https://cal.com/kamsy-ejindu-qdidgy/15min"
              className="w-full sm:w-auto inline-flex items-center justify-center"
              style={{
                padding: "14px 32px",
                borderRadius: 100,
                background: "#fff",
                color: "#000",
                fontFamily: "'Syne', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                textDecoration: "none",
                transition: "opacity 0.2s",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Book a call
            </a>

            {/* Secondary */}
            <a
              href="mailto:halxdocs@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center"
              style={{
                padding: "13px 32px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'Syne', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                textDecoration: "none",
                backdropFilter: "blur(8px)",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              Email me
            </a>
          </motion.div>

          {/* Availability signal */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2"
            style={{ marginTop: 28 }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-full w-full bg-emerald-400" />
            </span>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.22)",
                fontWeight: 500,
              }}
            >
              Available for new projects
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}