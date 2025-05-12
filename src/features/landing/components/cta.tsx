import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'


export default function CTA() {
  return (
    <section id="cta" className="relative py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-5"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-5"></div>
          
          <div className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Ready to Transform Your <span className="gradient-text">Fitness Journey</span>?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
              >
                Join thousands of users who achieved their fitness goals with Gym Buddy. Start your risk-free trial today.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center"
                >
                  Start 7-Day Free Trial <ArrowRight className="ml-2" />
                </motion.button>
                
                <button className="px-8 py-4 border border-gray-700 text-gray-300 rounded-xl font-bold hover:border-orange-500 hover:text-orange-500 transition-all flex items-center justify-center">
                  See How It Works
                </button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4"
              >
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="text-green-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="text-green-500 mr-2" />
                  Cancel anytime
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <CheckCircle className="text-green-500 mr-2" />
                  14-day money back guarantee
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}