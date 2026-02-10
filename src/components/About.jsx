import { motion } from "framer-motion";
import { FiInstagram, FiLinkedin, FiGithub } from "react-icons/fi";
import { memo } from "react";

/* -------------------- Static Image Card -------------------- */

const ImageCard = ({ src, rotation, translateX, translateY, label, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="absolute rounded-2xl p-2 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-xl overflow-hidden"
      style={{
        transform: `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`,
        zIndex: index === 0 ? 10 : 20,
      }}
    >
      <div className="relative overflow-hidden rounded-xl w-[160px] h-[200px] sm:w-[200px] sm:h-[260px]">
        <img
          src={src}
          alt="HalxDocs"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        {label && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-black/10 dark:border-white/10 text-[10px] uppercase tracking-widest font-semibold">
            {label}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* -------------------- About Section -------------------- */

export default function About() {
  // Social links data - URLs trimmed of any spaces
  const socialLinks = [
    { 
      icon: <FiGithub size={18} />, 
      href: "https://github.com/halxdocs", 
      label: "GitHub",
      color: "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
    },
    { 
      icon: <FiInstagram size={18} />, 
      href: "https://instagram.com/halxdocs_", 
      label: "Instagram",
      color: "hover:bg-gradient-to-tr hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 hover:text-white"
    },
    { 
      icon: <FiLinkedin size={18} />, 
      href: "https://www.linkedin.com/in/halx-docs-633272344", 
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white"
    },
  ];

  return (
    <section className="relative bg-white text-black dark:bg-black dark:text-white py-24 sm:py-32 overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-black/20 dark:bg-white/20" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold opacity-50">
              About Me
            </span>
            <div className="h-px w-12 bg-black/20 dark:bg-white/20" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto">
            Building systems that{" "}
            <span className="italic font-serif text-black/40 dark:text-white/30">
              outlast trends
            </span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Images - Stacked Composition */}
          <div className="lg:col-span-5 relative h-[400px] sm:h-[500px] flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full h-full max-w-[400px]">
              {/* Primary Image */}
              <ImageCard
                src="/halxdocspic.jpeg"
                rotation={-6}
                translateX={-20}
                translateY={0}
                index={0}
              />
              
              {/* Secondary Image - Offset */}
              <ImageCard
                src="/halx2.jpeg"
                rotation={8}
                translateX={80}
                translateY={60}
                label="Engineer"
                index={1}
              />
              
              {/* Decorative Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-10 left-10 bg-zinc-100 dark:bg-zinc-800 px-4 py-3 rounded-lg shadow-lg border border-black/5 dark:border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">♞</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest opacity-60 font-semibold">Strategy</p>
                    <p className="text-sm font-medium">Chess Player</p>
                  </div>
                </div>
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute top-10 right-0 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                3+ Years
              </motion.div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-2xl">
              
              {/* Bio Text */}
              <div className="space-y-6 text-base sm:text-lg text-black/70 dark:text-white/70 leading-relaxed mb-12">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  I'm a full-stack product engineer who helps founders ship faster 
                  and scale smarter. I specialize in building high-conversion websites, 
                  internal tools, and systems that reduce operational friction.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  My approach combines technical depth with business context. I don't 
                  just write code—I architect solutions that align engineering decisions 
                  with revenue goals and user outcomes.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-black dark:text-white font-medium"
                >
                  Currently building developer tools and SaaS platforms while 
                  contributing to open-source projects that improve how we ship software.
                </motion.p>
              </div>

              {/* Expertise Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-50">
                  Core Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Product Engineering",
                    "System Architecture",
                    "Shipping to Production",
                    "Scalable Backend Systems",
                    "Frontend Systems for Real Users",
                    "Performance & Reliability",
                    "Technical Decision-Making"
                  ].map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Social Links - Fixed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 pt-4"
              >
                <span className="text-sm font-medium opacity-50">Connect:</span>
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`
                        flex items-center justify-center w-11 h-11 rounded-full 
                        bg-black/5 dark:bg-white/10 
                        border border-transparent
                        ${social.color}
                        transition-all duration-300 ease-out
                        hover:scale-110 hover:-translate-y-1
                        active:scale-95
                        shadow-sm hover:shadow-lg
                      `}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}