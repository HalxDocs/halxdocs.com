import { useState, useReducer } from "react";
import { PROJECT_TYPES, FEATURES, TIMELINES, USD_TO_NGN } from "../types/estimator";
import { computeEstimate } from "../lib/estimator";

const init = {
  step: 1,
  projectType: null,
  features: [],
  timeline: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PROJECT": return { ...state, projectType: action.id, step: 2 };
    case "TOGGLE_FEATURE": {
      const f = state.features.includes(action.id)
        ? state.features.filter(i => i !== action.id)
        : [...state.features, action.id];
      return { ...state, features: f };
    }
    case "SET_TIMELINE": return { ...state, timeline: action.id, step: 4 };
    case "GO": return { ...state, step: action.step };
    case "RESET": return init;
    default: return state;
  }
}

const s = {
  btn: (active, disabled) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 22px",
    borderRadius: 100,
    background: active ? "var(--text)" : "var(--border)",
    color: active ? "var(--bg)" : "var(--text-muted)",
    fontSize: 14,
    fontWeight: 500,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    letterSpacing: "0.01em",
    transition: "opacity 0.2s",
    textDecoration: "none",
  }),
  card: (sel) => ({
    padding: "16px 20px",
    borderRadius: 10,
    border: `1px solid ${sel ? "var(--text)" : "var(--border)"}`,
    background: sel ? "var(--surface)" : "transparent",
    cursor: "pointer",
    transition: "border-color 0.15s",
    textAlign: "left",
    width: "100%",
    color: "var(--text)",
    fontFamily: "inherit",
    fontSize: 14,
  }),
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: "var(--text-muted)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  steps: {
    display: "flex",
    gap: 6,
    marginBottom: 28,
    justifyContent: "center",
  },
  dot: (active) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: active ? "var(--text)" : "var(--border)",
    transition: "background 0.2s",
  }),
};

function StepDots({ step }) {
  return (
    <div style={s.steps}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={s.dot(i <= step)} />
      ))}
    </div>
  );
}

