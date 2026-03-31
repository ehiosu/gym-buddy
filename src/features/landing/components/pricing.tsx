import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

const included = [
  'AI-generated workout routines',
  'Live workout mode with exercise GIFs',
  'Goal tracking — weight, sleep, water, steps, sessions',
  'AI-generated meal plans with macro breakdown',
  "Today's schedule view",
  'Weight and progress history',
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 max-w-xl"
        >
          <p className="text-sm font-medium text-orange-500 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Free. No catch.
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Gym Buddy is free to use. No trial period, no credit card, no feature gating.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl rounded-2xl border border-orange-500/30 overflow-hidden"
        >
          <div className="p-8 bg-gray-900/60">
            <div className="flex items-end gap-2 mb-1">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-gray-400 mb-1.5">/ forever</span>
            </div>
            <p className="text-gray-500 text-sm mb-8">Everything included. No tiers.</p>

            <ul className="space-y-3 mb-8">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check className="text-orange-500 mt-0.5 shrink-0 w-4 h-4" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/auth/signup"
              className="inline-flex w-full items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Get started
            </Link>
          </div>

          <div className="px-8 py-4 bg-orange-500/5 border-t border-orange-500/10">
            <p className="text-sm text-gray-500">
              Built with Next.js, Convex, and the RapidAPI AI Workout Planner.
              Open for inspection on{' '}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
