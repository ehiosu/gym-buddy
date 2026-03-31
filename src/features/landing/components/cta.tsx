import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass border border-white/10 rounded-3xl px-8 py-16 md:px-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Your plan is one signup away
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            No spreadsheets. No generic PDFs. Just a routine that fits your schedule and goals — built in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
            >
              Build my plan — free
            </Link>
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-700 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition-colors"
            >
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
