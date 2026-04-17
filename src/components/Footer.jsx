import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-foreground)",
        borderColor: "color-mix(in srgb, var(--color-foreground) 10%, transparent)",
        fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Left */}
          <div>
            <p className="text-lg font-semibold tracking-tight">
              HalxDocs
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: "color-mix(in srgb, var(--color-foreground) 55%, transparent)" }}
            >
              © 2026 HalxDocs. All rights reserved.
            </p>
          </div>

          {/* Right – Socials */}
          <div
            className="flex items-center gap-6"
            style={{ color: "color-mix(in srgb, var(--color-foreground) 55%, transparent)" }}
          >
            <a
              href="https://github.com/halxdocs"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
              style={{ "--hover-color": "var(--color-foreground)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--color-foreground)")}
              onMouseLeave={e => (e.currentTarget.style.color = "")}
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://instagram.com/halxdocs_"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = "var(--color-foreground)")}
              onMouseLeave={e => (e.currentTarget.style.color = "")}
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/halx-docs-633272344"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = "var(--color-foreground)")}
              onMouseLeave={e => (e.currentTarget.style.color = "")}
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="https://x.com/halxdocs"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = "var(--color-foreground)")}
              onMouseLeave={e => (e.currentTarget.style.color = "")}
              aria-label="X"
            >
              <FaXTwitter size={20} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
