import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { memo } from "react";

/* -------------------- Animation Variants -------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const rowVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    clipPath: "inset(100% 0% 0% 0%)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* -------------------- Service Row -------------------- */

const ServiceRow = memo(({ left, right, video }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const edgeX = useSpring(mouseX, springConfig);
  const edgeY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(edgeY, [-50, 50], [10, -10]);
  const rotateY = useTransform(edgeX, [-50, 50], [-10, 10]);

  const handleMouseMove = (e) => {
    // Disable magnetic effect on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      variants={rowVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group relative
        flex flex-col sm:flex-row
        items-center justify-center
        gap-6 sm:gap-12
        py-10
        border-b border-black/5 dark:border-white/5
        last:border-0
      "
    >
      {/* Left Text */}
      <motion.h3
        style={{ x: useTransform(edgeX, (v) => v * -0.1) }}
        className="
          text-[clamp(2rem,12vw,5rem)]
          sm:text-[clamp(2rem,7vw,5rem)]
          font-bold tracking-tighter
          text-black/30 dark:text-white/20
          group-hover:text-black dark:group-hover:text-white
          transition-colors duration-500
          italic sm:not-italic
          text-center sm:text-left
        "
      >
        {left}
      </motion.h3>

      {/* Media */}
      <motion.div
        style={{
          x: edgeX,
          y: edgeY,
          rotateX,
          rotateY,
          perspective: 1000,
        }}
        className="
          relative z-10
          w-[110px] h-[80px]
          sm:w-[160px] sm:h-[110px]
          shrink-0
          rounded-full overflow-hidden
          border-2 border-black dark:border-white
          shadow-2xl
          transition-all duration-300
          group-hover:scale-110
        "
      >
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="
            w-full h-full object-cover
            grayscale-[100%]
            group-hover:grayscale-0
            scale-110
            transition-all duration-700
          "
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      {/* Right Text */}
      <motion.h3
        style={{ x: useTransform(edgeX, (v) => v * 0.1) }}
        className="
          text-[clamp(2rem,12vw,5rem)]
          sm:text-[clamp(2rem,7vw,5rem)]
          font-bold tracking-tighter
          text-black/30 dark:text-white/20
          group-hover:text-black dark:group-hover:text-white
          transition-colors duration-500
          text-center sm:text-right
        "
      >
        {right}
      </motion.h3>
    </motion.div>
  );
});

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
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-[40vw] h-[40vw] rounded-full bg-blue-400/10 blur-[120px] dark:bg-blue-600/5"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[40vw] h-[40vw] rounded-full bg-purple-400/10 blur-[120px] dark:bg-purple-600/5"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 flex flex-col items-center text-center"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-50">
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
          viewport={{ once: true, margin: "-100px" }}
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