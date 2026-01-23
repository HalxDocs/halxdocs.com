import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { marqueeProjects } from "../data/marqueeProjects";
import { memo, useRef, useState } from "react";

/* -------------------- Project Card -------------------- */
const ProjectCard = memo(function ProjectCard({ src, index }) {
  return (
    <div
      className="
        shrink-0
        bg-white dark:bg-zinc-900
        /* Internal padding to show off the thick border */
        p-2.5 
        rounded-[1.5rem]
        
        border-[3px] md:border-[4px] 
        border-black/10 dark:border-white/20
        will-change-transform
      "
    >
      <div className="relative overflow-hidden rounded-[0.9rem] aspect-video w-[200px] sm:w-[280px] md:w-[320px]">
        <img
          src={src}
          alt={`Project ${index + 1}`}
          loading="lazy"
          style={{ transform: "translateZ(0)" }}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  );
});

/* -------------------- Marquee Section -------------------- */
export default function MarqueeProjects() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 25,
    restDelta: 0.001
  });

  const xOffset = useTransform(smoothScroll, [0, 1], [80, -80]);

  return (
    <section
      ref={containerRef}
      className="relative z-30 w-full overflow-hidden bg-transparent"
      style={{ marginTop: "-120px" }} 
    >
      <motion.div 
        style={{ x: xOffset }} 
        className="py-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex items-center">
          
          {/* Edge Blurs */}
          <div className="absolute inset-y-0 left-0 w-[12%] z-20  to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-[12%] z-20   to-transparent pointer-events-none" />

          <motion.div
            className="flex gap-5 md:gap-8 w-max px-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 70, // Even slower for a more premium, gallery feel
              ease: "linear",
              repeat: Infinity,
              paused: isHovered 
            }}
          >
            {[...marqueeProjects, ...marqueeProjects].map((src, i) => (
              <ProjectCard key={`project-${i}`} src={src} index={i} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}