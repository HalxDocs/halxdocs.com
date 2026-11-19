import { useState, useMemo } from "react";
import { graves, categories } from "../data/graveyard";

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
        maxWidth: 640,
        margin: "0 auto",
        padding: "48px 20px 72px",
        minHeight: "100vh",
      }}
    >
      <p className="label" style={{ marginBottom: 12 }}>Memorial</p>

      <h1
        style={{
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1.3,
          margin: "0 0 4px",
          color: "var(--text)",
        }}
      >
        API Graveyard
      </h1>
      <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 460, marginBottom: 28 }}>
        A resting place for the APIs we built on, loved, and lost. May their endpoints rest in peace.
      </p>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0,
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          marginBottom: 28,
        }}
      >
        {[
          { label: "RIP", value: String(stats.total), suffix: "" },
          { label: "Years of service", value: String(stats.totalYears), suffix: "yrs" },
          { label: "Last to fall", value: stats.mostRecent.name, suffix: "" },
          { label: "Oldest veteran", value: `Est. ${stats.oldest.birth}`, suffix: "" },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "12px 16px 12px 0",
              marginRight: 16,
              borderLeft: i === 0 ? "none" : "1px solid var(--border)",
              paddingLeft: i === 0 ? 0 : 16,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <span className="font-mono" style={{ fontSize: 9.5, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {s.label}
            </span>
            <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
              {s.value}{s.suffix && <span style={{ color: "var(--text-dim)", fontSize: 11, marginLeft: 3 }}>{s.suffix}</span>}
            </span>
          </div>
        ))}
      </div>

      {/* Filter + Search + Sort */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10, alignItems: "center" }}>
        <span className="label" style={{ marginRight: 4, fontSize: 9.5 }}>Category</span>
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className="font-mono"
            style={{
              fontSize: 10.5,
              padding: "4px 9px",
              borderRadius: 3,
              border: "1px solid var(--border)",
              background: filter === c ? "var(--text)" : "transparent",
              color: filter === c ? "var(--bg)" : "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        <input
          placeholder="Search graves..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 180,
            padding: "8px 12px",
            borderRadius: 3,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text)",
            fontSize: 13,
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 3,
            border: "1px solid var(--border)",
            background: "var(--bg)",
            color: "var(--text-muted)",
            fontSize: 12,
            fontFamily: "inherit",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="death">Death date</option>
          <option value="lifespan">Lifespan</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Graveyard list */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        {filtered.map((g) => {
          const deathDate = new Date(g.death);
          const isExpanded = expanded === g.slug;
          return (
            <div
              key={g.slug}
              onClick={() => setExpanded(isExpanded ? null : g.slug)}
              style={{
                borderBottom: "1px solid var(--border)",
                padding: "14px 0",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text)" }}>
                      {g.name}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 9.5,
                        padding: "1px 6px",
                        borderRadius: 3,
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {g.category}
                    </span>
                  </div>
                  <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
                    {g.epitaph}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div className="font-mono" style={{ fontSize: 10, color: "var(--text-dim)", whiteSpace: "nowrap" }}>
                    {g.birth} &mdash; {deathDate.getFullYear()}
                  </div>
                  <div className="font-mono" style={{ fontSize: 10.5, color: "var(--text)", marginTop: 2 }}>
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
                  transition: "all 0.25s ease",
                }}
              >
                <p
                  style={{
                    fontSize: 12.5,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                    margin: "10px 0 0",
                    paddingTop: 10,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  {g.cause}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-dim)", fontSize: 13, marginTop: 48 }}>
          No APIs found in this category. Try a different filter.
        </p>
      )}

      {/* Footer note */}
      <p
        style={{
          textAlign: "center",
          fontSize: 11.5,
          color: "var(--text-dim)",
          marginTop: 48,
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
