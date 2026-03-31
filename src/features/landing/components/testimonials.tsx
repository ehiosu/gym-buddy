import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Sign up with your stats',
    description:
      'Enter your current weight, target weight, and create an account. That data lives on your profile and feeds into every recommendation Gym Buddy makes.',
  },
  {
    number: '02',
    title: 'Generate your routine',
    description:
      'Pick your goal (strength, fat loss, endurance), set your weekly availability, and hit generate. An AI workout plan drops in seconds — exercises, sets, reps, the lot.',
  },
  {
    number: '03',
    title: 'Set goals that matter to you',
    description:
      'Choose from weight, sessions per week, daily water, sleep hours, or step count. Set a target, then log progress whenever you hit a milestone.',
  },
  {
    number: '04',
    title: 'Train with the app open',
    description:
      "Open today's schedule, tap Start Workout, and follow along. The timer runs, GIFs show the movement, and your progress auto-saves every few seconds.",
  },
]

export default function HowItWorks() {
  return (
    <section id="testimonials" className="py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 max-w-xl"
        >
          <p className="text-sm font-medium text-orange-500 uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            From signup to first session in under five minutes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <span className="text-4xl font-bold text-orange-500/20 leading-none select-none tabular-nums shrink-0">
                {step.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
