import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <h1 className="text-9xl font-bold text-black dark:text-white mb-4">
            404
          </h1>

          {/* Message */}
          <h2 className="text-3xl font-semibold text-black dark:text-white mb-4">
            Page not found
          </h2>

          <p className="text-lg text-black/70 dark:text-white/70 mb-8">
            Sorry, we couldn't find the page you're looking for. Perhaps you've
            mistyped the URL or the page has been moved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium transition hover:scale-[1.04]"
            >
              Go back home
            </Link>

            <a
              href="mailto:halxdocs@gmail.com"
              className="px-8 py-4 rounded-full border border-black/40 dark:border-white/40 text-black dark:text-white font-medium transition hover:bg-black/10 dark:hover:bg-white/10"
            >
              Contact support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}