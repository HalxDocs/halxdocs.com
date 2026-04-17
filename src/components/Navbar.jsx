import { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Blog", href: "/blog" },
];

const NavLink = memo(({ link, onClick }) => (
  <a
    href={link.href}
    onClick={onClick}
    className="text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-200"
  >
    {link.name}
  </a>
));

NavLink.displayName = "NavLink";

const HamburgerIcon = () => (
  <div className="flex flex-col items-start gap-[5px]">
    <span className="block h-[1.5px] w-[22px] bg-current rounded-full transition-all duration-300" />
    <span className="block h-[1.5px] w-[13px] bg-current rounded-full transition-all duration-300" />
    <span className="block h-[1.5px] w-[18px] bg-current rounded-full transition-all duration-300" />
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleDark = useCallback(() => setDark((prev) => !prev), []);
  const toggleMenu = useCallback(() => setOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* ── Pill Navbar ── */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full px-4">
        <motion.nav
          initial={false}
          animate={{
            maxWidth: scrolled ? "700px" : "960px",
            backgroundColor: dark
              ? scrolled ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)"
              : scrolled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.04)",
          }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto flex items-center justify-between rounded-full px-6 py-2.5 backdrop-blur-2xl border border-white/10 dark:border-white/10 border-black/10 shadow-[0_4px_32px_rgba(0,0,0,0.08)]"
        >
          {/* Logo */}
          <a
            href="/"
            className="text-[17px] font-bold tracking-tight text-black dark:text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            HalxDocs
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.name} link={link} />
            ))}
            <div className="w-px h-4 bg-black/15 dark:bg-white/15" />
            <button
              onClick={toggleDark}
              className="p-1.5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="https://cal.com/kamsy-ejindu-qdidgy/15min"
              className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-[11px] uppercase tracking-widest font-bold hover:opacity-80 transition-opacity"
            >
              Book a call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={toggleMenu}
            aria-label="Open menu"
            className="md:hidden flex items-center justify-center px-3.5 py-2.5 rounded-full bg-black/5 dark:bg-white/[0.08] border border-black/10 dark:border-white/10 text-black dark:text-white"
          >
            <HamburgerIcon />
          </button>
        </motion.nav>
      </div>

      {/* ── Mobile Fullscreen Overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.77, 0, 0.18, 1] }}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ backgroundColor: dark ? "#0B0B0C" : "#f4f3ef" }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-7 py-6">
              <span
                className="text-[18px] font-bold tracking-tight"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: dark ? "#fff" : "#111",
                }}
              >
                HalxDocs
              </span>
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  border: `0.5px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)"}`,
                  color: dark ? "#fff" : "#111",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 flex flex-col justify-center px-7">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ x: -28, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="group flex items-center gap-4 py-5 border-b"
                  style={{ borderColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
                >
                  <span
                    className="font-mono text-[11px] tracking-widest min-w-[28px]"
                    style={{ color: dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)" }}
                  >
                    0{i + 1}
                  </span>

                  <span
                    className="text-[clamp(38px,10vw,56px)] font-extrabold uppercase tracking-tight leading-none transition-all duration-200 group-hover:tracking-wide"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: dark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.78)",
                    }}
                  >
                    {link.name}
                  </span>

                  <span
                    className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    style={{ color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)" }}
                  >
                    <ArrowRight size={20} strokeWidth={1.5} />
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.35 }}
              className="flex items-center px-7 py-6 border-t"
              style={{ borderColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
            >
              <button
                onClick={toggleDark}
                className="flex items-center gap-2.5 mr-5"
                style={{ color: dark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)" }}
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
                <span className="text-[11px] font-semibold uppercase tracking-widest">
                  {dark ? "Light Mode" : "Dark Mode"}
                </span>
              </button>

              <a
                href="https://cal.com/kamsy-ejindu-qdidgy/15min"
                onClick={closeMenu}
                className="flex-1 text-center py-4 rounded-[14px] text-[13px] font-bold uppercase tracking-widest transition-opacity hover:opacity-85"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  background: dark ? "#fff" : "#111",
                  color: dark ? "#0B0B0C" : "#fff",
                }}
              >
                Book a call
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}