import { AlertTriangle, ArrowRight, Home, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export default function RouteErrorPage() {
  const error = useRouteError();

  const title = isRouteErrorResponse(error)
    ? error.status === 404
      ? 'Page Not Found'
      : `Error ${error.status}`
    : 'Something Went Wrong';

  const description = isRouteErrorResponse(error)
    ? error.status === 404
      ? 'The page you tried to open could not be found. You can return home or continue through the driver flow below.'
      : error.statusText || 'The app hit an unexpected routing error.'
    : error instanceof Error
      ? error.message
      : 'The app hit an unexpected error while loading this page.';

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7EFE9] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl rounded-[2rem] bg-white p-8 shadow-2xl"
      >
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-amber-100 p-4 text-amber-700">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="text-sm uppercase tracking-[0.25em] text-[#D4A373]">ELOGISTICA</div>
            <h1 className="mt-3 text-4xl text-[#4B2E2B]">{title}</h1>
            <p className="mt-4 text-sm text-[#4B2E2B]/70">{description}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#4B2E2B] px-4 py-4 text-sm text-white"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Link
            to="/driver/login"
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#4B2E2B]/10 bg-[#F7EFE9] px-4 py-4 text-sm text-[#4B2E2B]"
          >
            <LogIn className="h-4 w-4" />
            <span>Driver Login</span>
          </Link>

          <Link
            to="/driver/register"
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#D4A373]/30 bg-[#FFF5EB] px-4 py-4 text-sm text-[#4B2E2B]"
          >
            <UserPlus className="h-4 w-4" />
            <span>Driver Register</span>
          </Link>
        </div>

        <Link
          to="/driver"
          className="mt-5 inline-flex items-center gap-2 text-sm text-[#4B2E2B] transition-colors hover:text-[#D4A373]"
        >
          <span>Open driver access</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
