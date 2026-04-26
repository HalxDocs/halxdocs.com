import { motion } from "framer-motion";
import { FaXTwitter, FaGithub, FaLinkedin, FaMedium, FaNpm } from "react-icons/fa6";

const socialLinks = [
  { icon: <FaXTwitter size={16} />, href: "https://x.com/HalxDocs", label: "X" },
  { icon: <FaGithub size={16} />, href: "https://github.com/HalxDocs", label: "GitHub" },
  { icon: <FaLinkedin size={16} />, href: "https://www.linkedin.com/in/halx-docs-633272344", label: "LinkedIn" },
  { icon: <FaMedium size={16} />, href: "https://medium.com/@halxdocs", label: "Medium" },
  { icon: <FaNpm size={18} />, href: "https://www.npmjs.com/~halxdocs", label: "npm" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-36"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14"
        >
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
            About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "4/5",
                borderRadius: "20px",
                border: "0.5px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <img
                src="/halx3.jpeg"
                alt="HalxDocs — Full-Stack Software Engineer"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full font-mono"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  background: "rgba(13,13,13,0.85)",
                  border: "0.5px solid rgba(255,255,255,0.18)",
                  color: "#F0F0F0",
                  backdropFilter: "blur(8px)",
                }}
              >
                Based in Nigeria
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <h2
              className="font-display mb-10"
              style={{
                fontSize: "clamp(32px, 4.5vw, 52px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "var(--text)",
                maxWidth: 620,
              }}
            >
              I'm HalxDocs.{" "}
              <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
                A full-stack engineer who ships.
              </span>
            </h2>

            <div className="space-y-5" style={{ maxWidth: 580 }}>
              <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--text-muted)" }}>
                I'm a full-stack engineer based in Nigeria. I've been building software products for a few years now, and the thing I enjoy most is taking something from an idea to a working product people actually use.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--text-muted)" }}>
                I specialize in backend systems and APIs — <span style={{ color: "var(--text)" }}>NestJS, Node, Express, Go, TypeScript, MongoDB</span> — but I work across the stack. I've built fintech backends, e-commerce platforms, developer tools, and consumer apps. I care about getting things into production, not just making them work in dev.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--text)", fontWeight: 500 }}>
                I work best with founders and small teams who have a clear problem and need someone to own the engineering side. If that sounds like you, let's talk.
              </p>
            </div>

            <div style={{ height: "0.5px", background: "var(--border)", margin: "44px 0 28px" }} />

            <div className="flex items-center flex-wrap gap-3">
              <span
                className="font-mono mr-2"
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                Connect
              </span>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center transition-all hover:scale-105"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    color: "var(--text-muted)",
                    transition: "color 0.2s, background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--surface)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
