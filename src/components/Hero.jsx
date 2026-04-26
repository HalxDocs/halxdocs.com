import { motion } from "framer-motion";
import Silk from "./Silk";

export default function Hero() {
  return (
    <section className="relative pt-6 sm:pt-10 pb-0" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="mx-auto px-4 sm:px-6 max-w-[90rem]">
        <div
          className="
            relative w-full
            h-[88vh] min-h-[640px] sm:h-[620px] lg:h-[740px]
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

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 pb-10">

            {/* Availability pill */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-7 sm:mb-9 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-full w-full bg-emerald-400" />
              </span>
              <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-white/85" style={{ fontFamily: "'Syne', sans-serif" }}>
                Available for new projects
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-5xl text-[34px] leading-[1.05] sm:text-[58px] lg:text-[78px] tracking-tight text-white"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              I build backends and{" "}
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.55)" }}>
                web products
              </span>
              <br className="hidden sm:block" />
              {" "}that actually ship.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-7 sm:mt-9 max-w-[320px] sm:max-w-xl lg:max-w-2xl text-sm sm:text-base lg:text-[17px] leading-relaxed text-white/55"
            >
              APIs, SaaS systems, fintech backends, full-stack products —
              for{" "}
              <span className="text-white/85">Nigerian startups and founders</span>
              {" "}who need it done right.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-bold transition-all hover:scale-[1.02]"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "'Syne', sans-serif",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-accent)",
                }}
              >
                Work with me
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-bold text-white/75 hover:text-white transition-colors"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  textDecoration: "none",
                }}
              >
                See my work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
