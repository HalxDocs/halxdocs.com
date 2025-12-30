import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <section className="bg-white text-black dark:bg-black dark:text-white pt-44 pb-36">
      <div className="mx-auto max-w-3xl px-6">

        {/* Back */}
        <Link
          to="/"
          className="inline-block mb-12 text-sm uppercase tracking-widest text-black/60 dark:text-white/60 hover:underline"
        >
          ← Back to home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Writing
        </h1>

        <p className="mt-6 text-lg text-black/70 dark:text-white/70">
          Thoughts on building products, tools, and systems — from real work.
        </p>

        <div className="mt-20 space-y-12">
          <Link
            to="/blog/why-i-created-jsonstack"
            className="group block"
          >
            <h2 className="text-2xl sm:text-3xl font-medium group-hover:underline">
              Why I created jsonstack.dev
            </h2>

            <p className="mt-3 text-black/60 dark:text-white/60 max-w-xl">
              The real problem I was trying to solve, and why existing tools weren’t enough.
            </p>

            <span className="mt-4 inline-block text-sm uppercase tracking-widest text-black/50 dark:text-white/50">
              Read article →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
