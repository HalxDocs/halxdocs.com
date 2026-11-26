import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "../data/caseStudies";
import NotFound from "./NotFound";

function Meta({ study }) {
  return (
    <div className="cs-meta font-mono">
      <span>{study.category}</span>
      <span className="cs-meta-dash" aria-hidden="true" />
      <span>{study.year}</span>
      <span className="cs-meta-dash" aria-hidden="true" />
      <span>{study.status}</span>
    </div>
  );
}

function SectionLabel({ children }) {
  return <p className="cs-label font-mono">{children}</p>;
}

function Paragraphs({ items }) {
  return items.map((text, index) => (
    <p key={index} className="cs-p">
      {text}
    </p>
  ));
}

function Architecture({ architecture }) {
  return (
    <div className="cs-arch-wrap">
      <div className="cs-arch">
        {architecture.layers.map((layer, index) => (
          <div key={layer.label} className="cs-arch-block">
            <div className="cs-arch-layer">
              <span className="cs-arch-label font-mono">{layer.label}</span>
              <div className="cs-arch-nodes">
                {layer.nodes.map((node) => (
                  <span key={node} className="cs-arch-node">
                    {node}
                  </span>
                ))}
              </div>
            </div>
            {index < architecture.layers.length - 1 && (
              <span className="cs-arch-arrow font-mono" aria-hidden="true">
                ↓
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="cs-caption">{architecture.caption}</p>
      {architecture.note && <p className="cs-note">{architecture.note}</p>}
    </div>
  );
}

function ExternalLinks({ study }) {
  return (
    <div className="cs-links">
      {study.live && (
        <a href={study.live} target="_blank" rel="noreferrer">
          Live
          <ArrowUpRight size={12} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}
      {study.github && (
        <a href={study.github} target="_blank" rel="noreferrer">
          Source
          <ArrowUpRight size={12} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  useEffect(() => {
    if (!study) return;
    const previous = document.title;
    document.title = `${study.name} — Case study — HalxDocs`;
    return () => {
      document.title = previous;
    };
  }, [study]);

  if (!study) return <NotFound />;

  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const previousStudy = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];
  const showPrevious = caseStudies.length > 2;

  return (
    <article className="cs-page">
      <Link to="/work" className="cs-back">
        <ArrowLeft size={12} strokeWidth={1.75} aria-hidden="true" />
        All work
      </Link>

      <Meta study={study} />

      <p className="cs-kicker">{study.kicker}</p>
      <h1 className="cs-h1">{study.name}</h1>
      <p className="cs-summary">{study.summary}</p>

      <div className="cs-glance">
        <div className="cs-glance-item">
          <span className="cs-glance-label font-mono">Role</span>
          <span className="cs-glance-value">{study.role}</span>
        </div>
        <div className="cs-glance-item">
          <span className="cs-glance-label font-mono">Timeline</span>
          <span className="cs-glance-value">{study.duration}</span>
        </div>
        <div className="cs-glance-item">
          <span className="cs-glance-label font-mono">Stack</span>
          <span className="cs-glance-value">
            {study.stack.map((item) => (
              <span key={item} className="stack-chip">
                {item}
              </span>
            ))}
          </span>
        </div>
        <div className="cs-glance-item">
          <span className="cs-glance-label font-mono">Links</span>
          <span className="cs-glance-value">
            <ExternalLinks study={study} />
          </span>
        </div>
      </div>

      <div className="cs-metrics">
        {study.metrics.map((metric) => (
          <div key={metric.label} className="cs-metric">
            <span className="cs-metric-value font-mono">{metric.value}</span>
            <span className="cs-metric-label">{metric.label}</span>
          </div>
        ))}
      </div>

      <section className="cs-section">
        <SectionLabel>What was wrong</SectionLabel>
        <Paragraphs items={study.problem} />
      </section>

      <section className="cs-section">
        <SectionLabel>What I had to work with</SectionLabel>
        <ul className="cs-list">
          {study.constraints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="cs-section">
        <SectionLabel>How it fits together</SectionLabel>
        <Architecture architecture={study.architecture} />
      </section>

      <section className="cs-section">
        <SectionLabel>Choices I made</SectionLabel>
        <div className="cs-decisions">
          {study.decisions.map((decision, decisionIndex) => (
            <div key={decision.title} className="cs-decision">
              <span className="cs-decision-num font-mono">
                {String(decisionIndex + 1).padStart(2, "0")}
              </span>
              <div className="cs-decision-body">
                <h3>{decision.title}</h3>
                <p>{decision.body}</p>
                <p className="cs-tradeoff">
                  <span className="font-mono">What it costs</span>
                  {decision.tradeoff}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cs-section">
        <SectionLabel>What broke</SectionLabel>
        <div className="cs-challenges">
          {study.challenges.map((challenge, challengeIndex) => (
            <div key={challenge.title} className="cs-challenge">
              <h3>
                <span className="font-mono">
                  {String(challengeIndex + 1).padStart(2, "0")}
                </span>
                {challenge.title}
              </h3>
              <p>
                <span className="cs-inline-label font-mono">Problem</span>
                {challenge.problem}
              </p>
              <p>
                <span className="cs-inline-label font-mono">Solution</span>
                {challenge.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="cs-section">
        <SectionLabel>Where it landed</SectionLabel>
        <Paragraphs items={study.outcome} />
      </section>

      <section className="cs-section">
        <SectionLabel>Still open</SectionLabel>
        <ul className="cs-list">
          {study.next.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {study.related.length > 0 && (
        <section className="cs-section">
          <SectionLabel>Go deeper</SectionLabel>
          <div className="cs-related">
            {study.related.map((item) => (
              <Link key={item.to} to={item.to} className="cs-related-link">
                <span>{item.label}</span>
                <ArrowRight size={12} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {caseStudies.length > 1 && (
        <nav
          className={`cs-pager${showPrevious ? "" : " cs-pager-single"}`}
          aria-label="Case studies"
        >
          {showPrevious && (
            <Link to={`/work/${previousStudy.slug}`} className="cs-pager-link">
              <span className="font-mono">← Previous</span>
              <strong>{previousStudy.name}</strong>
            </Link>
          )}
          <Link
            to={`/work/${nextStudy.slug}`}
            className="cs-pager-link cs-pager-next"
          >
            <span className="font-mono">Next →</span>
            <strong>{nextStudy.name}</strong>
          </Link>
        </nav>
      )}

      <div className="cs-cta">
        <div>
          <h2>Working on something similar?</h2>
          <p>
            I&apos;m happy to talk through the hard parts before they turn into
            incidents.
          </p>
        </div>
        <div className="cs-cta-actions">
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
    </article>
  );
}
