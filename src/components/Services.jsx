import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { memo, useCallback } from "react";

/* -------------------- Animation Variants -------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    clipPath: "inset(100% 0% 0% 0%)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* -------------------- Service Row -------------------- */

const ServiceRow = memo(({ left, right, video }) => {
  // Detect touch devices (mobile performance)
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { damping: 30, stiffness: 180 };
  const xSpring = useSpring(mouseX, spring);
  const ySpring = useSpring(mouseY, spring);

  const rotateX = useTransform(ySpring, [-40, 40], [8, -8]);
  const rotateY = useTransform(xSpring, [-40, 40], [-8, 8]);

  const handleMouseMove = useCallback(
    (e) => {
      if (isTouch) return;

      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    },
    [isTouch, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      variants={rowVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group relative
        flex flex-row items-center justify-between
        gap-3 sm:gap-12
        py-8 sm:py-10
        border-b border-black/5 dark:border-white/5
        last:border-0
        overflow-hidden
      "
    >
      {/* Left Text */}
      <motion.h3
        style={{ x: useTransform(xSpring, (v) => v * -0.08) }}
        className="
          flex-1
          text-[clamp(1.4rem,6vw,5rem)]
          sm:text-[clamp(2rem,7vw,5rem)]
          font-bold tracking-tighter
          text-black/30 dark:text-white/20
          group-hover:text-black dark:group-hover:text-white
          transition-colors duration-300
          italic sm:not-italic
          text-left
          whitespace-nowrap
        "
      >
        {left}
      </motion.h3>

      {/* Media */}
      <motion.div
        style={
          isTouch
            ? undefined
            : {
                x: xSpring,
                y: ySpring,
                rotateX,
                rotateY,
                perspective: 900,
              }
        }
        className="
          relative z-10
          w-[70px] h-[50px]
          sm:w-[160px] sm:h-[110px]
          shrink-0
          rounded-full overflow-hidden
          border border-black dark:border-white
          shadow-xl
          will-change-transform
        "
      >
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="
            w-full h-full object-cover
            grayscale
            group-hover:grayscale-0
            transition-all duration-500
          "
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      {/* Right Text */}
      <motion.h3
        style={{ x: useTransform(xSpring, (v) => v * 0.08) }}
        className="
          flex-1
          text-[clamp(1.4rem,6vw,5rem)]
          sm:text-[clamp(2rem,7vw,5rem)]
          font-bold tracking-tighter
          text-black/30 dark:text-white/20
          group-hover:text-black dark:group-hover:text-white
          transition-colors duration-300
          text-right
          whitespace-nowrap
        "
      >
        {right}
      </motion.h3>
    </motion.div>
  );
});

ServiceRow.displayName = "ServiceRow";

/* -------------------- Services Section -------------------- */

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-white dark:bg-black py-32 sm:py-48 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-24 w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[120px] dark:bg-blue-600/5"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-24 w-[40vw] h-[40vw] rounded-full bg-purple-400/10 blur-[120px] dark:bg-purple-600/5"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 text-center"
        >
          <span className="block text-xs font-bold tracking-[0.3em] uppercase opacity-50 mb-4">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Crafting digital{" "}
            <span className="font-serif italic">excellence</span>.
          </h2>
        </motion.div>

        {/* Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col"
        >
          <ServiceRow left="Web" right="Development" video="/web_develop.mp4" />
          <ServiceRow
            left="Interface"
            right="Design"
            video="/interface_design.mp4"
          />
          <ServiceRow
            left="Backend"
            right="Architecture"
            video="/3d_web_experiences.mp4"
          />
          <ServiceRow
            left="Mobile"
            right="Applications"
            video="/solid_engineering.mp4"
          />
          <ServiceRow left="Motion" right="Graphics" video="/web_develop.mp4" />
        </motion.div>
      </div>
    </section>
  );
}
