import { PROJECT_TYPES, FEATURES, TIMELINES, USD_TO_NGN } from "../types/estimator";

export function getProjectType(id) {
  return PROJECT_TYPES.find(p => p.id === id);
}

export function getFeature(id) {
  return FEATURES.find(f => f.id === id);
}

export function getTimeline(id) {
  return TIMELINES.find(t => t.id === id);
}

export function computeEstimate(projectTypeId, featureIds, timelineId) {
  const project = getProjectType(projectTypeId);
  const timeline = getTimeline(timelineId);
  if (!project || !timeline) return null;

  const featuresCost = featureIds.reduce((sum, id) => {
    const f = getFeature(id);
    return sum + (f ? f.cost : 0);
  }, 0);

  const baseMin = project.min + featuresCost;
  const baseMax = project.max + featuresCost;

  const minUSD = Math.round(baseMin * timeline.mult);
  const maxUSD = Math.round(baseMax * timeline.mult);

  const minNGN = Math.round(minUSD * USD_TO_NGN);
  const maxNGN = Math.round(maxUSD * USD_TO_NGN);

  const breakdown = [
    { label: `Base (${project.label})`, min: project.min, max: project.max },
  ];

  featureIds.forEach(id => {
    const f = getFeature(id);
    if (f) breakdown.push({ label: f.label, min: f.cost, max: f.cost });
  });

  if (timeline.mult !== 1.0) {
    const pct = Math.round((timeline.mult - 1) * 100);
    const sign = pct > 0 ? "+" : "";
    breakdown.push({ label: `Timeline (${sign}${pct}%)`, min: 0, max: 0 });
  }

  return {
    minUSD,
    maxUSD,
    minNGN,
    maxNGN,
    weeks: project.weeks,
    stack: inferStack(projectTypeId),
    breakdown,
    timelineLabel: timeline.label,
    timelineWarn: timeline.warn,
  };
}

function inferStack(id) {
  const map = {
    backend: "Go (Gin) · PostgreSQL · JWT · REST",
    saas: "React · Go/NestJS · PostgreSQL · Paystack",
    cli: "Go · cobra · npm/pkg",
    fintech: "NestJS · MongoDB · Paystack · JWT",
    devtool: "TypeScript · Node.js · npm",
    fullstack: "React · Go/NestJS · PostgreSQL · Tailwind",
  };
  return map[id] || "";
}
