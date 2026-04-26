import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for the target page to mount, then scroll to the section
      const id = hash.slice(1);
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      // Run twice — once immediately (same page), once after layout (route change)
      tryScroll();
      const t = setTimeout(tryScroll, 80);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
