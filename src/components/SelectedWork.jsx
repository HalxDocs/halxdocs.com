import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import AllProjectsModal from "./AllProjectsModal";

function domain(url) {
  if (!url) return null;
  if (url.startsWith("/")) return "halxdocs.com";
  try {
    return new URL(url).hostname.replace("www.", "").toLowerCase();
  } catch {
    return null;
  }
}

const isExternal = (url) => /^https?:\/\//.test(url);

function ProjectLink({ project }) {
  if (project.live) {
    if (isExternal(project.live)) {
      return (
        <a href={project.live} target="_blank" rel="noreferrer">
          {domain(project.live)}
          <ArrowUpRight size={11} strokeWidth={1.75} aria-hidden="true" />
        </a>
      );
    }
    return (
      <Link to={project.live}>
        Site
        <ArrowRight size={11} strokeWidth={1.75} aria-hidden="true" />
      </Link>
    );
  }

  if (project.github) {
    return (
      <a href={project.github} target="_blank" rel="noreferrer">
        GitHub
        <ArrowUpRight size={11} strokeWidth={1.75} aria-hidden="true" />
      </a>
    );
  }

  return null;
}

export default function SelectedWork() {
  const [allProjectsOpen, setAllProjectsOpen] = useState(false);
  const closeAllProjects = useCallback(() => setAllProjectsOpen(false), []);

  const featured = projects.filter((item) => item.featured);

  return (
    <section
      id="projects"
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "56px 20px 72px",
        color: "var(--text)",
      }}
    >
      <h2
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: 14,
        }}
      >
        Projects
      </h2>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {featured.map((item, idx) => (
          <div key={item.title} className="work-row">
            <span className="work-num font-mono">
              {String(idx + 1).padStart(2, "0")}
            </span>

            <span className="work-name">{item.title}</span>

            <span className="work-desc">{item.description}</span>

            <span className="work-links">
              <ProjectLink project={item} />
              {item.caseStudy && (
                <Link to={`/work/${item.caseStudy}`} className="work-case-link">
                  Case study
                </Link>
              )}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setAllProjectsOpen(true)}
        aria-haspopup="dialog"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          marginTop: 16,
          padding: "7px 12px",
          fontFamily: "inherit",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "-0.005em",
          color: "var(--text)",
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: 6,
          cursor: "pointer",
          transition: "background 0.15s, border-color 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--surface)";
          e.currentTarget.style.borderColor = "var(--border-strong)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        View all projects
        <span
          className="font-mono"
          style={{ fontSize: 10.5, color: "var(--text-dim)" }}
        >
          {projects.length}
        </span>
        <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
      </button>

      <AllProjectsModal open={allProjectsOpen} onClose={closeAllProjects} />
    </section>
  );
}
