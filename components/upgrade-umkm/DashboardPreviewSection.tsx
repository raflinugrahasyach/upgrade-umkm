"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight } from "lucide-react";

export default function DashboardPreviewSection() {
  return (
    <section className="py-24 bg-zinc-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/20 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            Real-time Business Intelligence
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Satu Dashboard untuk <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Semua Data</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Pantau penjualan, stok, dan performa karyawan dalam satu layar. AI kami mengolah data mentah menjadi strategi bisnis yang actionable.
          </motion.p>
        </div>

        {/* MOCKUP DASHBOARD */}
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-800/50 backdrop-blur-xl border border-zinc-700 rounded-3xl p-6 md:p-8 shadow-2xl max-w-5xl mx-auto"
        >
            {/* Header Mockup */}
            <div className="flex justify-between items-center mb-8 border-b border-zinc-700 pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"/>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                    <div className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <div className="bg-zinc-900 px-4 py-1 rounded-full text-xs text-zinc-500 font-mono">
                    biztrack_monitor_v2.0.exe
                </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Revenue", val: "Rp 145.2M", icon: DollarSign, color: "text-green-400", trend: "+12%" },
                    { label: "Active Customers", val: "2,450", icon: Users, color: "text-blue-400", trend: "+5%" },
                    { label: "Products Sold", val: "856", icon: Activity, color: "text-orange-400", trend: "+8%" },
                    { label: "Net Profit", val: "Rp 42.8M", icon: TrendingUp, color: "text-purple-400", trend: "+15%" },
                ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-700/50 hover:border-orange-500/30 transition-colors group">
                        <div className="flex justify-between items-start mb-2">
                            <stat.icon className={`w-5 h-5 ${stat.color}`}/>
                            <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                                {stat.trend} <ArrowUpRight className="w-3 h-3"/>
                            </span>
                        </div>
                        <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider">{stat.label}</p>
                        <p className="text-xl md:text-2xl font-bold text-white mt-1 group-hover:scale-105 transition-transform origin-left">{stat.val}</p>
                    </div>
                ))}
            </div>

            {/* Chart Area (Dummy Visual) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-zinc-900/50 rounded-2xl p-6 border border-zinc-700/50 relative overflow-hidden">
                    <h4 className="text-white font-bold mb-4">Grafik Penjualan Bulanan</h4>
                    {/* Visualisasi Grafik Batang CSS */}
                    <div className="flex items-end justify-between h-48 gap-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((h, i) => (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: i * 0.05 }}
                                className="w-full bg-gradient-to-t from-orange-600 to-yellow-500 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-700/50">
                    <h4 className="text-white font-bold mb-4">Produk Terlaris</h4>
                    <div className="space-y-4">
                        {[
                            { name: "Kopi Gula Aren", pct: 85, color: "bg-orange-500" },
                            { name: "Red Velvet Latte", pct: 65, color: "bg-pink-500" },
                            { name: "Croissant", pct: 45, color: "bg-yellow-500" },
                            { name: "Manual Brew", pct: 30, color: "bg-blue-500" },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-zinc-300">{item.name}</span>
                                    <span className="text-white font-bold">{item.pct}%</span>
                                </div>
                                <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.pct}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        className={`h-full ${item.color}`} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}