"use client"

import { motion } from "framer-motion"
import { BarChart3, BookOpen, Target, Network, Video, ArrowRight } from "lucide-react"
import Link from "next/link"; // Jangan lupa import Link agar bisa diklik

const features = [
  {
    id: "biztrack",
    icon: BarChart3,
    title: "BizTrack Monitor",
    description: "Pantau kinerja bisnis real-time dengan Business Intelligence Tools",
    large: true,
    gradient: "from-[#FBC904]/20 to-[#F97316]/20",
    href: "/products/biztrack" // Link aktif
  },
  {
    id: "bizguide",
    icon: BookOpen,
    title: "BizGuide Pro",
    description: "Pendampingan personal UMKM",
    large: false,
    gradient: "from-blue-50 to-indigo-50",
    href: "/products/bizguide"
  },
  {
    id: "skillboost",
    icon: Target,
    title: "SkillBoost Pro",
    description: "Pelatihan dengan waktu fleksibel",
    large: false,
    gradient: "from-green-50 to-emerald-50",
    href: "/products/skillboost"
  },
  {
    id: "bizconnect",
    icon: Network,
    title: "BizConnect Hub",
    description: "Jaringan dan kolaborasi UMKM",
    large: false,
    gradient: "from-purple-50 to-pink-50",
    href: "/products/bizconnect"
  },
  {
    id: "bizlive",
    icon: Video,
    title: "BizLive Insight",
    description: "Webinar dan live session",
    large: false,
    gradient: "from-orange-50 to-red-50",
    href: "/events"
  }
]

export default function FeaturesUMKM() {
  return (
    <section className="py-20 lg:py-32 bg-[#FAFAFA]" id="features">
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
            Ekosistem <span className="gradient-text">Lengkap</span>
          </h2>
          <p className="text-lg text-[#18181B]/60 max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk mengembangkan bisnis dalam satu platform
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Feature - BizTrack Monitor */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#FBC904]/10 to-[#F97316]/10 rounded-3xl p-8 lg:p-10 border border-[#FBC904]/20 card-hover group cursor-pointer"
          >
            <Link href="/products/biztrack" className="flex flex-col lg:flex-row gap-8 items-center h-full">
              <div className="flex-1 text-left">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <BarChart3 className="w-7 h-7 text-[#18181B]" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#18181B] mb-3">BizTrack Monitor</h3>
                <p className="text-[#18181B]/60 text-lg mb-6 leading-relaxed">
                  Pantau kinerja bisnis real-time dengan Business Intelligence Tools. 
                  Dapatkan insights mendalam tentang penjualan, keuangan, dan operasional.
                </p>
                <div className="inline-flex items-center gap-2 text-[#18181B] font-bold hover:gap-3 transition-all">
                  Pelajari Lebih Lanjut <ArrowRight className="w-5 h-5"/>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                {/* Mock Chart BizTrack */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-white/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-xs font-bold uppercase text-[#18181B]/40 tracking-wider">Total Revenue</span>
                        <h4 className="text-lg font-bold text-[#18181B]">Rp 45.2M</h4>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">+45%</span>
                  </div>
                  <div className="flex items-end gap-2 h-32 pt-4 border-t border-gray-100">
                    {[40, 65, 45, 80, 55, 90, 75, 95].map((height, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-[#FBC904] to-[#F97316] opacity-80 hover:opacity-100 transition-opacity"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-[#18181B]/40 font-medium">
                    <span>Jan</span>
                    <span>Jun</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other Features */}
          {features.slice(1).map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
              className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-6 lg:p-8 border border-gray-100 card-hover group cursor-pointer`}
            >
              <Link href={feature.href} className="block h-full">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                  <feature.icon className="w-6 h-6 text-[#18181B]" />
                </div>
                <h3 className="text-xl font-bold text-[#18181B] mb-2">{feature.title}</h3>
                <p className="text-[#18181B]/60 text-sm leading-relaxed mb-4">{feature.description}</p>
                <div className="text-xs font-bold text-[#18181B] flex items-center gap-1 group-hover:gap-2 transition-all opacity-0 group-hover:opacity-100">
                    Explore <ArrowRight className="w-3 h-3"/>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}