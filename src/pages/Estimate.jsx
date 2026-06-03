import EstimatorWidget from "../components/EstimatorWidget";

export default function Estimate() {
  return (
    <main
      style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: "130px 24px 60px",
        minHeight: "100vh",
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "'Fraunces', serif", marginBottom: 6, letterSpacing: "-0.02em" }}>
        Build-With-Me
      </div>
      <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 40, lineHeight: 1.5 }}>
        Select a project type, choose add-ons, and get a live estimate — no commitment, just clarity.
      </div>
      <EstimatorWidget />
    </main>
  );
}
