import { useEffect, useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Blog", href: "/blog" },
];

const NavLink = memo(({ link, onClick }) => (
  <a
    href={link.href}
    onClick={onClick}
    className="text-sm font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
  >
    {link.name}
  </a>
));

NavLink.displayName = "NavLink";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleDark = useCallback(() => setDark(prev => !prev), []);
  const toggleMenu = useCallback(() => setOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full px-4">
        <motion.nav
          initial={false}
          animate={{
            maxWidth: scrolled ? "720px" : "1000px",
            backgroundColor: dark
              ? scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)"
              : scrolled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.08)",
          }}
          className="mx-auto flex items-center justify-between rounded-full px-6 py-3 backdrop-blur-2xl border border-black/10 dark:border-white/10 transition-all duration-500 shadow-lg"
        >
          <a href="/" className="text-2xl font-semibold tracking-tight text-black dark:text-white">
            HalxDocs
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <NavLink key={link.name} link={link} />
            ))}
            <div className="w-px h-4 bg-black/20 dark:bg-white/20" />
            <button onClick={toggleDark} className="p-2 text-black/80 dark:text-white/80 transition-colors">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a 
              href="https://cal.com/kamsy-ejindu-qdidgy/15min" 
              className="px-5 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs uppercase tracking-wider font-semibold hover:opacity-80 transition-opacity"
            >
              Book a call
            </a>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-xs uppercase font-bold text-black dark:text-white"
          >
            <span>Menu</span>
            <Menu size={16} />
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#0B0B0C] flex flex-col"
          >
            {/* Header */}
            <div className="w-full px-8 py-10 flex items-center justify-between">
              <span className="text-2xl font-semibold dark:text-white">HalxDocs</span>
              <button onClick={closeMenu} className="p-2 dark:text-white transition-colors">
                <X size={32} />
              </button>
            </div>

            {/* Main Navigation List */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-16">
              <div className="flex flex-col mb-12">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="group flex items-baseline gap-4 py-6 border-b border-black/5 dark:border-white/5"
                    >
                      <span className="text-sm font-mono text-black/40 dark:text-white/30">0{i + 1}</span>
                      <span className="text-5xl sm:text-7xl font-bold uppercase tracking-tighter text-black dark:text-white group-hover:pl-4 transition-all duration-300">
                        {link.name}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Book a Call Button - Styled as a primary block */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="https://cal.com/kamsy-ejindu-qdidgy/15min"
                  onClick={closeMenu}
                  className="inline-block w-full sm:w-auto text-center px-10 py-6 bg-black dark:bg-white text-white dark:text-black text-xl sm:text-2xl font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Book a call
                </a>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-8 pb-12 border-t border-black/5 dark:border-white/5">
              <button 
                onClick={toggleDark}
                className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest dark:text-white"
              >
                {dark ? <Sun size={20} /> : <Moon size={20} />}
                <span>{dark ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}