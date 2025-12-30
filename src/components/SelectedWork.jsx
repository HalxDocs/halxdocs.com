import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, memo } from "react";

const items = [
  {
    label: "JsonToolkit",
    title: "Jsonstack.dev",
    href: "https://jsonstack.dev",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
  },
  {
    label: "Chrome extension",
    title: "Ai Dev Helper",
    href: "https://github.com/HalxDocs/Aidevhelper",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    label: "Email utility",
    title: "Email Verifier",
    href: "https://github.com/HalxDocs/email-verifier",
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800",
  },
  {
    label: "Medical web app",
    title: "Medcare",
    href: "https://med-iota-neon.vercel.app/",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
  },
];

const ProjectItem = memo(({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position tracking for the image follow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - 150); // Offset to center image
    mouseY.set(e.clientY - rect.top - 100);
  };

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative block border-b border-black/10 dark:border-white/10 py-10 md:py-16 overflow-visible"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Project Info */}
        <div className="relative z-10 pointer-events-none">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-bold mb-2">
            {item.label}
          </p>
          <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter transition-all duration-500 group-hover:pl-4">
            {item.title}
          </h3>
        </div>

        {/* Arrow - Always visible on mobile, reveals on desktop hover */}
        <div className="flex items-center gap-4 relative z-10">
          <span className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
            View Project
          </span>
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-500 rotate-[-45deg] group-hover:rotate-0">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>

      {/* Floating Image Preview (Desktop Only) */}
      <motion.div
        style={{
          x,
          y,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
          pointerEvents: "none",
        }}
        className="hidden md:block absolute top-0 left-0 w-[300px] h-[200px] z-0 rounded-2xl overflow-hidden shadow-2xl transition-opacity duration-300"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
        />
      </motion.div>
    </motion.a>
  );
});

export default function SelectedWork() {
  return (
    <section id="work" className="bg-white dark:bg-black text-black dark:text-white py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-xs uppercase tracking-[0.3em] text-black/50 dark:text-white/50 font-bold mb-6"
            >
              Portfolio
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black tracking-tighter italic font-serif"
            >
              Selected Work
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:block text-right text-black/40 dark:text-white/40 text-sm max-w-[200px]"
          >
            Digital experiences that combine performance with aesthetics.
          </motion.div>
        </div>

        {/* List of Projects */}
        <div className="flex flex-col">
          {items.map((item, i) => (
            <ProjectItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-20 flex justify-center">
          <motion.a
            href="https://github.com/halxdocs"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            className="group relative py-4 px-10 rounded-full border border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-colors overflow-hidden"
          >
            <span className="relative z-10 text-xs uppercase tracking-widest font-bold flex items-center gap-3">
              Archives / Github
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-black dark:bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 pointer-none" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}