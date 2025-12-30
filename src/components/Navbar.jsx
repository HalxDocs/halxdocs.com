import { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

// Memoize nav links to prevent recreating on every render
const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Blog", href: "/blog" },
];

// Memoize individual nav link component
const NavLink = memo(({ link, onClick }) => (
  <a
    href={link.href}
    target={link.href.startsWith("http") ? "_blank" : "_self"}
    rel="noreferrer"
    onClick={onClick}
    className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
  >
    {link.name}
  </a>
));

NavLink.displayName = "NavLink";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  // Memoize scroll handler to prevent recreating function
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled]);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Check initial theme state on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  // Apply theme changes to the document
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleDark = useCallback(() => {
    setDark(prev => !prev);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full px-4">
      <div>
        <motion.nav
          initial={false} // Disable initial animation for faster load
          animate={{
            maxWidth: scrolled ? "720px" : "1000px",
            backgroundColor: dark
              ? scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)"
              : scrolled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.08)",
          }}
          transition={{ duration: 0.3 }} // Faster transition
          className="
            pointer-events-auto
            mx-auto flex items-center justify-between
            rounded-full px-6 py-3
            backdrop-blur-2xl
            border border-black/10 dark:border-white/10
            transition-all duration-500
          "
        >
          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-semibold tracking-tight text-black dark:text-white"
          >
            HalxDocs
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <NavLink key={link.name} link={link} />
            ))}

            <div className="w-px h-4 bg-black/20 dark:bg-white/20" />

            <button
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-black/80 dark:text-white/80 transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="https://cal.com/kamsy-ejindu-qdidgy/15min"
              className="ml-2 px-5 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/30 text-xs uppercase tracking-wider text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
            >
              Book a call
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 border border-black/30 dark:border-white/30 text-xs uppercase tracking-widest text-black dark:text-white"
          >
            {open ? "Close" : "Menu"}
          </button>
        </motion.nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }} // Faster animation
              className="
                pointer-events-auto
                md:hidden
                absolute top-full left-0 right-0 mt-4 mx-auto max-w-[92%]
                rounded-3xl
                bg-white/70 dark:bg-black/70 backdrop-blur-2xl
                border border-black/10 dark:border-white/10
                p-6
                z-[60]
              "
            >
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    onClick={closeMenu}
                    className="text-lg text-black/90 dark:text-white/90"
                  >
                    {link.name}
                  </a>
                ))}

                <div className="h-px bg-black/10 dark:bg-white/10" />

                <button
                  onClick={toggleDark}
                  className="flex items-center justify-between text-black/80 dark:text-white/80"
                >
                  <span>{dark ? "Light mode" : "Dark mode"}</span>
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <a
                  href="https://cal.com/kamsy-ejindu-qdidgy/15min"
                  onClick={closeMenu}
                  className="mt-2 text-sm uppercase tracking-widest text-black/70 dark:text-white/70"
                >
                  Book a call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}