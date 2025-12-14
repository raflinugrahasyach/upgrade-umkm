// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";
import { Loader2, Mail, Lock, User, ArrowRight } from "lucide-react";
import Aurora from "@/components/Aurora";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role: 'customer' } }
      });

      if (error) throw error;

      // Cek auto login
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
          router.refresh();
          router.push("/member/dashboard");
      } else {
          alert("Pendaftaran Berhasil! Silakan Login.");
          router.push("/login");
      }

    } catch (error: any) {
      alert("Gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-50">
        <Aurora colorStops={["#FBC904", "#F97316", "#FAFAFA"]} speed={0.5} />
      </div>

      <div className="relative z-10">
        <NavbarUMKM />
        
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-zinc-900">Buat Akun Baru</h1>
              <p className="text-zinc-500 text-sm mt-2">Bergabung dengan ekosistem Upgrade UMKM</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-zinc-200 text-zinc-900 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FBC904] transition-all"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-zinc-200 text-zinc-900 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FBC904] transition-all"
                    placeholder="Minimal 6 karakter"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FBC904] to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Daftar Sekarang <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-500">
              Sudah punya akun? <Link href="/login" className="text-orange-600 font-semibold hover:underline">Masuk di sini</Link>
            </div>
          </div>
        </div>
        <FooterUMKM />
      </div>
    </main>
  );
}