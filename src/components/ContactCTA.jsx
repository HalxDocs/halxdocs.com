import { motion } from "framer-motion";
import Beams from "./Beams";

export default function ContactCTA() {
  return (
    <section className="relative w-full min-h-[70vh] py-20 sm:py-0 sm:min-h-[85vh] bg-white dark:bg-black overflow-hidden flex items-center">
      
      {/* Background - Fixed to ensure it covers the flex container */}
      <div className="absolute inset-0 bg-black">
        <Beams
          beamWidth={2}
          beamHeight={18}
          beamNumber={10}
          lightColor="#ffffff"
          speed={1.6}
          noiseIntensity={1.4}
          scale={0.22}
          rotation={0}
        />
      </div>

      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="
              text-[10px] sm:text-xs
              uppercase tracking-[0.4em]
              text-black/50 dark:text-white/50
              mb-6
            "
          >
            Start a project
          </motion.p>

          {/* Headline - Improved scaling for small screens */}
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="
              text-4xl sm:text-5xl md:text-6xl
              font-medium leading-[1.1]
              tracking-tight
              text-black dark:text-white
            "
          >
            Let’s build something <br className="hidden sm:block" />
            <span className="text-black/60 dark:text-white/60">that actually matters.</span>
          </motion.h2>

          {/* Subtext - Better max-width for readability */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="
              mt-6
              text-base sm:text-lg
              leading-relaxed
              text-black/70 dark:text-white/70
              max-w-md sm:max-w-xl mx-auto
            "
          >
            I work with founders and product teams to design and ship
            focused digital products — built for clarity, performance,
            and long-term growth.
          </motion.p>

          {/* CTAs - Stacked on very small devices, side-by-side on others */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="
              mt-10
              flex flex-col sm:flex-row
              items-center justify-center
              gap-4 sm:gap-5
            "
          >
            {/* Primary */}
            <a
              href="https://cal.com/kamsy-ejindu-qdidgy/15min"
              className="
                w-full sm:w-auto
                inline-flex items-center justify-center
                gap-2
                px-8 py-4 sm:py-3
                rounded-full
                bg-black text-white
                dark:bg-white dark:text-black
                text-sm font-semibold
                transition-all
                active:scale-95
                hover:opacity-90
              "
            >
              Book a call
            </a>

            {/* Secondary */}
            <a
              href="mailto:halxdocs@gmail.com"
              className="
                w-full sm:w-auto
                inline-flex items-center justify-center
                px-8 py-4 sm:py-3
                rounded-full
                border border-black/20 dark:border-white/20
                text-black dark:text-white
                text-sm font-semibold
                transition-all
                active:scale-95
                hover:bg-black/5 dark:hover:bg-white/10
              "
            >
              Email me
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}