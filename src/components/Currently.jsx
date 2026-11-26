const lanes = [
  {
    label: "Building",
    items: [
      {
        name: "reqit sync boundary",
        note: "A sync design that does not turn a local-first tool into another hosted account.",
        status: "In progress",
      },
      {
        name: "DLQ Inspector adapters",
        note: "More brokers behind the same recovery model. Dry-run stays the default.",
        status: "Prototyping",
      },
      {
        name: "This portfolio",
        note: "Case studies, live metrics, and a guestbook backed by a real Go service.",
        status: "Shipping",
      },
    ],
  },
  {
    label: "Researching",
    items: [
      {
        name: "Raft membership changes",
        note: "What happens when cluster configuration changes while the cluster is already unstable.",
        status: "Reading",
      },
      {
        name: "Idempotency key design",
        note: "Keys that survive retries, replays, and an impatient operator at 2am.",
        status: "Notes",
      },
      {
        name: "Backpressure",
        note: "Why a fast producer is a design problem, not a queue setting.",
        status: "Notes",
      },
    ],
  },
  {
    label: "Learning",
    items: [
      {
        name: "Postgres internals",
        note: "MVCC, vacuum, and the query plans I used to guess about.",
        status: "Ongoing",
      },
      {
        name: "Platform engineering",
        note: "Golden paths, operators, and developer experience that survives a growing team.",
        status: "Ongoing",
      },
      {
        name: "Go performance",
        note: "Allocations, escape analysis, and profiling without superstition.",
        status: "Ongoing",
      },
    ],
  },
];

export default function Currently() {
  return (
    <section className="now-section" aria-labelledby="currently-title">
      <div className="now-head">
        <div>
          <p className="label" style={{ marginBottom: 8 }}>
            Now
          </p>
          <h2 id="currently-title" className="now-title">
            Currently working on
          </h2>
        </div>
        <span className="now-updated font-mono">Updated · November 2026</span>
      </div>

      <p className="now-intro">
        A living snapshot of what is on the bench — shipped work, open questions, and the
        things I am learning on purpose.
      </p>

      <div className="now-lanes">
        {lanes.map((lane, laneIndex) => (
          <div key={lane.label} className="now-lane">
            <div className="now-lane-label">
              <span className="now-lane-num font-mono">
                {String(laneIndex + 1).padStart(2, "0")}
              </span>
              <span>{lane.label}</span>
            </div>

            <div className="now-items">
              {lane.items.map((item) => (
                <div key={item.name} className="now-item">
                  <div className="now-item-line">
                    <span className="now-dot" aria-hidden="true" />
                    <span className="now-item-name">{item.name}</span>
                    <span className="now-status font-mono">{item.status}</span>
                  </div>
                  <p className="now-item-note">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="now-foot">
        The through-line: reliability is a feature, not a phase.
      </p>
    </section>
  );
}