function StepProjectType({ state, dispatch }) {
  return (
    <div>
      <div style={s.label}>What are you building?</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PROJECT_TYPES.map(p => (
          <button key={p.id} style={s.card(state.projectType === p.id)}
            onClick={() => dispatch({ type: "SET_PROJECT", id: p.id })}
            onMouseEnter={e => { if (state.projectType !== p.id) e.currentTarget.style.borderColor = "var(--text-muted)"; }}
            onMouseLeave={e => { if (state.projectType !== p.id) e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <div style={{ fontWeight: 600, marginBottom: 2 }}>{p.label}</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{p.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepFeatures({ state, dispatch }) {
  const featuresCost = state.features.reduce((sum, id) => {
    const f = FEATURES.find(x => x.id === id);
    return sum + (f ? f.cost : 0);
  }, 0);

  return (
    <div>
      <div style={s.label}>Add-ons (optional)</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {FEATURES.map(f => {
          const sel = state.features.includes(f.id);
          return (
            <button key={f.id} onClick={() => dispatch({ type: "TOGGLE_FEATURE", id: f.id })}
              style={{
                padding: "8px 14px",
                borderRadius: 100,
                border: `1px solid ${sel ? "var(--text)" : "var(--border)"}`,
                background: sel ? "var(--text)" : "transparent",
                color: sel ? "var(--bg)" : "var(--text)",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {f.label} <span style={{ opacity: 0.6 }}>+${f.cost}</span>
            </button>
          );
        })}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
        Add-on total: <strong style={{ color: "var(--text)" }}>+${featuresCost.toLocaleString()}</strong>
      </div>
      <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
        <button style={s.btn(false)} onClick={() => dispatch({ type: "GO", step: 1 })}>Back</button>
        <button style={s.btn(true)} onClick={() => dispatch({ type: "GO", step: 3 })}>Next</button>
      </div>
    </div>
  );
}

function StepTimeline({ state, dispatch }) {
  return (
    <div>
      <div style={s.label}>Timeline</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {TIMELINES.map(t => {
          const sel = state.timeline === t.id;
          return (
            <button key={t.id} style={s.card(sel)}
              onClick={() => dispatch({ type: "SET_TIMELINE", id: t.id })}
              onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = "var(--text-muted)"; }}
              onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600 }}>{t.label}</span>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{t.desc}</span>
              </div>
              {t.mult !== 1.0 && (
                <div style={{ fontSize: 12, color: t.mult > 1 ? "#f59e0b" : "#22c55e", marginTop: 4 }}>
                  {t.mult > 1 ? `+${Math.round((t.mult - 1) * 100)}%` : `${Math.round((t.mult - 1) * 100)}%`} multiplier
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button style={s.btn(false)} onClick={() => dispatch({ type: "GO", step: 2 })}>Back</button>
      </div>
    </div>
  );
}

function EstimateResult({ state, dispatch }) {
  const est = computeEstimate(state.projectType, state.features, state.timeline);
  if (!est) return null;

  const [showNGN, setShowNGN] = useState(false);

  const displayMin = showNGN ? est.minNGN.toLocaleString() : est.minUSD.toLocaleString();
  const displayMax = showNGN ? est.maxNGN.toLocaleString() : est.maxUSD.toLocaleString();
  const currency = showNGN ? "₦" : "$";
  const label = showNGN ? "NGN" : "USD";

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>
        Your Estimate
      </div>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 36, fontWeight: 600, fontFamily: "'Fraunces', serif", color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          {currency}{displayMin} – {currency}{displayMax}
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>
          {est.weeks} · {est.timelineLabel}
        </div>
      </div>

      <button onClick={() => setShowNGN(!showNGN)}
        style={{
          display: "block",
          margin: "0 auto 24px",
          padding: "6px 16px",
          borderRadius: 100,
          border: "1px solid var(--border)",
          background: "transparent",
          color: "var(--text-muted)",
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "color 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
        onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
      >
        Show in {showNGN ? "USD" : "NGN"} · 1 USD = ₦{USD_TO_NGN.toLocaleString()}
      </button>

      <div style={{ padding: "14px 16px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Breakdown</div>
        {est.breakdown.map((b, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", color: "var(--text-muted)", borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
            <span>{b.label}</span>
            {b.min !== 0 && b.max !== 0 ? <span>${b.min.toLocaleString()} – ${b.max.toLocaleString()}</span> : null}
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 16px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Stack</div>
        <div style={{ fontSize: 13, color: "var(--text)" }}>{est.stack}</div>
      </div>

      <div style={{ fontSize: 13, color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.6, marginBottom: 24, opacity: 0.8 }}>
        These figures are a starting point, not a fixed quote. Every project is different — scope, complexity, and timeline can shift the numbers in either direction. Let's talk it through.
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://cal.com/halxdocs" target="_blank" rel="noreferrer" style={s.btn(true, false)}>
          Book a Call
        </a>
        <a href={`mailto:halxdocs@gmail.com?subject=Project%20Inquiry%3A%20${encodeURIComponent(getProjectLabel(state.projectType))}&body=${encodeURIComponent(`Hi HalxDocs,%0A%0AI'm interested in building a ${getProjectLabel(state.projectType)}.%0A%0AEstimated range: ${currency}${displayMin} – ${currency}${displayMax}%0ATimeline: ${est.timelineLabel}%0A%0ALet's discuss.`)}`} style={{ ...s.btn(false, false), textDecoration: "none" }}>
          Email Me Instead
        </a>
      </div>

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <button onClick={() => dispatch({ type: "RESET" })}
          style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 13, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2, fontFamily: "inherit" }}>
          Start over
        </button>
      </div>
    </div>
  );
}

function getProjectLabel(id) {
  const p = PROJECT_TYPES.find(x => x.id === id);
  return p ? p.label : "";
}

export default function EstimatorWidget() {
  const [state, dispatch] = useReducer(reducer, init);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <StepDots step={state.step} />
      {state.step === 1 && <StepProjectType state={state} dispatch={dispatch} />}
      {state.step === 2 && <StepFeatures state={state} dispatch={dispatch} />}
      {state.step === 3 && <StepTimeline state={state} dispatch={dispatch} />}
      {state.step === 4 && <EstimateResult state={state} dispatch={dispatch} />}
    </div>
  );
}
