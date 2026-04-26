import { Link } from "react-router-dom";

export default function SymphonyPost() {
  return (
    <article
      className="pt-36 pb-32"
      style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8">

        <Link
          to="/blog"
          className="font-mono inline-flex items-center gap-2 mb-12 hover:text-white transition-colors"
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--text-muted)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All writing
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--accent)",
              fontWeight: 600,
            }}
          >
            Build Story
          </span>
          <span style={{ width: 12, height: 1, background: "var(--border)", display: "block" }} />
          <span className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            2025
          </span>
        </div>

        <h1
          className="font-display mb-12"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--text)",
          }}
        >
          I Built a Digital Wedding Invitation App in a Week — Here's What Happened
        </h1>

        <Prose>
          <p>It started with a conversation.</p>
          <p>
            Someone in my circle was planning their wedding. They'd sorted the hall, the caterer, the aso-ebi.
            Everything was in order. Then they asked me to help them send out invitations — and what they
            handed me was a JPEG. A blurry, screenshot-of-a-screenshot image they were going to drop in a
            WhatsApp group and hope people saved it.
          </p>
          <p>I told them there had to be a better way. They said, 'then build it.'</p>
          <p>So I did.</p>

          <H2>The Idea</H2>
          <p>
            The brief was simple: a digital wedding invitation that guests could open on their phone, that
            looked like an actual invitation, and that let them RSVP without sending a message to a group chat.
          </p>
          <p>
            I wanted it to feel like an event. Opening an envelope, seeing your name, being invited to
            something that mattered. Not just a form.
          </p>
          <p>I called it Symphony.</p>

          <H2>The Stack</H2>
          <p>
            I went with React + Vite + Tailwind CSS for the frontend. Fast to build, fast to ship. For the
            backend — or rather, the real-time layer — I used Firebase Firestore. I didn't need a full server.
            I needed RSVPs to show up live on a dashboard, and Firestore was perfect for that.
          </p>
          <p>Hosting: Vercel. Custom domain setup took about ten minutes.</p>

          <H2>The Features</H2>
          <p>Here's what I ended up shipping:</p>
          <p>
            <strong>The envelope animation.</strong> This was the part I spent the most time on. When a guest
            opens their link, they see a closed envelope. It animates open and the invitation slides out.
            Getting it to feel right — the timing, the easing, the way the flap lifts — took longer than I
            expected. But it was worth it. Every person who tested it smiled.
          </p>
          <p>
            <strong>Shareable guest links.</strong> Each guest gets their own unique URL. The link opens their
            personalised invite — their name is on it. It's a small thing that makes a big difference.
          </p>
          <p>
            <strong>WhatsApp sharing.</strong> I'm not naive. Nigerians use WhatsApp for everything. So I added
            a share button that pre-composes a WhatsApp message with the guest's link.
          </p>
          <p>
            <strong>RSVP flow.</strong> Guests RSVP directly on the page. No group chat. No forwarded
            screenshots. Just a clean form and a confirmation.
          </p>
          <p>
            <strong>Live admin dashboard.</strong> The couple sees every RSVP in real time. Who's coming, who's
            not, who hasn't responded. Password protected. Simple to use.
          </p>
          <p>
            <strong>CSV export.</strong> One click exports the full guest list as a CSV for the wedding
            planner.
          </p>

          <H2>What I Learned</H2>
          <p>
            <strong>HashRouter over BrowserRouter for Vercel.</strong> I ran into a classic issue — deep links
            weren't working on refresh because Vercel was trying to route them server-side. Switching to
            HashRouter fixed it immediately.
          </p>
          <p>
            <strong>Animation timing is a craft.</strong> The difference between an animation that feels cheap
            and one that feels considered is about 20 minutes of tweaking easing curves and duration values.
          </p>
          <p>
            <strong>Firebase is genuinely fast for this use case.</strong> Real-time RSVPs showing up on the
            dashboard without a page refresh — Firestore handled it effortlessly.
          </p>
          <p>
            <strong>Build for where your users actually are.</strong> Adding WhatsApp sharing wasn't in the
            original plan. I added it because I knew Nigerian users would try to share via WhatsApp anyway.
          </p>

          <H2>The Result</H2>
          <p>
            The wedding happened. The invitations went out via Symphony. Every RSVP was tracked. The couple
            knew exactly who was coming before the day. No group chat chaos.
          </p>
          <p>
            I built this in about a week of evenings. It's not a complex technical project — but it solves a
            real problem for a real audience, and it works.
          </p>
          <p>
            If you're getting married — or know someone who is — and you want an invitation that actually
            matches the occasion, DM me. I'll set it up for you.
          </p>

          <p style={{ marginTop: 32, fontWeight: 600, color: "var(--text)" }}>— HalxDocs</p>
        </Prose>

      </div>
    </article>
  );
}

function H2({ children }) {
  return (
    <h2
      className="font-display"
      style={{
        fontSize: "clamp(24px, 3vw, 32px)",
        fontWeight: 500,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        color: "var(--text)",
        marginTop: 56,
        marginBottom: 20,
      }}
    >
      {children}
    </h2>
  );
}

function Prose({ children }) {
  return (
    <div
      style={{
        fontSize: "17px",
        lineHeight: 1.8,
        color: "var(--text-muted)",
      }}
      className="prose-content"
    >
      {children}
      <style>{`
        .prose-content > p {
          margin-bottom: 1.4em;
        }
        .prose-content strong {
          color: var(--text);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
