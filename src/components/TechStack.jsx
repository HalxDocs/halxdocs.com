import { motion } from "framer-motion";

const stack = [
  { label: "Backend", items: ["NestJS", "Node.js", "TypeScript", "Go", "Express"] },
  { label: "Frontend", items: ["React", "Remix", "Next.js", "Vite", "Tailwind CSS"] },
  { label: "Databases", items: ["MongoDB", "PostgreSQL", "Firebase Firestore"] },
  { label: "Infrastructure", items: ["Render", "Vercel", "AWS", "Docker"] },
  { label: "Tools", items: ["Git", "Postman", "Cloudinary", "Stripe"] },
];

export default function TechStack() {
  return (
    <section
      id="stack"
      className="relative py-28 sm:py-36"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 max-w-2xl"
        >
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
              Tech Stack
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
            Tools I reach for.{" "}
            <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
              No skill bars. No fluff.
            </span>
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{
            background: "var(--border)",
            border: "0.5px solid var(--border)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {stack.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "var(--bg)",
                padding: "32px 28px",
                minHeight: 200,
              }}
            >
              <p
                className="font-mono mb-5"
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--accent)",
                  fontWeight: 600,
                }}
              >
                {group.label}
              </p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-display"
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: "var(--text)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
