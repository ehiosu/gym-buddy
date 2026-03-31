'use client'
import { motion } from 'framer-motion'
import { CalendarDays, Dumbbell, Flame, SaladIcon, Target, Timer } from 'lucide-react'
import { useState } from 'react'

const features = [
  {
    icon: Dumbbell,
    tag: 'Routines',
    title: 'AI Routine Builder',
    description:
      'Enter your goal, how many days a week you can train, and your fitness level. Gym Buddy generates a structured, week-by-week exercise plan — no template hunting required.',
  },
  {
    icon: Timer,
    tag: 'Workout',
    title: 'Live Workout Mode',
    description:
      'Follow exercises one at a time with animated GIFs and a running timer. Close the tab mid-session and it picks up exactly where you left off.',
  },
  {
    icon: Target,
    tag: 'Goals',
    title: 'Goal Tracking',
    description:
      'Set targets for weight, weekly sessions, daily water intake, sleep, and steps. Log records over time and watch the numbers move.',
  },
  {
    icon: SaladIcon,
    tag: 'Nutrition',
    title: 'Diet Planning',
    description:
      'Get an AI-generated meal plan with a calorie target and macro breakdown based on your body stats and training goal. No calorie counting app needed.',
  },
  {
    icon: CalendarDays,
    tag: 'Schedule',
    title: "Today's Schedule",
    description:
      "See which exercises are lined up for today based on your active routine. Open the app and know exactly what to do — no digging through plans.",
  },
  {
    icon: Flame,
    tag: 'Profile',
    title: 'Weight Onboarding',
    description:
      'Current weight and target weight are captured at signup and stored against your profile — so your diet and goal recommendations are personalised from day one.',
  },
]

export default function Features() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-sm font-medium text-orange-500 uppercase tracking-widest mb-3">
              What&apos;s inside
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Everything in one dashboard
            </h2>
          </div>
          <p className="text-gray-500 md:text-right md:max-w-xs text-sm leading-relaxed">
            Six features that actually work together, not six tabs you forget to open.
          </p>
        </motion.div>

        {/* Ruled list */}
        <div className="border-t border-white/10">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isHovered = hovered === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="group border-b border-white/10 py-7 grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_2fr_auto] gap-x-6 gap-y-2 items-start cursor-default transition-colors hover:border-orange-500/20"
              >
                {/* Number */}
                <span className="text-sm tabular-nums text-gray-600 group-hover:text-orange-500 transition-colors pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Title + tag */}
                <div>
                  <h3 className="text-lg font-semibold leading-snug group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  <span className="inline-block mt-1.5 text-xs text-gray-500 border border-gray-700 rounded-full px-2 py-0.5 group-hover:border-orange-500/30 group-hover:text-orange-500/70 transition-colors">
                    {feature.tag}
                  </span>
                </div>

                {/* Description */}
                <p className="col-start-2 md:col-start-3 text-gray-400 text-sm leading-relaxed md:pt-0.5">
                  {feature.description}
                </p>

                {/* Icon */}
                <div className="hidden md:flex items-start pt-1">
                  <motion.div
                    animate={{ scale: isHovered ? 1 : 0.85, opacity: isHovered ? 1 : 0.25 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="text-orange-400"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
