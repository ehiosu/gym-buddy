import { motion } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'


const plans = [
  {
    name: 'Starter',
    price: '0',
    period: 'month',
    features: [
      'Basic workout plans',
      'Limited diet recommendations',
      'Progress tracking (30 days)',
      'Community support'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '14.99',
    period: 'month',
    features: [
      'Advanced workout plans',
      'Full diet recommendations',
      'Unlimited progress tracking',
      'Priority support',
      'Weekly check-ins',
      'Exercise library'
    ],
    cta: 'Go Pro',
    popular: true
  },
  {
    name: 'Elite',
    price: '29.99',
    period: 'month',
    features: [
      'All Pro features',
      '1-on-1 coaching sessions',
      'Custom meal plans',
      'Video exercise library',
      '24/7 support',
      'Advanced analytics',
      'Priority feature requests'
    ],
    cta: 'Become Elite',
    popular: false
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the plan that fits your fitness journey. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl overflow-hidden border ${
                plan.popular 
                  ? 'border-orange-500 shadow-lg shadow-orange-500/20' 
                  : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-8 bg-gray-900/50">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {plan.popular && <Star className="ml-2 text-orange-400" />}
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-bold mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {plan.cta}
                </motion.button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`px-6 py-4 ${
                plan.popular ? 'bg-orange-500/10' : 'bg-gray-800/50'
              }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {plan.popular ? 'Priority onboarding' : 'Standard support'}
                  </span>
                  {plan.popular ? (
                    <Zap className="text-orange-400 animate-pulse" />
                  ) : (
                    <Check className="text-gray-500" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Need something custom?</p>
          <button className="px-6 py-3 border border-gray-700 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-all">
            Contact Us for Enterprise Solutions
          </button>
        </motion.div>
      </div>
    </section>
  )
}