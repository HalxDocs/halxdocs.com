import { motion, useMotionValue, useTransform } from "framer-motion";
import { FiTwitter, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import { memo } from "react";

// Individual Draggable Image Component
const DraggableImage = ({ src, rotation, initialX, initialY, label, zIndex }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      initial={{ opacity: 0, rotate: rotation, x: initialX, y: 20 }}
      whileInView={{ opacity: 1, y: initialY }}
      whileTap={{ scale: 0.95, zIndex: 50 }}
      viewport={{ once: true }}
      className={`absolute cursor-grab active:cursor-grabbing rounded-3xl p-2 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden group`}
      style={{ zIndex }}
    >
      <div className="relative overflow-hidden rounded-2xl w-[200px] h-[260px] sm:w-[240px] sm:h-[320px]">
        <img src={src} alt="HalxDocs" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
        {label && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 text-[10px] uppercase tracking-tighter font-bold">
            {label}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function About() {
  return (
    <section className="relative bg-white text-black dark:bg-black dark:text-white py-24 sm:py-48 overflow-hidden">
      
      {/* Background Decorative Text */}
      <div className="absolute top-20 left-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
        <h2 className="text-[15vw] font-black leading-none uppercase tracking-tighter">HalxDocs</h2>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-black/20 dark:bg-white/20" />
            <span className="text-xs uppercase tracking-widest font-bold opacity-50">About the Engineer</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-12"
          >
            Building products <br />
            <span className="text-black/40 dark:text-white/30 italic font-serif">with intent.</span>
          </motion.h2>

          <div className="space-y-8 text-lg sm:text-xl text-black/70 dark:text-white/70 leading-relaxed max-w-2xl">
            <motion.p 
               initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}
            >
              I'm a software engineer who builds conversion-focused websites and
              applications. I work with startups and small businesses to turn ideas
              into digital experiences that drive growth and revenue.
            </motion.p>

            <motion.p 
               initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}
            >
              My approach is simple: focus on results. I care about how products perform 
              in the real world — how people interact with them, trust them, and come 
              back to them.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}
               className="pt-8 border-t border-black/5 dark:border-white/5 grid grid-cols-2 gap-8"
            >
                <div>
                    <h4 className="text-sm font-bold uppercase mb-2">Focus</h4>
                    <p className="text-base">SaaS, Founders, Performance</p>
                </div>
                <div>
                    <h4 className="text-sm font-bold uppercase mb-2">Hobbies</h4>
                    <p className="text-base">Chess, Open Source, Writing</p>
                </div>
            </motion.div>
          </div>

          {/* Social Icons */}
          <div className="mt-12 flex gap-8">
            {[
              { icon: <FiTwitter />, href: "https://x.com/halxdocs", label: "X" },
              { icon: <FiLinkedin />, href: "...", label: "In" },
              { icon: <FiGithub />, href: "...", label: "Git" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ y: -4 }}
                className="flex items-center gap-2 text-sm font-bold hover:text-blue-500 transition-colors"
              >
                {social.icon} <span>{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Image Stack */}
        <div className="lg:col-span-5 relative h-[500px] mt-20 lg:mt-0 flex items-center justify-center">
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
          
          {/* Creative Chess Piece - Floating element */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 right-0 bg-zinc-100 dark:bg-zinc-800 p-6 rounded-full shadow-xl border border-black/5"
          >
            <span className="text-4xl">♞</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}