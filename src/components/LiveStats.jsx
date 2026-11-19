import { useState, useEffect } from "react";
import { API_BASE } from "../lib/api";

const GITHUB_REPOS = {
  reqit: "HalxDocs/reqit",
};

async function fetchGitHubStats(repo) {
  try {
    const [repoRes, releasesRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}`),
      fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`),
    ]);
    const repoData = await repoRes.json();
    const releases = await releasesRes.json();
    let downloads = 0;
    if (Array.isArray(releases)) {
      releases.forEach(r => {
        if (r.assets) {
          r.assets.forEach(a => { downloads += a.download_count || 0; });
        }
      });
    }
    return { stars: repoData.stargazers_count ?? 0, downloads };
  } catch {
    return { stars: 0, downloads: 0 };
  }
}

const STATS_ENDPOINT = `${API_BASE}/api/portal/stats`;

const styles = {
  section: {
    maxWidth: 640,
    margin: "56px auto 0",
    padding: "0 20px",
  },
  label: {
    fontSize: 10,
    fontWeight: 500,
    color: "var(--text-dim)",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: 10,
    fontFamily: "'Geist Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
  },
  dot: {
    display: "inline-block",
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "var(--text)",
    marginRight: 6,
    verticalAlign: "middle",
  },
  number: {
    fontSize: 15,
    fontWeight: 600,
    color: "var(--text)",
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  meta: {
    fontSize: 11.5,
    color: "var(--text-muted)",
    lineHeight: 1.4,
    whiteSpace: "nowrap" ,
  },
  source: {
    fontSize: 10,
    color: "var(--text-muted)",
    opacity: 0.55,
    letterSpacing: "0.03em",
  },
};

export default function LiveStats() {
  const [items, setItems] = useState([
    { value: "—", meta: "students on the platform", source: "274Lab" },
    { value: "—", meta: "quizzes taken", source: "274Lab" },
    { value: "65+", meta: "daily orders", source: "Myshoplet" },
    { value: "100+", meta: "active vendors", source: "Myshoplet" },
    { value: "—", meta: "app downloads", source: "reqit" },
    { value: "—", meta: "GitHub stars", source: "reqit" },
  ]);

  useEffect(() => {
    let mounted = true;

    async function load274() {
      const res = await fetch(STATS_ENDPOINT).then(r => r.json()).catch(() => null);
      if (!mounted || !res?.stats) return;
      const s = res.stats;
      setItems(prev => {
        const next = [...prev];
        next[0] = { ...next[0], value: s.totalStudents.toLocaleString() };
        next[1] = { ...next[1], value: s.totalQuizzesTaken.toLocaleString() };
        return next;
      });
    }

    async function loadReqit() {
      const stats = await fetchGitHubStats(GITHUB_REPOS.reqit);
      if (!mounted) return;
      setItems(prev => {
        const next = [...prev];
        next[4] = { ...next[4], value: stats.downloads ? stats.downloads.toLocaleString() : "—" };
        next[5] = { ...next[5], value: stats.stars ? stats.stars.toLocaleString() : "—" };
        return next;
      });
    }

    load274();
    loadReqit();

    const interval = setInterval(() => {
      load274(); loadReqit();
    }, 120000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  return (
    <div style={styles.section}>
      <style>{`
        .ls-grid { display: flex; flex-wrap: wrap; row-gap: 16px; }
        .ls-cell { display: flex; flex-direction: column; gap: 1px; padding: 0 24px 0 0; flex: 0 0 auto; }

        @media (max-width: 639px) {
          .ls-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
          .ls-cell { padding: 10px 0; }
          .ls-cell + .ls-cell { border-left: none; padding-left: 0; }
          .ls-cell:nth-child(odd) { padding-right: 14px; }
          .ls-cell:nth-child(even) { padding-left: 14px; border-left: 1px solid var(--border); }
          .ls-cell:nth-child(n+3) { border-top: 1px solid var(--border); padding-top: 10px; }
          .ls-cell:nth-child(2) { border-top: none; }
        }
      `}</style>
      <div style={styles.label}>
        <span style={styles.dot} />Live metrics
      </div>
      <div className="ls-grid">
        {items.map((s) => (
          <div key={s.source + s.meta} className="ls-cell">
            <span style={styles.number}>{s.value}</span>
            <span style={styles.meta}>{s.meta}</span>
            <span style={styles.source}>{s.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
