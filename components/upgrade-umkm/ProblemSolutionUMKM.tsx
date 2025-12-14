"use client"

import { motion } from "framer-motion"
import { X, Check, TrendingDown, TrendingUp, AlertCircle, BarChart3, Users, Lightbulb } from "lucide-react"

const problems = [
  {
    icon: TrendingDown,
    title: "Boncos Iklan",
    description: "Budget marketing habis tanpa hasil yang terukur"
  },
  {
    icon: AlertCircle,
    title: "Buta Data",
    description: "Tidak tahu performa bisnis secara real-time"
  },
  {
    icon: Lightbulb,
    title: "Gaptek",
    description: "Kesulitan mengadopsi teknologi digital"
  }
]

const solutions = [
  {
    icon: BarChart3,
    title: "Analisis AI",
    description: "AI menganalisis data bisnis dan memberikan rekomendasi"
  },
  {
    icon: TrendingUp,
    title: "Monitoring Real-time",
    description: "Dashboard lengkap untuk pantau performa bisnis"
  },
  {
    icon: Users,
    title: "Pendampingan Ahli",
    description: "Mentor bisnis siap membantu kapan saja"
  }
]

export function ProblemSolutionUMKM() {
  return (
    <section className="py-20 lg:py-32 bg-white" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] mb-4">
            Tantangan UMKM vs <span className="gradient-text">Solusi Kami</span>
          </h2>
          <p className="text-lg text-[#18181B]/60 max-w-2xl mx-auto">
            Kami memahami tantangan yang dihadapi UMKM dan hadir dengan solusi yang tepat
          </p>
        </motion.div>

        {/* Split Screen Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Problems Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 lg:p-10 border border-red-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-[#18181B]">Tantangan UMKM</h3>
            </div>

            <div className="space-y-6">
              {problems.map((problem, index) => (
                <motion.div 
                  key={problem.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-red-100/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <problem.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#18181B] mb-1">{problem.title}</h4>
                    <p className="text-sm text-[#18181B]/60">{problem.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 lg:p-10 border border-yellow-200"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                <Check className="w-5 h-5 text-[#18181B]" />
              </div>
              <h3 className="text-xl font-bold text-[#18181B]">Solusi Upgrade UMKM</h3>
            </div>

            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div 
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-yellow-200/50 card-hover"
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                    <solution.icon className="w-6 h-6 text-[#18181B]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#18181B] mb-1">{solution.title}</h4>
                    <p className="text-sm text-[#18181B]/60">{solution.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
