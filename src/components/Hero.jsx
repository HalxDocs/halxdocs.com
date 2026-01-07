import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Silk from "./Silk";

const phrases = ["built to scale", "built to convert", "built to impress"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white text-black dark:bg-black dark:text-white pt-16 pb-40">
      <div className="mx-auto px-2 sm:px-4 max-w-[96rem]">
        <div
          className="
            relative w-full
            h-[85vh] sm:h-[600px] md:h-[650px]
            rounded-[36px] sm:rounded-[40px]
            overflow-hidden
            bg-black
            border border-black/10 dark:border-white/10
          "
        >
          {/* Silk background */}
          <div className="absolute inset-0">
            <Silk
              speed={5}
              scale={1}
              color="#5721ECFF"
              noiseIntensity={1.5}
              rotation={0}
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">

            {/* Availability pill */}
            <div
              className="
                mb-8 inline-flex items-center gap-3
                px-5 py-2.5 rounded-full
                bg-white/15
                border border-white/25
                backdrop-blur
              "
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <p className="text-xs uppercase tracking-widest text-white">
                Available for new projects
              </p>
            </div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
                max-w-4xl
                text-4xl sm:text-5xl md:text-6xl
                font-semibold leading-tight
                text-white
              "
            >
              High-Impact Digital Products
              <br />
              <span>{phrases[index]} ✽</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="
                mt-6 max-w-2xl
                text-base sm:text-lg
                text-white/85
              "
            >
              We design and build digital products that focus
              on real business growth and long-term impact.
            </motion.p>

            {/* CTA — SAME PILL SYSTEM */}
            <motion.a
              href="https://cal.com/kamsy-ejindu-qdidgy/15min"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="
                mt-10 inline-flex items-center gap-3
                px-6 py-3 rounded-full
                bg-white/20
                border border-white/30
                backdrop-blur
                text-white
                transition-all
              "
            >
              {/* Ping dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>

              <span className="text-xs uppercase tracking-widest font-medium">
                Book a call
              </span>
            </motion.a>

          </div>
        </div>
      </div>
    </section>
  );
}
