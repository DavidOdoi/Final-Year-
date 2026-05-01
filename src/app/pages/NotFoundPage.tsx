import { ArrowRight, Compass, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7EFE9] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-2xl"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F7EFE9] text-[#D4A373]">
          <Compass className="h-10 w-10" />
        </div>
        <div className="mt-6 text-sm uppercase tracking-[0.25em] text-[#D4A373]">404</div>
        <h1 className="mt-3 text-4xl text-[#4B2E2B]">Page Not Found</h1>
        <p className="mt-4 text-sm text-[#4B2E2B]/70">
          This route does not exist anymore or the link was incomplete. You can head back home or continue through the
          driver entry pages below.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#4B2E2B] px-4 py-4 text-sm text-white"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>

          <Link
            to="/driver"
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#4B2E2B]/10 bg-[#F7EFE9] px-4 py-4 text-sm text-[#4B2E2B]"
          >
            <span>Driver Access</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
