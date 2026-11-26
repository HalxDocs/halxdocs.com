const engagements = [
  {
    label: "Backend engineering",
    description:
      "Go or TypeScript services, APIs, queues, and the data model underneath. I like the reliability work most people skip.",
  },
  {
    label: "Platform engineering",
    description:
      "Internal tools, CI/CD, and observability. I care about the parts that quietly make a team slower.",
  },
  {
    label: "Software engineering",
    description:
      "Product work from schema to shipped UI. I'm comfortable owning the whole thing when the team is small.",
  },
  {
    label: "Technical training",
    description:
      "Practical Go, backend fundamentals, or distributed systems for a team, cohort, or classroom.",
  },
  {
    label: "Consulting",
    description:
      "Architecture reviews, incident write-ups, and scaling audits. You get a written decision, not a slide deck.",
  },
  {
    label: "Collaborations",
    description:
      "Open-source, research, or a product that needs a backend person for a season.",
  },
];

const fits = [
  "You have a backend that needs to survive real traffic.",
  "You're turning a prototype into a product and want the foundations right.",
  "You want someone who thinks about failure before it happens.",
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
        Hire me, or bring me in for a season.
      </h2>

      <p className="opp-intro">
        I&apos;m looking for backend engineering, platform engineering, and software
        engineering roles. I also take on technical training, consulting, and
        collaborations when the problem is interesting enough.
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
