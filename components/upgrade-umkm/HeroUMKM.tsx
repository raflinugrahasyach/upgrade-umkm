"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, TrendingUp, Bot, Users } from "lucide-react"
import AuroraUMKM from "./AuroraUMKM"

const rotatingTexts = ["Omzet", "Skill Bisnis", "Jaringan", "Pengembangan Usaha"]

export function HeroUMKM() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <AuroraUMKM />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 text-sm font-medium mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full gradient-bg mr-2 animate-pulse"></span>
              <span className="text-[#18181B]">Platform AI untuk UMKM Indonesia</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#18181B] leading-[1.1] mb-6"
            >
              1 Platform untuk{" "}
              <br className="hidden sm:block" />
              Meningkatkan{" "}
              <span className="relative inline-block min-w-[200px] sm:min-w-[280px] lg:min-w-[360px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="gradient-text inline-block"
                  >
                    {rotatingTexts[currentIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              Anda
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#18181B]/70 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Platform berbasis Artificial Intelligence untuk analisis pasar, kelola stok, 
              dan pendampingan bisnis otomatis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="gradient-bg text-[#18181B] font-semibold rounded-full px-8 py-4 text-lg glow-gold hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                Coba Gratis
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/80 backdrop-blur-sm text-[#18181B] font-semibold rounded-full px-8 py-4 text-lg border border-gray-200 hover:bg-white transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-sm">
                <Play className="w-5 h-5" />
                Pelajari Solusi
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">5000+</div>
                <div className="text-sm text-[#18181B]/60">UMKM Terdaftar</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">98%</div>
                <div className="text-sm text-[#18181B]/60">Kepuasan</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-[#18181B]/60">AI Support</div>
              </div>
            </motion.div>
          </div>

          {/* Right - Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Main Card */}
              <div className="absolute inset-0 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full gradient-bg flex items-center justify-center shadow-xl">
                    <TrendingUp className="w-16 h-16 text-[#18181B]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[#18181B]/60 text-lg font-medium">Dashboard Analytics</p>
                  <p className="text-[#18181B]/40 text-sm mt-1">Real-time Business Insights</p>
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#18181B]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#18181B]">Omzet Naik</div>
                    <div className="text-sm text-green-600 font-medium">+45% bulan ini</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#18181B]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#18181B]">AI Analysis</div>
                    <div className="text-sm text-[#18181B]/60">Aktif 24/7</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 3 */}
              <div className="absolute top-1/2 -right-8 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#18181B]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#18181B]">Komunitas</div>
                    <div className="text-sm text-[#18181B]/60">5000+ member</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
