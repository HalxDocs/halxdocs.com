const lanes = [
  {
    label: "Building",
    items: [
      {
        name: "reqit sync boundary",
        note: "Trying to add sync without turning a local-first tool into another account. Not sure it's possible yet.",
        status: "In progress",
      },
      {
        name: "DLQ Inspector adapters",
        note: "More brokers behind the same recovery model. Dry-run first, always.",
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
        name: "HALX-9",
        note: "Early research for a space-tech startup I'm starting. Most of the work is figuring out what has to be true before there's any hardware.",
        status: "Pre-launch",
      },
      {
        name: "CubeSats & subsystems",
        note: "How a small satellite actually stays up: power, thermal, comms, attitude control, and the trade-offs between them.",
        status: "Reading",
      },
      {
        name: "Flight software",
        note: "What runs on the vehicle, how it fails, and how you test it when you can't just restart it.",
        status: "Notes",
      },
      {
        name: "Simulation & mission verification",
        note: "Verifying a mission before launch — the models, the failure cases, and the parts you can only approximate on the ground.",
        status: "Notes",
      },
    ],
  },
  {
    label: "Learning",
    items: [
      {
        name: "Distributed systems",
        note: "Consensus, replication, and the failure modes you only meet under real traffic. Still where most of my time goes.",
        status: "Ongoing",
      },
      {
        name: "Postgres internals",
        note: "MVCC, vacuum, and the query plans I used to guess about.",
        status: "Ongoing",
      },
      {
        name: "Platform engineering",
        note: "Golden paths and developer experience that survive a team growing.",
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
        <span className="now-updated font-mono">Last updated · November 2026</span>
      </div>

      <p className="now-intro">
        What&apos;s on my desk right now. I update this when it stops being true.
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
        HALX-9 is still early and the startup is launching soon. I&apos;ll keep updating
        this as things ship or get dropped.
      </p>
    </section>
  );
}
