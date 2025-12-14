// src/app/member/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import { Loader2, Package, User, ArrowRight } from "lucide-react";
import Aurora from "@/components/Aurora";

export default function MemberDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setUserEmail(session.user.email!);
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#FAFAFA]"><Loader2 className="animate-spin text-orange-500 w-10 h-10"/></div>;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <NavbarUMKM />
      
      <main className="container mx-auto px-4 pt-32 pb-12">
        {/* Welcome Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 text-white p-8 md:p-12 mb-8 shadow-xl">
           <div className="absolute inset-0 opacity-30">
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
             <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">
                      {userEmail.charAt(0).toUpperCase()}
                   </div>
                   <div>
                      <p className="font-bold text-zinc-900 truncate w-32">{userEmail}</p>
                      <p className="text-xs text-zinc-500">Member Basic</p>
                   </div>
                </div>
                <button className="w-full text-left px-4 py-2 rounded-lg bg-orange-50 text-orange-600 font-medium mb-2">Dashboard</button>
                <button className="w-full text-left px-4 py-2 rounded-lg text-zinc-600 hover:bg-zinc-50 font-medium mb-2">Profil Saya</button>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 font-medium mt-4 border-t border-zinc-100 pt-4">Keluar</button>
             </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
             <h2 className="text-xl font-bold text-zinc-900 mb-6">Layanan Aktif</h2>
             
             {/* Empty State */}
             <div className="bg-white p-12 rounded-2xl border border-zinc-200 text-center shadow-sm">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Package className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">Belum ada layanan</h3>
                <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">
                   Anda belum berlangganan produk apapun. Mulai transformasi bisnis Anda sekarang.
                </p>
                <Link href="/#products">
                  <button className="px-6 py-2 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors inline-flex items-center gap-2">
                     Lihat Produk <ArrowRight className="w-4 h-4"/>
                  </button>
                </Link>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}