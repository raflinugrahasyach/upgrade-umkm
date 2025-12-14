"use client";

import { useState } from "react";
import { 
  ArrowLeft, PlayCircle, BookOpen, Clock, Award, 
  CheckCircle, Lock, MonitorPlay 
} from "lucide-react";
import Link from "next/link";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";
import { motion } from "framer-motion";

const COURSES = [
  { id: 1, title: "Digital Marketing Mastery 2025", modules: 12, duration: "6 Jam", level: "Beginner", progress: 75, image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Manajemen Keuangan UMKM Anti Boncos", modules: 8, duration: "4 Jam", level: "Intermediate", progress: 30, image: "https://images.unsplash.com/photo-1554224155-98406852d009?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Fotografi Produk dengan Smartphone", modules: 5, duration: "2.5 Jam", level: "Beginner", progress: 0, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Legalitas & Perizinan Usaha Lengkap", modules: 10, duration: "5 Jam", level: "Advanced", progress: 0, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Strategi Ekspor untuk Pemula", modules: 15, duration: "8 Jam", level: "Advanced", progress: 0, image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Copywriting yang Menjual", modules: 6, duration: "3 Jam", level: "Intermediate", progress: 100, image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80" },
];

export default function SkillBoostPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-zinc-900 font-sans">
      <NavbarUMKM />

      <main className="pt-32 pb-20 container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-zinc-200 pb-8">
            <div>
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-600 mb-4 transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4"/> Kembali ke Beranda
                </Link>
                <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-2">
                    SkillBoost <span className="text-orange-500">Pro</span>
                </h1>
                <p className="text-zinc-500">Akses ribuan materi pembelajaran praktis untuk upgrade bisnis.</p>
            </div>
            
            {/* Stats Card */}
            <div className="flex gap-4">
                <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm text-center min-w-[100px]">
                    <p className="text-3xl font-bold text-orange-500">12</p>
                    <p className="text-xs text-zinc-500 uppercase font-bold">Jam Belajar</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm text-center min-w-[100px]">
                    <p className="text-3xl font-bold text-green-500">2</p>
                    <p className="text-xs text-zinc-500 uppercase font-bold">Sertifikat</p>
                </div>
            </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto gap-2 pb-6 mb-2 no-scrollbar">
            {["Semua", "Marketing", "Keuangan", "Operasional", "Legalitas", "Teknologi"].map(cat => (
                <button 
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === cat ? 'bg-zinc-900 text-white shadow-lg' : 'bg-white border border-zinc-200 text-zinc-500 hover:border-orange-500 hover:text-orange-500'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, idx) => (
                <motion.div 
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all group flex flex-col h-full"
                >
                    <div className="relative h-48 overflow-hidden">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"/>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"/>
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-zinc-800">
                            {course.level}
                        </div>
                        <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle className="w-16 h-16 text-white drop-shadow-lg"/>
                        </button>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-bold text-lg text-zinc-900 mb-2 line-clamp-2">{course.title}</h3>
                        
                        <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6">
                            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3"/> {course.modules} Modul</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {course.duration}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-auto">
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className={course.progress === 100 ? "text-green-600" : "text-zinc-500"}>
                                    {course.progress === 100 ? "Selesai" : course.progress > 0 ? "Sedang Dipelajari" : "Belum Dimulai"}
                                </span>
                                <span>{course.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${course.progress === 100 ? "bg-green-500" : "bg-orange-500"}`} 
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                        </div>
                        
                        {course.progress === 100 && (
                            <button className="mt-4 w-full py-2 bg-green-50 text-green-700 font-bold rounded-lg text-xs flex items-center justify-center gap-2 hover:bg-green-100 transition-colors">
                                <Award className="w-4 h-4"/> Download Sertifikat
                            </button>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>

      </main>
      <FooterUMKM />
    </div>
  );
}