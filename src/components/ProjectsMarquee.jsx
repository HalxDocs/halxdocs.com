import { motion, useScroll, useTransform } from "framer-motion";
import { marqueeProjects } from "../data/marqueeProjects";
import { memo, useState, useEffect, useRef } from "react";

/* -------------------- Utils -------------------- */

const isTouch =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none)").matches;

/* -------------------- Project Card -------------------- */

const ProjectCard = memo(function ProjectCard({ src, index }) {
  return (
    <motion.div
      className="
        shrink-0
        bg-white/80 dark:bg-zinc-900/80
        backdrop-blur-md
        p-2 md:p-3
        rounded-2xl
        border border-black/5 dark:border-white/10
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
        will-change-transform
      "
      whileHover={
        isTouch
          ? undefined
          : {
              y: -10,
              rotate: index % 2 === 0 ? 1 : -1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 14,
              },
            }
      }
    >
      <div className="relative overflow-hidden rounded-xl aspect-video w-[220px] sm:w-[300px] md:w-[380px] lg:w-[420px]">
        <img
          src={src}
          alt={`Project ${index + 1}`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            hover:scale-110
          "
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
});

/* -------------------- Marquee -------------------- */

export default function MarqueeProjects() {
  const containerRef = useRef(null);
  const [duration, setDuration] = useState(60);

  /* Scroll-based depth drift */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* Reduce parallax strength on mobile */
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isTouch ? -30 : -60]
  );

  useEffect(() => {
    const updateDuration = () => {
      const w = window.innerWidth;
      if (w < 640) setDuration(24);
      else if (w < 1024) setDuration(36);
      else setDuration(50);
    };

    updateDuration();
    window.addEventListener("resize", updateDuration);
    return () => window.removeEventListener("resize", updateDuration);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full overflow-hidden py-12 md:py-24 bg-transparent"
    >
      <div style={{ perspective: "1200px" }} className="w-full">
        <motion.div
          initial={{ rotateX: 0 }}
          whileInView={{ rotateX: 14 }}
          viewport={{ once: false, margin: "-100px" }}
          className="relative w-full overflow-hidden"
        >
          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-1/4 z-10 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/4 z-10 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />

          {/* Scroll depth layer */}
          <motion.div
            style={{ y: yParallax, willChange: "transform" }}
            className="relative"
          >
            {/* Auto marquee */}
            <motion.div
              className="flex gap-4 md:gap-8 w-max px-4 pt-4 pb-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ willChange: "transform" }}
            >
              {[...marqueeProjects, ...marqueeProjects].map((src, i) => (
                <ProjectCard key={`project-${i}`} src={src} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto w-3/4 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
    </section>
  );
}
