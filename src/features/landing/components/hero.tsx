import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-orange-500 uppercase tracking-widest mb-4"
        >
          AI-powered fitness tracking
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-[1.05] tracking-tight"
        >
          Stop guessing.<br />
          <span className="gradient-text">Start training.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed"
        >
          Tell Gym Buddy your goal, schedule, and fitness level. It builds your
          workout plan, tracks your progress, and keeps your nutrition on point —
          all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/25"
          >
            Create your plan — free
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition-colors"
          >
            See what it does
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3"
        >
          {[
            'No manual workout logging',
            'AI routine built in seconds',
            'Tracks weight, sleep, water & steps',
          ].map((point) => (
            <span key={point} className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
              {point}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
