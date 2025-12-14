"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Import baru
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const supabase = createClient(); // Inisialisasi baru

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Pastikan URL redirect sesuai domain Anda
      const redirectUrl = `${window.location.origin}/auth/callback`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-zinc-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600"/>
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Cek Email Anda</h2>
          <p className="text-zinc-600 mb-6">Link konfirmasi telah dikirim ke <strong>{email}</strong>.</p>
          <Link href="/login" className="text-orange-600 font-bold hover:underline">Kembali ke Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* FORM SECTION */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="flex items-center gap-2 mb-10 group w-fit">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold shadow-md">U</div>
            <span className="font-bold text-lg text-zinc-900">UpgradeUMKM</span>
          </Link>
          <h2 className="text-3xl font-extrabold text-zinc-900 mb-2">Buat Akun Baru</h2>
          <form onSubmit={handleRegister} className="space-y-5 mt-8">
            {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">{error}</div>}
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"/>
                <input type="text" required className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Contoh: Budi Santoso" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-1">Email Bisnis</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"/>
                <input type="email" required className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="nama@bisnis.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"/>
                <input type="password" required minLength={6} className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" placeholder="Minimal 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3.5 bg-zinc-900 text-white font-bold rounded-xl hover:bg-orange-500 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Daftar Sekarang"} {!loading && <ArrowRight className="w-4 h-4"/>}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-zinc-500">Sudah punya akun? <Link href="/login" className="font-bold text-orange-600 hover:underline">Masuk di sini</Link></p>
        </div>
      </div>
      {/* VISUAL SECTION */}
      <div className="hidden lg:flex flex-1 bg-zinc-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"/>
        <div className="relative z-10 text-white max-w-lg">
          <h3 className="text-4xl font-extrabold mb-6 leading-tight">Mulai Perjalanan Digital Anda.</h3>
          <p className="text-lg text-zinc-400">Bergabunglah dengan ekosistem UMKM modern.</p>
        </div>
      </div>
    </div>
  );
}