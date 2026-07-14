import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { graves, categories } from "../data/graveyard";

function tombstoneVariants(slug) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
}

export default function Graveyard() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("death");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    let list = [...graves];
    if (filter !== "All") list = list.filter((g) => g.category === filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((g) => g.name.toLowerCase().includes(q) || g.epitaph.toLowerCase().includes(q));
    }
    if (sort === "death") list.sort((a, b) => new Date(b.death) - new Date(a.death));
    if (sort === "lifespan") list.sort((a, b) => b.lifespan - a.lifespan);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filter, search, sort]);

  const stats = useMemo(() => {
    const total = graves.length;
    const totalYears = graves.reduce((s, g) => s + g.lifespan, 0);
    const mostRecent = [...graves].sort((a, b) => new Date(b.death) - new Date(a.death))[0];
    const oldest = [...graves].sort((a, b) => a.birth - b.birth)[0];
    return { total, totalYears, mostRecent, oldest };
  }, []);

  return (
    <main
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "130px 24px 80px",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span
          className="font-mono"
          style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--text-dim)", textTransform: "uppercase" }}
        >
          Memorial
        </span>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(40px, 8vw, 72px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            margin: "8px 0 6px",
            color: "var(--text)",
          }}
        >
          API Graveyard
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 520, marginBottom: 32 }}>
          A resting place for the APIs we built on, loved, and lost. May their endpoints rest in peace.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 1,
          background: "var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 36,
        }}
      >
        {[
          { label: "RIP", value: stats.total, suffix: "" },
          { label: "Years of Service", value: stats.totalYears, suffix: "yrs" },
          { label: "Last to Fall", value: stats.mostRecent.name, suffix: "" },
          { label: "Oldest Veteran", value: `Est. ${stats.oldest.birth}`, suffix: "" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--surface)",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>
              {s.label}
            </span>
            <span
              className="font-display"
              style={{ fontSize: 22, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
            >
              {s.value}{s.suffix}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Filter + Search + Sort */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12, alignItems: "center" }}
      >
        <span className="font-mono" style={{ fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.06em", marginRight: 4 }}>
          Category
        </span>
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              fontSize: 12,
              padding: "5px 12px",
              borderRadius: 100,
              border: "0.5px solid var(--border)",
              background: filter === c ? "var(--text)" : "transparent",
              color: filter === c ? "var(--bg)" : "var(--text-muted)",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              transition: "all 0.2s",
            }}
          >
            {c}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}
      >
        <input
          placeholder="Search graves..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            padding: "10px 14px",
            borderRadius: 8,
            border: "0.5px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            fontSize: 14,
            outline: "none",
          }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "0.5px solid var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
            fontSize: 13,
            fontFamily: "'DM Mono', monospace",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="death">Death date</option>
          <option value="lifespan">Lifespan</option>
          <option value="name">Name</option>
        </select>
      </motion.div>

      {/* Graveyard list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((g, i) => {
          const deathDate = new Date(g.death);
          const deathStr = deathDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
          const isExpanded = expanded === g.slug;
          return (
            <motion.div
              key={g.slug}
              variants={tombstoneVariants(g.slug)}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.04 * i, duration: 0.4 }}
              onClick={() => setExpanded(isExpanded ? null : g.slug)}
              style={{
                borderRadius: 12,
                border: "0.5px solid var(--border)",
                background: "var(--surface)",
                padding: "18px 20px",
                cursor: "pointer",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--text-dim)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
                    <span className="font-display" style={{ fontSize: 18, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.02em" }}>
                      {g.name}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        padding: "2px 8px",
                        borderRadius: 100,
                        background: "var(--accent-soft)",
                        color: "var(--text-muted)",
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {g.category}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-dim)", margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
                    {g.epitaph}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div className="font-mono" style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                    {g.birth} &mdash; {deathDate.getFullYear()}
                  </div>
                  <div className="font-mono" style={{ fontSize: 12, color: "var(--text)", marginTop: 2 }}>
                    {g.lifespan} yrs
                  </div>
                </div>
              </div>

              {/* Expandable cause */}
              <div
                style={{
                  maxHeight: isExpanded ? 100 : 0,
                  opacity: isExpanded ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    margin: "10px 0 0",
                    paddingTop: 10,
                    borderTop: "0.5px solid var(--border)",
                  }}
                >
                  {g.cause}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: 14, marginTop: 60 }}>
          No APIs found in this category. Try a different filter.
        </p>
      )}

      {/* Footer note */}
      <p
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "var(--text-dim)",
          marginTop: 60,
          lineHeight: 1.6,
          fontStyle: "italic",
        }}
      >
        This is a memorial, not a hit list. Every API here shaped the tools we use today.
        <br />
        If your API is on this list, thank you for your service.
      </p>
    </main>
  );
}
