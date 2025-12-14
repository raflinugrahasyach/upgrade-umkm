"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, TrendingUp, Bot, Users, BarChart3 } from "lucide-react"
import AuroraUMKM from "./AuroraUMKM"
import Link from "next/link"

const rotatingTexts = ["Omzet", "Skill Bisnis", "Jaringan", "Pengembangan Usaha"]

export default function HeroUMKM() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <AuroraUMKM />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left z-20">
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

            {/* Headline Dinamis (Teks "Anda" akan naik turun otomatis) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#18181B] leading-[1.1] mb-6">
              1 Platform untuk{" "}
              <br className="hidden sm:block" />
              Meningkatkan{" "}
              
              {/* ROTATING TEXT WRAPPER - Tanpa Absolute agar Layout Geser */}
              <div className="block my-1"> 
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ y: 20, opacity: 0, height: 0 }}
                    animate={{ y: 0, opacity: 1, height: "auto" }}
                    exit={{ y: -20, opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="gradient-text inline-block leading-tight pb-2"
                  >
                    {rotatingTexts[currentIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              Anda
            </h1>

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
              <Link href="/register">
                <button className="w-full sm:w-auto gradient-bg text-[#18181B] font-semibold rounded-full px-8 py-4 text-lg glow-gold hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                    Coba Gratis
                    <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="#features">
                <button className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-[#18181B] font-semibold rounded-full px-8 py-4 text-lg border border-gray-200 hover:bg-white transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-sm">
                    <Play className="w-5 h-5" />
                    Pelajari Solusi
                </button>
              </Link>
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

          {/* RIGHT VISUAL (Dashboard BizTrack) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center h-full z-10"
          >
            <div className="relative w-full max-w-lg aspect-square">
              
              {/* Main Card: BizTrack Monitor Preview */}
              <div className="absolute inset-0 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl flex flex-col p-6 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                {/* Header Mockup */}
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-md">
                            <BarChart3 className="w-5 h-5 text-[#18181B]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[#18181B]">Dashboard Analytics</h4>
                            <p className="text-xs text-[#18181B]/50">Real-time Business Insights</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                </div>

                {/* Content: Grafik Bergerak */}
                <div className="flex-1 flex flex-col justify-end">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-xs font-bold text-[#18181B]/40 uppercase tracking-wide">Total Sales</p>
                            <h3 className="text-3xl font-bold text-[#18181B]">Rp 45.2M</h3>
                        </div>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            <TrendingUp className="w-3 h-3"/> +45%
                        </span>
                    </div>
                    
                    {/* Animated Bars */}
                    <div className="flex items-end justify-between h-40 gap-2">
                        {[35, 55, 40, 70, 50, 85, 60, 95].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: "10%" }}
                                animate={{ height: [`${h}%`, `${h - 10}%`, `${h}%`] }}
                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                                className="w-full bg-gradient-to-t from-[#FBC904] to-[#F97316] rounded-t-md opacity-90"
                            />
                        ))}
                    </div>
                </div>
              </div>

              {/* Floating Card 1: AI Status (Kiri Bawah) */}
              <div className="absolute -bottom-8 -left-8 glass bg-white/90 rounded-2xl p-4 shadow-xl animate-float w-48 border border-white/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#18181B]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#18181B]">AI Analysis</div>
                    <div className="text-[10px] text-[#18181B]/60">Processing data...</div>
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-full bg-[#FBC904]"
                    />
                </div>
              </div>

              {/* Floating Card 2: Omzet Naik (POSISI DIPERBAIKI: NAIK KE ATAS LUAR KOTAK UTAMA) */}
              {/* Menggunakan -top-12 agar floating di luar kotak, tidak menutupi isi */}
              <div className="absolute -top-12 -right-8 glass bg-white/90 rounded-2xl p-4 shadow-xl animate-float w-44 border border-white/50" style={{ animationDelay: "1.5s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#18181B]">Omzet Naik</div>
                    <div className="text-xs text-green-600 font-bold">+45% bulan ini</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 3: Komunitas (Kiri Tengah) */}
              <div className="absolute top-1/3 -left-12 glass bg-white/90 rounded-2xl p-4 shadow-xl animate-float w-40 border border-white/50" style={{ animationDelay: "3s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#18181B]">Komunitas</div>
                    <div className="text-[10px] text-[#18181B]/60">5000+ Member</div>
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