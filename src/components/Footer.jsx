import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white text-black dark:bg-black dark:text-white border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Left */}
          <div>
            <p className="text-lg font-semibold tracking-tight">
              HalxDocs
            </p>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
              © 2026 HalxDocs. All rights reserved.
            </p>
          </div>

          {/* Right – Socials */}
          <div className="flex items-center gap-6 text-black/60 dark:text-white/60">
            <a
              href="https://github.com/halxdocs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://instagram.com/halxdocs_"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/halx-docs-633272344"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="https://x.com/halxdocs"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
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
