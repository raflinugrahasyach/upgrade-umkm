"use client";

import { useState } from "react";
import { 
  ArrowLeft, CheckCircle2, Star, Calendar, MessageSquare, 
  User, Briefcase, Clock, Search, ShieldCheck 
} from "lucide-react";
import Link from "next/link";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";
import { motion } from "framer-motion";

const MENTORS = [
  { id: 1, name: "Budi Santoso, MBA", role: "Business Strategy Expert", exp: "15 Tahun", rating: 4.9, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi", tags: ["Strategi", "Manajemen"] },
  { id: 2, name: "Siti Aminah", role: "Digital Marketing Specialist", exp: "8 Tahun", rating: 5.0, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti", tags: ["Ads", "Social Media"] },
  { id: 3, name: "Hendra Wijaya", role: "Financial Consultant", exp: "12 Tahun", rating: 4.8, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hendra", tags: ["Keuangan", "Pajak"] },
  { id: 4, name: "Clarissa Putri", role: "Export & Import Guru", exp: "10 Tahun", rating: 4.9, image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Clarissa", tags: ["Ekspor", "Legalitas"] },
];

export default function BizGuidePage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-zinc-900 font-sans">
      <NavbarUMKM />

      <main className="pt-32 pb-20 container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-600 mb-6 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4"/> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4">
            BizGuide <span className="text-orange-500">Pro</span>
          </h1>
          <p className="text-xl text-zinc-500">
            Pendampingan eksklusif dari praktisi bisnis top Indonesia. <br/>
            Selesaikan masalah bisnis Anda lewat sesi konsultasi 1-on-1.
          </p>
        </div>

        {/* AI Diagnosis Section */}
        <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"/>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold mb-4">
                    <ShieldCheck className="w-4 h-4"/> AI Recommendation
                </div>
                <h2 className="text-2xl font-bold mb-3">Bingung Mulai Dari Mana?</h2>
                <p className="text-zinc-600 mb-6">Jawab 3 pertanyaan singkat, AI kami akan merekomendasikan mentor yang paling tepat untuk masalah spesifik Anda.</p>
                <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-500 transition-colors shadow-lg">
                    Mulai Diagnosis Cepat
                </button>
            </div>
            <div className="flex-1 w-full bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500"><MessageSquare className="w-5 h-5"/></div>
                    <div>
                        <p className="text-sm font-bold text-zinc-800">Masalah apa yang dihadapi?</p>
                        <p className="text-xs text-zinc-500 mt-1">"Omzet saya stagnan 3 bulan terakhir..."</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500"><Briefcase className="w-5 h-5"/></div>
                    <div>
                        <p className="text-sm font-bold text-zinc-800">Industri Bisnis?</p>
                        <p className="text-xs text-zinc-500 mt-1">"Fashion & Retail"</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Mentor Grid */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
                <h3 className="text-2xl font-bold text-zinc-900">Pilih Mentor Ahli</h3>
                <p className="text-zinc-500 text-sm">Booking jadwal konsultasi sesuai kebutuhan.</p>
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"/>
                <input placeholder="Cari keahlian..." className="pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"/>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENTORS.map((mentor, idx) => (
                <motion.div 
                    key={mentor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl border border-zinc-200 p-6 hover:shadow-xl hover:border-orange-200 transition-all group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <img src={mentor.image} alt={mentor.name} className="w-16 h-16 rounded-full bg-zinc-100"/>
                        <div>
                            <h4 className="font-bold text-zinc-900 leading-tight">{mentor.name}</h4>
                            <p className="text-xs text-zinc-500 mt-1">{mentor.role}</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                        {mentor.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-zinc-50 text-zinc-600 text-[10px] font-bold rounded uppercase tracking-wider">{tag}</span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 py-3 border-y border-zinc-50">
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3"/> {mentor.exp}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-orange-400 fill-orange-400"/> {mentor.rating}</span>
                    </div>

                    <button className="w-full py-2.5 bg-white border border-zinc-200 text-zinc-900 font-bold rounded-lg hover:bg-zinc-900 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4"/> Booking Sesi
                    </button>
                </motion.div>
            ))}
        </div>

      </main>
      <FooterUMKM />
    </div>
  );
}