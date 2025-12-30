import { Link } from "react-router-dom";

export default function WhyJsonstack() {
  return (
    <article className="bg-white text-black dark:bg-black dark:text-white pt-44 pb-36">
      <div className="mx-auto max-w-3xl px-6">

        {/* Back */}
        <Link
          to="/"
          className="inline-block mb-12 text-sm uppercase tracking-widest text-black/60 dark:text-white/60 hover:underline"
        >
          ← Back to home
        </Link>

        <header>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
            Why I created jsonstack.dev
          </h1>

          <p className="mt-6 text-black/60 dark:text-white/60">
            A real story about friction, tooling, and building something I actually needed.
          </p>
        </header>

        <div className="mt-16 space-y-10 text-lg leading-relaxed text-black/80 dark:text-white/80">

          <p>
            jsonstack.dev didn’t start as a startup idea.
            It started as frustration.
          </p>

          <p>
            I was working with large JSON files — configs, API responses,
            deeply nested objects — and every tool I tried either broke,
            froze, or became unreadable once the file crossed a certain size.
          </p>

          <p>
            Formatting was slow. Searching was painful.
            Editing anything complex felt risky.
          </p>

          <p>
            Most tools were built for “small JSON use cases” — not
            real-world, production-level data.
          </p>

          <p>
            So instead of forcing my workflow to fit existing tools,
            I decided to build one that fit how I actually work.
          </p>

          <h2 className="text-2xl font-semibold pt-6">
            The goal was simple
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Handle very large JSON files without crashing</li>
            <li>Make deeply nested data readable</li>
            <li>Allow safe editing without breaking structure</li>
            <li>Stay fast, even as files grow</li>
          </ul>

          <p>
            That’s how jsonstack.dev was born.
          </p>

          <p className="pt-10 text-black/60 dark:text-white/60">
            — HalxDocs
          </p>

        </div>

      </div>
    </article>
  );
}
