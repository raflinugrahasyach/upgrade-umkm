"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // PERBAIKAN 1: Import yang benar
import { useRouter } from "next/navigation";
import Link from "next/link"; // PERBAIKAN 2: Tambah import Link
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import { Loader2, Package, User, ArrowRight, LogOut } from "lucide-react";
import Aurora from "@/components/Aurora";

export default function MemberDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  
  // Inisialisasi Supabase Client
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // PERBAIKAN 3: Pakai getUser() lebih aman & akurat ke server
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          // Kalau error/gak ada user, tendang ke login
          router.replace("/login");
          return;
        }

        // Kalau ada, simpan datanya
        setUserEmail(user.email || "User");
      } catch (error) {
        console.error("Error checking session:", error);
        router.replace("/login");
      } finally {
        // PERBAIKAN 4: Loading WAJIB mati, mau sukses atau gagal
        setLoading(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    setLoading(true); // Kasih efek loading pas logout
    await supabase.auth.signOut();
    router.replace("/login");
  };

  // Tampilan Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-orange-500 w-10 h-10"/>
            <p className="text-zinc-400 text-sm animate-pulse">Memuat data member...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <NavbarUMKM />
      
      <main className="container mx-auto px-4 pt-32 pb-12">
        {/* Welcome Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 text-white p-8 md:p-12 mb-8 shadow-xl">
           <div className="absolute inset-0 opacity-30 pointer-events-none">
              <Aurora colorStops={["#FBC904", "#F97316", "#000000"]} speed={0.5} />
           </div>
           <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Halo, {userEmail.split('@')[0]}! 👋</h1>
              <p className="text-zinc-300">Selamat datang di Member Area Upgrade UMKM.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1 space-y-4">
             <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center text-orange-600 font-bold text-xl border border-orange-200">
                      {(userEmail?.[0] || "U").toUpperCase()}
                   </div>
                   <div className="overflow-hidden">
                      <p className="font-bold text-zinc-900 truncate max-w-[150px]" title={userEmail}>{userEmail}</p>
                      <p className="text-xs text-zinc-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Member Basic
                      </p>
                   </div>
                </div>
                
                <div className="space-y-1">
                    <button className="w-full text-left px-4 py-2.5 rounded-xl bg-orange-50 text-orange-700 font-bold text-sm mb-1 border border-orange-100">
                        Dashboard
                    </button>
                    <button className="w-full text-left px-4 py-2.5 rounded-xl text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 font-medium text-sm transition-colors">
                        Profil Saya
                    </button>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 font-medium text-sm transition-colors group">
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform"/> Keluar
                    </button>
                </div>
             </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-zinc-900">Layanan Aktif</h2>
             </div>
             
             {/* Empty State */}
             <div className="bg-white p-12 rounded-2xl border border-zinc-200 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-100">
                   <Package className="w-10 h-10 text-zinc-300" />
                </div>
                <h3 className="font-bold text-zinc-900 text-lg mb-2">Belum ada layanan aktif</h3>
                <p className="text-zinc-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                   Anda belum berlangganan produk apapun. Mulai transformasi bisnis Anda dengan teknologi AI kami sekarang.
                </p>
                <Link href="/#products">
                  <button className="px-8 py-3 bg-zinc-900 text-white rounded-full font-bold text-sm hover:bg-orange-600 hover:scale-105 transition-all inline-flex items-center gap-2 shadow-lg shadow-zinc-200">
                      Lihat Katalog Produk <ArrowRight className="w-4 h-4"/>
                  </button>
                </Link>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}