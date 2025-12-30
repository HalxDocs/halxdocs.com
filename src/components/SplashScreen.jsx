import BlurText from "./BlurText";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="text-center">
        {/* HALXDOCS animation */}
        <BlurText
          text="HALXDOCS"
          className="text-white text-5xl md:text-7xl font-bold tracking-widest"
          delay={120}
          animateBy="letters"
        />

        {/* Line */}
        <div className="h-px w-32 bg-white/40 mx-auto mt-6" />

        {/* Tagline */}
        <p className="mt-6 text-sm uppercase tracking-widest text-white/60">
          Building what lasts
        </p>
      </div>
    </div>
  );
}
