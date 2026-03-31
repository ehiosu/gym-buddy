import { motion } from 'framer-motion'
import { CalendarDays, Dumbbell, Flame, SaladIcon, Target, Timer } from 'lucide-react'

const features = [
  {
    icon: <Dumbbell className="w-6 h-6" />,
    title: 'AI Routine Builder',
    description:
      'Enter your goal, how many days a week you can train, and your fitness level. Gym Buddy generates a structured, week-by-week exercise plan — no template hunting required.',
  },
  {
    icon: <Timer className="w-6 h-6" />,
    title: 'Live Workout Mode',
    description:
      'Follow exercises one at a time with animated GIFs and a running timer. Close the tab mid-session and it picks up exactly where you left off.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Goal Tracking',
    description:
      'Set targets for weight, weekly sessions, daily water intake, sleep, and steps. Log records over time and watch the numbers move.',
  },
  {
    icon: <SaladIcon className="w-6 h-6" />,
    title: 'Diet Planning',
    description:
      'Get an AI-generated meal plan with a calorie target and macro breakdown based on your body stats and training goal. No calorie counting app needed.',
  },
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: "Today's Schedule",
    description:
      "See which exercises are lined up for today based on your active routine. Open the app and know exactly what to do — no digging through plans.",
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: 'Weight Onboarding',
    description:
      'Current weight and target weight are captured at signup and stored against your profile — so your diet and goal recommendations are personalised from day one.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 max-w-xl"
        >
          <p className="text-sm font-medium text-orange-500 uppercase tracking-widest mb-3">
            What%apos;s inside
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Everything in one dashboard
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Six features that actually work together, not six tabs you forget to open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="glass p-7 rounded-2xl border border-white/5 hover:border-orange-500/20 transition-colors group"
            >
              <div className="w-11 h-11 flex items-center justify-center bg-orange-500/10 rounded-xl mb-5 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
