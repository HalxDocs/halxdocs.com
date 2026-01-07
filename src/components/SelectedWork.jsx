import {
  motion,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, memo } from "react";

/* ---------------------------------------------
   Project Data — USE YOUR REAL IMAGES HERE
---------------------------------------------- */

const items = [
  {
    label: "Json Toolkit",
    title: "Jsonstack.dev",
    description: "Developer utilities for formatting, validating, and comparing JSON.",
    href: "https://jsonstack.dev",
    image: "/jsonstack.png",
  },
  {
    label: "Thinking Mirror",
    title: "Cortex",
    description: "An AI-powered reflection tool for structured thinking and clarity.",
    href: "https://corte-x.vercel.app",
    image: "/cortex.png",
  },
  {
    label: "Chrome Extension",
    title: "AI Dev Helper",
    description: "Inline AI assistance for developers directly inside the browser.",
    href: "https://github.com/HalxDocs/Aidevhelper",
    image: "/aidevhelper.png",
  },
  {
    label: "Email Utility",
    title: "Email Verifier",
    description: "Validate and clean email lists with fast server-side checks.",
    href: "https://github.com/HalxDocs/email-verifier",
    image: "/emailverifier.png",
  },
  {
    label: "Medical Platform",
    title: "Medcare",
    description: "A healthcare web platform for managing patients and appointments.",
    href: "https://med-iota-neon.vercel.app/",
    image: "/med.png",
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

  const x = useSpring(mouseX, { stiffness: 160, damping: 25 });
  const y = useSpring(mouseY, { stiffness: 160, damping: 25 });

  const handleMove = (e) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 160);
    mouseY.set(e.clientY - rect.top - 110);
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
        
        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/40 font-bold mb-3">
            {item.label}
          </p>

          <h3 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-3">
            {item.title}
          </h3>

          <p className="text-sm text-black/50 dark:text-white/50 max-w-md">
            {item.description}
          </p>

          {/* Mobile Inline Image */}
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
          <div className="
            w-12 h-12 md:w-16 md:h-16
            rounded-full
            border border-black/10 dark:border-white/20
            flex items-center justify-center
            rotate-[-45deg] group-hover:rotate-0
            group-hover:bg-black group-hover:text-white
            dark:group-hover:bg-white dark:group-hover:text-black
            transition-all duration-500
          ">
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
            scale: hovered ? 1 : 0.9,
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
              Portfolio
            </p>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic font-serif">
              Selected Work
            </h2>
          </div>
          <p className="hidden md:block max-w-[240px] text-sm text-black/40 dark:text-white/40 text-right">
            Products built with a focus on performance, clarity, and craft.
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <ProjectItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
