import { motion } from "framer-motion";
import { FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";
import { memo } from "react";

/* -------------------- Draggable Image -------------------- */

const DraggableImage = ({ src, rotation, initialX, initialY, label, zIndex }) => {
  return (
    <motion.div
      drag
      dragElastic={0.12}
      initial={{ opacity: 0, rotate: rotation, x: initialX, y: 20 }}
      whileInView={{ opacity: 1, y: initialY }}
      whileTap={{ scale: 0.95, zIndex: 50 }}
      viewport={{ once: true }}
      className="absolute cursor-grab active:cursor-grabbing rounded-3xl p-2 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden group"
      style={{ zIndex }}
    >
      <div className="relative overflow-hidden rounded-2xl w-[180px] h-[240px] sm:w-[220px] sm:h-[300px]">
        <img
          src={src}
          alt="HalxDocs"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        {label && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 text-[10px] uppercase tracking-widest font-semibold">
            {label}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* -------------------- About Section -------------------- */

export default function About() {
  return (
    <section className="relative bg-white text-black dark:bg-black dark:text-white py-24 sm:py-40 overflow-hidden">
      
      {/* Subtle Background Wordmark */}
      <div className="absolute top-24 left-8 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
        <h2 className="text-[14vw] font-black uppercase tracking-tighter">
          HalxDocs
        </h2>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left: Content */}
        <div className="lg:col-span-7 relative z-10">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-black/20 dark:bg-white/20" />
            <span className="text-xs uppercase tracking-widest font-semibold opacity-60">
              About
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight mb-10"
          >
            Building digital products
            <br />
            <span className="italic font-serif text-black/40 dark:text-white/30">
              with clarity and intent.
            </span>
          </motion.h2>

          {/* Body */}
          <div className="space-y-8 text-base sm:text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-2xl">
            <motion.p>
              I’m a full-stack product engineer focused on building high-impact
              websites, systems, and tools for founders and product teams.
              My work bridges engineering, design, and business outcomes.
            </motion.p>

            <motion.p>
              I don’t just ship interfaces — I design systems that convert,
              scale reliably, and solve real operational problems.
              Every decision is guided by performance, usability, and clarity.
            </motion.p>

            <motion.p>
              Alongside client work, I build my own products, tools, and
              developer utilities — exploring how modern systems are designed,
              shipped, and maintained in production.
            </motion.p>

            {/* Meta Grid */}
            <div className="pt-10 border-t border-black/5 dark:border-white/5 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-60">
                  Focus
                </h4>
                <p>Founders · SaaS · Scalable Systems</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-2 opacity-60">
                  Outside Work
                </h4>
                <p>Chess · Open Source · Writing</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="mt-12 flex gap-8">
            {[
              { icon: <FiTwitter />, href: "https://x.com/halxdocs", label: "X" },
              {
                icon: <FiLinkedin />,
                href: "https://www.linkedin.com/in/halx-docs-633272344",
                label: "LinkedIn",
              },
              {
                icon: <FiGithub />,
                href: "https://github.com/HalxDocs",
                label: "GitHub",
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
              >
                {social.icon}
                <span>{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: Images */}
        <div className="lg:col-span-5 relative h-[420px] sm:h-[480px] mt-20 lg:mt-0 flex items-center justify-center">
          <DraggableImage
            src="/halxdocspic.jpeg"
            rotation={-8}
            initialX={-40}
            initialY={0}
            zIndex={10}
          />
          <DraggableImage
            src="/halx2.jpeg"
            rotation={6}
            initialX={40}
            initialY={40}
            label="Founder"
            zIndex={20}
          />

          {/* Floating Accent */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 right-4 bg-zinc-100 dark:bg-zinc-800 p-5 rounded-full shadow-xl border border-black/5"
          >
            <span className="text-3xl">♞</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}