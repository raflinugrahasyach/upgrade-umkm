"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/member/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Gagal masuk. Periksa email dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-zinc-100 max-w-md w-full">
        <div className="text-center mb-8">
            
            {/* --- BAGIAN LOGO DIPERBARUI --- */}
            <Link href="/" className="inline-block mb-6 group">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto p-3 group-hover:rotate-6 transition-transform">
                    {/* Ganti huruf U dengan Gambar */}
                    <img src="/logo_uumkm.png" alt="Logo" className="w-full h-full object-contain"/>
                </div>
            </Link>
            {/* ----------------------------- */}

            <h2 className="text-2xl font-extrabold text-zinc-900">Selamat Datang Kembali!</h2>
            <p className="text-zinc-500 text-sm mt-2">Masuk untuk mengelola bisnis Anda.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5"/>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"/>
              <input 
                type="email" required 
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="nama@bisnis.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-zinc-700">Password</label>
                <a href="#" className="text-xs font-bold text-orange-600 hover:underline">Lupa Password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"/>
              <input 
                type="password" required 
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 bg-zinc-900 text-white font-bold rounded-xl hover:bg-orange-500 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Masuk Dashboard"} 
            {!loading && <ArrowRight className="w-4 h-4"/>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
            <p className="text-sm text-zinc-500">Belum punya akun? <Link href="/register" className="font-bold text-orange-600 hover:underline">Daftar Gratis</Link></p>
        </div>
      </div>
    </div>
  );
}