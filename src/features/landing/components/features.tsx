import { motion } from 'framer-motion'
import { Activity, Award, BarChart2, Heart, Repeat, Smartphone } from 'lucide-react'


const features = [
  {
    icon: <Activity className="w-8 h-8" />,
    title: 'AI-Powered Workouts',
    description: 'Our algorithm creates personalized workouts that adapt to your progress and goals.'
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Nutrition Planning',
    description: 'Get customized meal plans with macro tracking based on your dietary preferences.'
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    title: 'Progress Analytics',
    description: 'Detailed metrics and visualizations to track your improvement over time.'
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Achievement System',
    description: 'Earn badges and rewards for hitting milestones and staying consistent.'
  },
  {
    icon: <Repeat className="w-8 h-8" />,
    title: 'Adaptive Training',
    description: 'Your plan evolves as you progress, ensuring continuous improvement.'
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: 'Mobile Friendly',
    description: 'Access your plan anywhere with our beautifully designed mobile interface.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Elevate Your <span className="gradient-text">Training</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Gym Buddy combines cutting-edge technology with fitness expertise to deliver unparalleled results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-2xl hover:shadow-lg hover:shadow-orange-500/10 transition-all"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mb-6 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}