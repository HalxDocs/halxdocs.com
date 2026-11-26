const engagements = [
  {
    label: "Backend engineering",
    description:
      "Go or TypeScript services, APIs, queues, data models, and the unglamorous reliability work around them.",
  },
  {
    label: "Platform engineering",
    description:
      "Internal tools, developer experience, CI/CD, observability, and the paved road between them.",
  },
  {
    label: "Software engineering",
    description:
      "End-to-end product work: schema, API, interface, deployment, and the first real users.",
  },
  {
    label: "Technical training",
    description:
      "Practical Go, backend fundamentals, or distributed systems for a team, cohort, or classroom.",
  },
  {
    label: "Consulting",
    description:
      "Architecture reviews, incident postmortems, and scaling audits that end in a written decision.",
  },
  {
    label: "Collaborations",
    description:
      "Open-source, research, or a product that needs a backend brain for a season.",
  },
];

const fits = [
  "You have a backend that needs to survive real traffic, not just a demo.",
  "You are turning a prototype into a product and want the foundations right.",
  "You want engineers who reason about failure instead of discovering it in production.",
];

export default function Opportunities() {
  return (
    <section id="contact" className="opp-section" aria-labelledby="opportunities-title">
      <div className="opp-status-row">
        <span className="opp-status font-mono">
          <span className="opp-status-dot" aria-hidden="true" />
          Open to work
        </span>
        <span className="font-mono">Remote · WAT (GMT+1) · Q1 2027</span>
      </div>

      <h2 id="opportunities-title" className="opp-title">
        Let&apos;s build something that has to stay up.
      </h2>

      <p className="opp-intro">
        I&apos;m open to backend engineering, platform engineering, and software
        engineering roles — plus technical training, consulting, and collaborations where
        a systems mindset helps.
      </p>

      <div className="opp-grid">
        {engagements.map((item, index) => (
          <div key={item.label} className="opp-item">
            <span className="opp-num font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{item.label}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="opp-fit">
        <p className="label" style={{ marginBottom: 10 }}>
          A good fit if
        </p>
        <ul>
          {fits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="opp-actions">
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
        <a
          href="https://www.linkedin.com/in/halx-docs-633272344"
          target="_blank"
          rel="noreferrer"
          className="email-link"
        >
          LinkedIn
        </a>
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
