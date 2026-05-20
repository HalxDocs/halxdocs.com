import { motion } from "framer-motion";
import { useState } from "react";

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
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        paddingTop: 96,
        paddingBottom: 96,
      }}
    >
      <div
        className="mx-auto px-6 sm:px-10"
        style={{ maxWidth: 720 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--text-muted)",
              fontWeight: 500,
              fontFamily: "'Geist', sans-serif",
              marginBottom: 16,
            }}
          >
            Get in touch
          </p>

          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            Got a project{" "}
            <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
              in mind?
            </span>
          </h2>

          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "var(--text-muted)",
              marginBottom: 40,
              maxWidth: 520,
            }}
          >
            I'm currently available for new projects. Whether you need a backend built from scratch,
            a full product shipped, or an existing codebase rescued —{" "}
            <span style={{ color: "var(--text)", fontWeight: 500 }}>DM me on X or fill out the form below</span>.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
            <a
              href="https://x.com/HalxDocs"
              target="_blank"
              rel="noreferrer"
              style={{
                padding: "10px 24px",
                borderRadius: 100,
                background: "var(--text)",
                color: "var(--bg)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
                transition: "opacity 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              DM me on X
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="mailto:halxdocs@gmail.com"
              style={{
                padding: "10px 24px",
                borderRadius: 100,
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
                transition: "color 0.2s, border-color 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
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
              Send an email
            </a>
          </div>
        </motion.div>

        <motion.form
          id="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 40,
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Name" type="text" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
          </div>
          <Field label="Message" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} required />

          <button
            type="submit"
            style={{
              marginTop: 16,
              width: "100%",
              padding: "14px",
              borderRadius: 100,
              background: "var(--text)",
              color: "var(--bg)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {sent ? "Email opened — finish in your client" : "Send message"}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, type = "text", textarea, value, onChange, required }) {
  const baseStyle = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "11px 14px",
    color: "var(--text)",
    fontSize: 14,
    fontFamily: "'Geist', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--text-muted)",
          fontWeight: 600,
          fontFamily: "'Geist', sans-serif",
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
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          style={{ ...baseStyle, resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          style={baseStyle}
        />
      )}
    </label>
  );
}
