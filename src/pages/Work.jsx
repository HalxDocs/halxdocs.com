import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "../data/caseStudies";
import { projects } from "../data/projects";

const isExternal = (url) => /^https?:\/\//.test(url);

function domain(url) {
  if (!url) return null;
  if (url.startsWith("/")) return "halxdocs.com";
  try {
    return new URL(url).hostname.replace("www.", "").toLowerCase();
  } catch {
    return null;
  }
}

function Stack({ items }) {
  if (!items?.length) return null;
  return (
    <span className="stack-line">
      {items.map((item) => (
        <span key={item} className="stack-chip">
          {item}
        </span>
      ))}
    </span>
  );
}

function StudyRow({ study, index }) {
  return (
    <div className="cs-index-row">
      <div className="cs-index-head">
        <span className="cs-index-num font-mono">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="cs-index-title-wrap">
          <div className="cs-index-title-line">
            <Link to={`/work/${study.slug}`} className="cs-index-title">
              {study.name}
            </Link>
            <span className="cs-index-status font-mono">{study.status}</span>
          </div>
          <p className="cs-index-kicker">{study.kicker}</p>
        </div>
      </div>

      <p className="cs-index-summary">{study.summary}</p>

      <div className="cs-index-meta">
        <span className="cs-index-cat font-mono">
          {study.category} · {study.year}
        </span>
        <Stack items={study.stack} />
      </div>

      <div className="cs-index-foot">
        <div className="cs-index-metrics">
          {study.metrics.map((metric) => (
            <span key={metric.label} className="cs-index-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </span>
          ))}
        </div>

        <Link to={`/work/${study.slug}`} className="cs-index-link">
          Read case study
          <ArrowRight size={12} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function MoreLink({ href, label }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {label}
        <ArrowUpRight size={11} strokeWidth={1.75} aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link to={href}>
      {label}
      <ArrowRight size={11} strokeWidth={1.75} aria-hidden="true" />
    </Link>
  );
}

export default function Work() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Work — Case studies — HalxDocs";
    return () => {
      document.title = previous;
    };
  }, []);

  const withStudy = new Set(caseStudies.map((study) => study.slug));
  const more = projects.filter(
    (project) => !project.caseStudy || !withStudy.has(project.caseStudy)
  );

  return (
    <section className="work-page">
      <p className="label" style={{ marginBottom: 12 }}>
        Selected work
      </p>

      <h1 className="work-h1">How the systems actually work.</h1>

      <p className="work-intro">
        Five deep dives into architecture, trade-offs, and the parts that broke. Written
        from the code, not the pitch deck.
      </p>

      <div className="work-domains font-mono">
        <span>Distributed systems</span>
        <span>Developer tools</span>
        <span>Product engineering</span>
      </div>

      <div className="cs-index">
        {caseStudies.map((study, index) => (
          <StudyRow key={study.slug} study={study} index={index} />
        ))}
      </div>

      <section className="more-work">
        <div className="more-work-head">
          <h2>More shipped work</h2>
          <span className="font-mono">{more.length} projects</span>
        </div>

        <div className="more-work-list">
          {more.map((project) => (
            <div key={project.title} className="more-work-row">
              <div className="more-work-main">
                <div className="more-work-title-line">
                  <span className="more-work-title">{project.title}</span>
                  <span className="font-mono more-work-cat">
                    {project.category === "tools" ? "Tool" : "Product"}
                  </span>
                </div>
                <p className="more-work-desc">{project.description}</p>
                <Stack items={project.stack} />
              </div>

              <div className="more-work-links">
                {project.live && (
                  <MoreLink
                    href={project.live}
                    label={isExternal(project.live) ? domain(project.live) : "Site"}
                  />
                )}
                {project.github && (
                  <MoreLink href={project.github} label="GitHub" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="work-cta">
        <div>
          <h2>Want the longer version?</h2>
          <p>
            I can walk through the architecture, the failure modes, and the decisions
            behind any of these.
          </p>
        </div>
        <div className="work-cta-actions">
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
    </section>
  );
}
