"use client";

import { useState } from "react";
import { 
  ArrowLeft, Users, MapPin, MessageCircle, Heart, Share2, 
  Search, Filter, Briefcase, Building2 
} from "lucide-react";
import Link from "next/link";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";
import { motion } from "framer-motion";

const POSTS = [
  { id: 1, user: "UD. Berkah Tani", role: "Supplier Sayur", location: "Malang", content: "Halo rekan UMKM! Kami baru panen kentang kualitas super. Stok 500kg siap kirim ke area Surabaya-Sidoarjo. Harga grosir spesial buat member BizConnect!", likes: 24, comments: 8, image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80" },
  { id: 2, user: "Kopi Senja", role: "Coffee Shop", location: "Surabaya", content: "Lagi cari supplier cup plastik yang bisa custom sablon logo. Ada rekomendasi? Butuh rutin 2000 pcs/bulan.", likes: 12, comments: 15, image: null },
  { id: 3, user: "Batik Cantik", role: "Produsen Batik", location: "Solo", content: "Open Reseller untuk koleksi lebaran 2025! Margin keuntungan hingga 30%. Yuk kolaborasi.", likes: 45, comments: 22, image: "https://images.unsplash.com/photo-1598556836375-7b613926cb99?auto=format&fit=crop&w=800&q=80" },
];

export default function BizConnectPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen text-zinc-900 font-sans">
      <NavbarUMKM />

      <main className="pt-32 pb-20 container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT SIDEBAR: Navigation & Profile */}
            <div className="lg:w-1/4 space-y-6">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4"/> Kembali ke Beranda
                </Link>
                
                <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mx-auto mb-4 p-1">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rafli" className="w-full h-full rounded-full bg-white"/>
                    </div>
                    <h3 className="font-bold text-lg text-zinc-900">Rafli Nugraha</h3>
                    <p className="text-xs text-zinc-500 mb-4">Founder @ UpgradeUMKM</p>
                    <div className="flex justify-center gap-4 text-sm font-bold border-t border-zinc-50 pt-4">
                        <div className="text-center">
                            <span className="block text-lg">152</span>
                            <span className="text-zinc-400 text-xs font-normal">Koneksi</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-lg">8</span>
                            <span className="text-zinc-400 text-xs font-normal">Grup</span>
                        </div>
                    </div>
                </div>

                {/* Matchmaking Card */}
                <div className="bg-zinc-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="font-bold text-lg mb-2">Cari Partner?</h4>
                        <p className="text-zinc-400 text-xs mb-4">AI kami bisa mencarikan supplier atau reseller yang cocok.</p>
                        <button className="w-full py-2 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors">
                            Mulai Matchmaking
                        </button>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl"/>
                </div>
            </div>

            {/* MAIN FEED */}
            <div className="lg:w-2/4">
                {/* Create Post */}
                <div className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm mb-6 flex gap-4">
                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex-shrink-0"/>
                    <div className="flex-1">
                        <input placeholder="Apa yang bisnis Anda butuhkan hari ini?" className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"/>
                        <div className="flex justify-end mt-2 gap-2">
                            <button className="p-2 text-zinc-400 hover:text-orange-500"><MapPin className="w-4 h-4"/></button>
                            <button className="px-4 py-1.5 bg-zinc-900 text-white text-xs font-bold rounded-lg hover:bg-orange-500 transition-colors">Posting</button>
                        </div>
                    </div>
                </div>

                {/* Posts */}
                <div className="space-y-6">
                    {POSTS.map((post, idx) => (
                        <motion.div 
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center font-bold text-zinc-500 text-lg">
                                        {post.user.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-zinc-900">{post.user}</h4>
                                        <p className="text-xs text-zinc-500 flex items-center gap-1">
                                            {post.role} • <MapPin className="w-3 h-3"/> {post.location}
                                        </p>
                                    </div>
                                </div>
                                <button className="px-3 py-1 text-xs font-bold text-orange-500 border border-orange-200 rounded-full hover:bg-orange-50 transition-colors">
                                    + Hubungkan
                                </button>
                            </div>

                            <p className="text-zinc-700 text-sm leading-relaxed mb-4">
                                {post.content}
                            </p>

                            {post.image && (
                                <div className="mb-4 rounded-2xl overflow-hidden h-64 w-full">
                                    <img src={post.image} alt="Post" className="w-full h-full object-cover"/>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                                <div className="flex gap-6">
                                    <button className="flex items-center gap-1.5 text-zinc-500 hover:text-red-500 transition-colors text-xs font-bold">
                                        <Heart className="w-4 h-4"/> {post.likes}
                                    </button>
                                    <button className="flex items-center gap-1.5 text-zinc-500 hover:text-blue-500 transition-colors text-xs font-bold">
                                        <MessageCircle className="w-4 h-4"/> {post.comments}
                                    </button>
                                </div>
                                <button className="text-zinc-400 hover:text-zinc-900">
                                    <Share2 className="w-4 h-4"/>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDEBAR: Recommendations */}
            <div className="lg:w-1/4 space-y-6 hidden lg:block">
                <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
                    <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-orange-500"/> Mitra Potensial
                    </h3>
                    <div className="space-y-4">
                        {[1,2,3].map(i => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex-shrink-0"/>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-zinc-900 truncate">CV. Maju Jaya</p>
                                    <p className="text-xs text-zinc-500 truncate">Distributor Sembako</p>
                                </div>
                                <button className="p-2 bg-zinc-50 rounded-lg hover:bg-orange-50 text-orange-500 transition-colors">
                                    <Users className="w-4 h-4"/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
      </main>
      <FooterUMKM />
    </div>
  );
}