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

      <div
        id="contact"
        style={{
          marginTop: 64,
          paddingTop: 28,
          borderTop: "1px solid var(--border)",
        }}
      >
        <h2
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            marginBottom: 8,
          }}
        >
          Get in touch
        </h2>
        <p
          style={{
            maxWidth: 460,
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--text-muted)",
            margin: "0 0 20px",
          }}
        >
          Have a project in mind? I'm available for backend and full-stack work.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 20,
          }}
        >
          <a
            href="https://cal.com/halxdocs"
            target="_blank"
            rel="noreferrer"
            className="cta-btn"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(2px, 2px)";
              e.currentTarget.style.boxShadow = "1px 1px 0 var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "3px 3px 0 var(--text)";
            }}
          >
            Book a call
          </a>

          <a href="mailto:halxdocs@gmail.com" className="email-link">
            Email me
          </a>
        </div>
      </div>

      <div className="support-row">
        <div>
          <h2
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              marginBottom: 4,
            }}
          >
            Do you like what I do?
          </h2>
          <p
            style={{
              maxWidth: 420,
              fontSize: 13,
              lineHeight: 1.65,
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            If my work has been useful to you, you can support me on Floss Africa.
          </p>
        </div>

        <a
          href="https://flossafrica.com/m/halxdocs"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          Sponsor me
        </a>
      </div>
    </section>
  );
}
