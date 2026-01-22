import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { memo, useRef } from "react";

/* -------------------- Animations -------------------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* -------------------- Service Row -------------------- */

const ServiceRow = memo(function ServiceRow({
  left,
  right,
  video,
  index,
}) {
  const rowRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { stiffness: 140, damping: 20 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

  const rotateX = useTransform(y, [-40, 40], [8, -8]);
  const rotateY = useTransform(x, [-40, 40], [-8, 8]);

  const onMove = (e) => {
    const r = rowRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (r.left + r.width / 2));
    mouseY.set(e.clientY - (r.top + r.height / 2));
  };

  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={rowRef}
      variants={rowVariants}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="
        group relative
        flex flex-col lg:flex-row
        items-center
        justify-between
        gap-10 lg:gap-16
        py-14 sm:py-20
        border-b border-black/10 dark:border-white/10
        last:border-none
      "
    >
      {/* Left */}
      <h3
        className="
          text-center lg:text-left
          text-[11vw] sm:text-[4.5vw]
          font-extrabold uppercase tracking-tight
          text-black/25 dark:text-white/15
          group-hover:text-black dark:group-hover:text-white
          transition-colors duration-500
        "
      >
        {left}
      </h3>

      {/* Media */}
      <motion.div
        style={{ x, y, rotateX, rotateY }}
        className="
          relative z-10
          w-[240px] h-[140px]
          sm:w-[300px] sm:h-[180px]
          rounded-2xl overflow-hidden
          border border-black/20 dark:border-white/20
          shadow-xl
          shrink-0
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
            grayscale group-hover:grayscale-0
            scale-110 group-hover:scale-100
            transition-all duration-700
          "
        />
        <span className="
          absolute top-3 left-3
          text-xs font-mono
          text-white mix-blend-difference
        ">
          0{index + 1}
        </span>
      </motion.div>

      {/* Right */}
      <h3
        className="
          text-center lg:text-right
          text-[11vw] sm:text-[4.5vw]
          font-extrabold uppercase tracking-tight
          text-black/25 dark:text-white/15
          group-hover:text-black dark:group-hover:text-white
          transition-colors duration-500
        "
      >
        {right}
      </h3>
    </motion.div>
  );
});

/* -------------------- Services Section -------------------- */

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-white dark:bg-black py-24 sm:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 sm:mb-32"
        >
          <span className="block mb-4 text-xs tracking-[0.4em] uppercase opacity-60">
            Services
          </span>

          <h2 className="text-4xl sm:text-6xl font-medium tracking-tight">
            Services I Offer
          </h2>
        </motion.header>

        {/* Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <ServiceRow
            index={0}
            left="Web"
            right="Platforms"
            video="/web_develop.mp4"
          />

          <ServiceRow
            index={1}
            left="Mobile"
            right="Apps"
            video="/solid_engineering.mp4"
          />

          <ServiceRow
            index={2}
            left="Product"
            right="Engineering"
            video="/3d_web_experiences.mp4"
          />

          <ServiceRow
            index={3}
            left="Backend"
            right="Systems"
            video="/interface_design.mp4"
          />

          <ServiceRow
            index={4}
            left="Growth"
            right="Optimization"
            video="/web_develop.mp4"
          />
        </motion.div>

      </div>
    </section>
  );
}