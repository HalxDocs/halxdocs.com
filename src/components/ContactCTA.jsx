import { motion } from "framer-motion";
import Beams from "./Beams";

export default function ContactCTA() {
  return (
    <section className="relative w-full h-[90vh] min-h-[640px] overflow-hidden bg-white dark:bg-black">
      
      {/* Beams background - always black with white beams */}
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

      {/* Adaptive overlay */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm sm:text-base uppercase tracking-widest text-black/60 dark:text-white/60"
          >
            Let's work together
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-black dark:text-white"
          >
            Have an idea worth building?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-6 text-base sm:text-lg text-black/75 dark:text-white/75 max-w-xl mx-auto"
          >
            I help founders and teams turn clear ideas into
            scalable, high-impact digital products.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="mailto:halxdocs@gmail.com"
              className="
                px-8 py-4 rounded-full
                bg-black text-white
                dark:bg-white dark:text-black
                font-medium transition
                hover:scale-[1.04]
              "
            >
              Send an email
            </a>

            <a
              href="https://cal.com/kamsy-ejindu-qdidgy/15min"
              className="
                px-8 py-4 rounded-full
                border border-black/40 dark:border-white/40
                text-black dark:text-white
                font-medium transition
                hover:bg-black/10 dark:hover:bg-white/10
              "
            >
              Book a call
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}