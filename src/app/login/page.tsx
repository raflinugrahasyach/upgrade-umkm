// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Jika sukses, lempar ke dashboard
      router.push("/admin/dashboard");
    } catch (error: any) {
      alert("Login Gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Register (Hanya pakai sekali buat bikin akun admin, lalu hapus tombol ini)
  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Cek email untuk konfirmasi / Akun berhasil dibuat!");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-pink-500 rounded-xl mx-auto flex items-center justify-center mb-4">
            <Lock className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-zinc-400 text-sm mt-2">Masuk untuk mengelola konten Upgrade UMKM</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="admin@upgradeumkm.id"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Masuk Dashboard <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        {/* Tombol Register Sementara (Hapus nanti kalau sudah punya akun) */}
        <div className="mt-4 text-center">
           <button onClick={handleRegister} className="text-xs text-zinc-600 hover:text-orange-500">
             Belum punya akun? Daftar Admin (Dev Mode)
           </button>
        </div>
      </div>
    </div>
  );
}