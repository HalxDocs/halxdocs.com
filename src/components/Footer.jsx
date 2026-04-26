import { FaXTwitter, FaGithub, FaLinkedin, FaMedium, FaNpm } from "react-icons/fa6";

const links = [
  { icon: <FaXTwitter size={16} />, href: "https://x.com/HalxDocs", label: "X" },
  { icon: <FaGithub size={16} />, href: "https://github.com/HalxDocs", label: "GitHub" },
  { icon: <FaLinkedin size={16} />, href: "https://www.linkedin.com/in/halx-docs-633272344", label: "LinkedIn" },
  { icon: <FaMedium size={16} />, href: "https://medium.com/@halxdocs", label: "Medium" },
  { icon: <FaNpm size={18} />, href: "https://www.npmjs.com/~halxdocs", label: "npm" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        borderTop: "0.5px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          <div>
            <p
              className="font-display"
              style={{
                fontSize: "20px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text)",
              }}
            >
              HALXDOCS
            </p>
            <p
              className="font-mono mt-2"
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
              }}
            >
              © 2026 HalxDocs. Built with care.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {links.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center"
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

        </div>
      </div>
    </footer>
  );
}
