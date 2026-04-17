import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Silk from "./Silk";

const phrases = [
  "designed to scale",
  "engineered to convert",
  "built for real growth",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white text-black dark:bg-black dark:text-white pt-6 sm:pt-10 pb-0">
      <div className="mx-auto px-4 sm:px-6 max-w-[90rem]">
        <div
          className="
            relative w-full
            h-[85vh] min-h-[650px] sm:h-[600px] lg:h-[720px]
            rounded-[40px] sm:rounded-[50px]
            overflow-hidden
            bg-black
            border border-white/5
          "
        >
          {/* Liquid Silk Background */}
          <div className="absolute inset-0">
            <Silk
              speed={0.35}
              scale={0.6}
              color="#000000"
              noiseIntensity={0.4}
              rotation={45}
            />
          </div>

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pb-20">

            {/* Context Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              className="
                mb-6 sm:mb-8
                inline-flex items-center gap-3
                px-4 py-2
                rounded-full
                bg-white/5 backdrop-blur-md
                border border-white/10
                cursor-default transition-colors
              "
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-blue-400" />
              </span>
              <p className="text-[10px] uppercase tracking-[0.15em] font-medium text-white/90">
                Working with founders & product teams
              </p>
            </motion.div>

            {/* Headline */}
            <h1 className="w-full max-w-5xl text-[34px] leading-[1.1] sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white">
              High-Impact <br className="sm:hidden" /> Digital Products

              <div className="relative block w-full h-[1.2em] mt-1 sm:mt-2 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phrases[index]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="
                      absolute inset-0 block
                      text-[28px] sm:text-[40px] lg:text-[56px]
                      font-light italic text-white/60
                      whitespace-nowrap
                    "
                  >
                    {phrases[index]} <span className="not-italic opacity-40 ml-1">✽</span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="
                mt-6 sm:mt-8 max-w-[300px] sm:max-w-lg lg:max-w-2xl
                text-sm sm:text-base lg:text-lg
                leading-relaxed text-white/50
              "
            >
              I design and engineer digital products for founders —
              focused on <span className="text-white/80">performance and clarity.</span>
            </motion.p>

            {/* CTA Button */}
            <motion.a
              href="https://cal.com/kamsy-ejindu-qdidgy/15min"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 sm:mt-10 relative inline-flex items-center"
              style={{ textDecoration: "none" }}
            >
              {/* Outer glow ring */}
              <span
                className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, transparent 70%)",
                  filter: "blur(8px)",
                  transform: "scale(1.3)",
                }}
              />

              <span
                className="
                  relative z-10
                  px-8 py-3.5
                  rounded-full
                  text-[11px] uppercase tracking-[0.18em] font-bold
                  text-black
                  overflow-hidden
                  group
                "
                style={{
                  background: "#fff",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                {/* Shimmer sweep on hover */}
                <span
                  className="
                    absolute inset-0 -translate-x-full group-hover:translate-x-full
                    transition-transform duration-700 ease-in-out
                  "
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)",
                  }}
                />
                <span className="relative">Book a call</span>
              </span>
            </motion.a>

          </div>
        </div>
      </div>
    </section>
  );
}