// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";

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
        // Kita bisa simpan nama user di meta data
        options: {
          data: {
            role: 'customer' // Menandai ini user biasa
          }
        }
      });

      if (error) throw error;
      
      alert("Pendaftaran Berhasil! Silakan Login.");
      router.push("/login");

    } catch (error: any) {
      alert("Gagal: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black flex items-center justify-center p-4 pt-20">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Buat Akun Baru</h1>
            <p className="text-zinc-400 text-sm mt-2">Bergabung dengan komunitas Upgrade UMKM</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block uppercase">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500" placeholder="nama@email.com" required />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-orange-500" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-6">
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Daftar Sekarang <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-500">
            Sudah punya akun? <Link href="/login" className="text-orange-400 hover:text-orange-300">Login di sini</Link>
          </div>
        </div>
      </div>
    </>
  );
}