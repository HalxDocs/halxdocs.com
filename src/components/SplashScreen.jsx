import BlurText from "./BlurText";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#0D0D0D" }}>
      <div className="text-center">
        <BlurText
          text="HALXDOCS"
          className="text-white text-5xl md:text-7xl tracking-tight"
          delay={120}
          animateBy="letters"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, letterSpacing: "-0.02em" }}
        />

        <div className="h-px w-32 mx-auto mt-6" style={{ background: "#3B82F6" }} />

        <p
          className="font-mono mt-6"
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "#888",
          }}
        >
          Building what ships
        </p>
      </div>
    </div>
  );
}
