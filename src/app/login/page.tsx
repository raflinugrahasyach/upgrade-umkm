// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar"; // Pastikan ada Navbar biar user bisa balik

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

      // CEK ROLE: Apakah dia Admin atau Customer?
      // (Untuk tahap awal, kita anggap email tertentu adalah admin)
      // Cara Pro nanti: Cek tabel 'profiles' atau 'roles'
      
      const adminEmails = ["admin@upgradeumkm.id", "rafli@upgradeumkm.id"]; // Ganti dengan email admin Anda
      
      if (adminEmails.includes(email) || email.includes("@upgradeumkm.id")) {
        router.push("/admin/dashboard");
      } else {
        router.push("/"); // Customer dilempar ke Home / Dashboard User
      }
      
    } catch (error: any) {
      alert("Login Gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-20">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
          
          {/* Hiasan Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px]" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 blur-[50px]" />

          <div className="text-center mb-8 relative z-10">
            <h1 className="text-2xl font-bold text-white">Selamat Datang</h1>
            <p className="text-zinc-400 text-sm mt-2">Masuk untuk mengakses akun Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block uppercase">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block uppercase">Password</label>
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
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Masuk <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          {/* TIDAK ADA LAGI TOMBOL DAFTAR ADMIN DI SINI */}
          {/* Link Daftar untuk Customer (Nanti dibuat) */}
          <div className="mt-6 text-center text-sm text-zinc-500">
            Belum punya akun? <Link href="/register" className="text-orange-400 hover:text-orange-300">Daftar Member</Link>
          </div>
        </div>
      </div>
    </>
  );
}