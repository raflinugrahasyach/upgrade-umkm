"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";
import Aurora from "@/components/Aurora";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Force refresh session untuk memastikan cookie/localStorage terupdate
      await supabase.auth.refreshSession();
      router.refresh();

      // Cek Admin Email
      const adminEmails = ["admin@upgradeumkm.id", "rafli@upgradeumkm.id", "dzakkidamar@upgradeumkm.id"];
      const isCompanyEmail = email.endsWith("@upgradeumkm.id");
      
      if (adminEmails.includes(email) || isCompanyEmail) {
        // Gunakan replace agar user tidak bisa 'back' ke login page
        router.replace("/admin/dashboard");
      } else {
        router.replace("/member/dashboard");
      }

    } catch (error: any) {
      console.error("Login Error:", error);
      alert("Login Gagal: " + (error.message || "Terjadi kesalahan sistem"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0 opacity-40">
        <Aurora colorStops={["#FBC904", "#FFA500", "#FAFAFA"]} speed={0.5} />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col">
        <NavbarUMKM />
        
        <div className="flex-1 flex items-center justify-center p-4 pt-20">
          <div className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 transform transition-all hover:scale-[1.01]">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-zinc-900">Selamat Datang</h1>
              <p className="text-zinc-500 mt-2">Akses dashboard transformasi bisnis Anda</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/80 border border-zinc-200 text-zinc-900 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/80 border border-zinc-200 text-zinc-900 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Masuk Sekarang <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-zinc-500">
              Belum punya akun? <Link href="/register" className="text-orange-600 font-bold hover:underline">Daftar Gratis</Link>
            </div>
          </div>
        </div>
      </div>
      <FooterUMKM />
    </main>
  );
}