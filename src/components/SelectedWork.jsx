import {
  motion,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, memo, useRef } from "react";

/* ---------------------------------------------
   Project Data (problem-focused)
---------------------------------------------- */

const items = [
  {
    label: "Developer Tool",
    title: "Jsonstack.dev",
    description:
      "A toolkit that helps developers validate, format, and compare JSON faster—reducing errors and saving debugging time.",
    href: "https://jsonstack.dev",
    image: "/jsonstack.png",
  },
  {
    label: "Business Website",
    title: "SavBites",
    description:
      "A conversion-focused restaurant website designed to showcase menus, ambience, and drive customer engagement.",
    href: "https://sav-six.vercel.app",
    image: "/savbites.png",
  },
  {
    label: "AI Utility",
    title: "Cortex",
    description:
      "An AI-powered reflection tool built to help users organize thoughts, improve clarity, and make better decisions.",
    href: "https://corte-x.vercel.app",
    image: "/cortex.png",
  },
  {
    label: "Healthcare Platform",
    title: "Medcare",
    description:
      "A medical web platform for managing patients, appointments, and healthcare workflows efficiently.",
    href: "https://med-iota-neon.vercel.app/",
    image: "/med.png",
  },
  {
    label: "Browser Extension",
    title: "AI Dev Helper",
    description:
      "A Chrome extension that provides inline AI assistance to developers without leaving the browser.",
    href: "https://github.com/HalxDocs/Aidevhelper",
    image: "/aidevhelper.png",
  },
  {
    label: "CLI Tool",
    title: "Zryl",
    description:
      "A CLI tool that records terminal activity—commands, timestamps, OS—and generates a shareable session link.",
    href: "https://zryl.vercel.app",
    image: "/zryl.png",
  },
];

/* ---------------------------------------------
   Project Item
---------------------------------------------- */

const ProjectItem = memo(({ item, index }) => {
  const [hovered, setHovered] = useState(false);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 140, damping: 22 });
  const y = useSpring(mouseY, { stiffness: 140, damping: 22 });

  const handleMove = (e) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 160);
    mouseY.set(e.clientY - rect.top - 120);
  };

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="
        group relative block
        border-b border-black/10 dark:border-white/10
        py-10 md:py-16
      "
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* LEFT */}
        <div className="relative z-10 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/40 font-bold mb-3">
            {item.label}
          </p>

          <h3 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-3">
            {item.title}
          </h3>

          <p className="text-sm text-black/55 dark:text-white/55 max-w-md leading-relaxed">
            {item.description}
          </p>

          {/* Mobile Image */}
          <div className="md:hidden mt-6 aspect-[16/10] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 relative">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* RIGHT CTA */}
        <div className="relative z-10 flex items-center gap-4">
          <span className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity text-sm">
            View Project
          </span>
          <div
            className="
              w-12 h-12 md:w-16 md:h-16
              rounded-full
              border border-black/10 dark:border-white/20
              flex items-center justify-center
              rotate-[-45deg] group-hover:rotate-0
              group-hover:bg-black group-hover:text-white
              dark:group-hover:bg-white dark:group-hover:text-black
              transition-all duration-500
            "
          >
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>

      {/* Desktop Hover Preview */}
      {!isTouch && (
        <motion.div
          style={{
            x,
            y,
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.95,
          }}
          className="
            hidden md:block
            absolute top-0 left-0
            w-[320px] h-[210px]
            rounded-2xl overflow-hidden
            shadow-2xl
            pointer-events-none
          "
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />
        </motion.div>
      )}
    </motion.a>
  );
});

/* ---------------------------------------------
   Section
---------------------------------------------- */

export default function SelectedWork() {
  const ref = useRef(null);

  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 120, damping: 18 });
  const y = useSpring(my, { stiffness: 120, damping: 18 });

  const handleMagneticMove = (e) => {
    if (isTouch || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };

  const resetMagnet = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="work"
      className="bg-white dark:bg-black text-black dark:text-white py-28 md:py-44"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] opacity-50 mb-6">
              Selected Work
            </p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic font-serif">
              Real Products.<br />Real Problems Solved.
            </h2>
          </div>
          <p className="hidden md:block max-w-[260px] text-sm text-black/40 dark:text-white/40 text-right">
            A collection of tools, platforms, and systems built for real-world use.
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <ProjectItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-24 flex justify-center"
        >
          <motion.a
            ref={ref}
            href="https://github.com/HalxDocs"
            target="_blank"
            rel="noreferrer"
            onMouseMove={handleMagneticMove}
            onMouseLeave={resetMagnet}
            style={{ x, y }}
            className="
              group
              inline-flex items-center gap-3
              text-sm md:text-base
              font-medium
              text-black/60 dark:text-white/60
              hover:text-black dark:hover:text-white
              transition-colors
            "
          >
            <span className="relative">
              Explore more projects on GitHub
              <span className="
                absolute left-0 -bottom-1
                w-0 h-px
                bg-black dark:bg-white
                group-hover:w-full
                transition-all duration-300
              " />
            </span>
            <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}