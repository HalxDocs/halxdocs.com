import { motion } from "framer-motion";
import { useState } from "react";
import Beams from "./Beams";

export default function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:halxdocs@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden"
      style={{ background: "#0D0D0D", color: "#F0F0F0" }}
    >
      {/* Beams stays dark — it's a fixed dark scene */}
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

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(13,13,13,0.78) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: "30%", background: "linear-gradient(to top, #0D0D0D, transparent)" }} />
      <div className="absolute top-0 left-0 right-0" style={{ height: "20%", background: "linear-gradient(to bottom, var(--bg), transparent)" }} />

      <div className="relative z-10 px-6 sm:px-10 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <span style={{ width: 18, height: 1, background: "var(--accent)", display: "block" }} />
            <span
              className="font-mono"
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 500,
              }}
            >
              Get in touch
            </span>
            <span style={{ width: 18, height: 1, background: "var(--accent)", display: "block" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display"
            style={{
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#F0F0F0",
            }}
          >
            Got a project{" "}
            <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>in mind?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.22, duration: 0.6 }}
            style={{
              marginTop: 28,
              fontSize: "17px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 540,
              marginInline: "auto",
            }}
          >
            I'm currently available for new projects. Whether you need a backend built from scratch, a full
            product shipped, or an existing codebase rescued —{" "}
            <span style={{ color: "#F0F0F0" }}>DM me on X or drop a message below</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10"
          >
            <a
              href="https://x.com/HalxDocs"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              style={{
                padding: "14px 32px",
                borderRadius: 100,
                background: "var(--accent)",
                color: "#fff",
                fontFamily: "'Syne', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                textDecoration: "none",
                boxShadow: "var(--shadow-accent)",
              }}
            >
              DM me on X
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="#contact-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
              style={{
                padding: "13px 32px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.18)",
                color: "#F0F0F0",
                fontFamily: "'Syne', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                textDecoration: "none",
                backdropFilter: "blur(8px)",
              }}
            >
              Send a message
            </a>
          </motion.div>

          <motion.form
            id="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 max-w-xl mx-auto text-left"
            style={{
              background: "rgba(22,22,22,0.7)",
              backdropFilter: "blur(12px)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: 20,
              padding: "32px 28px",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Field label="Name" type="text" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            </div>
            <Field label="Message" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} required />

            <button
              type="submit"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              style={{
                padding: "14px",
                borderRadius: 100,
                background: "#F0F0F0",
                color: "#0D0D0D",
                fontFamily: "'Syne', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                border: "none",
                cursor: "pointer",
              }}
            >
              {sent ? "Email opened — finish in your client" : "Send message"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", textarea, value, onChange, required }) {
  const baseStyle = {
    width: "100%",
    background: "rgba(13,13,13,0.6)",
    border: "0.5px solid rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: "12px 14px",
    color: "#F0F0F0",
    fontSize: "14px",
    fontFamily: "'Syne', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };
  return (
    <label className="block">
      <span
        className="font-mono block mb-2"
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.55)",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
          style={{ ...baseStyle, resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
          style={baseStyle}
        />
      )}
    </label>
  );
}
