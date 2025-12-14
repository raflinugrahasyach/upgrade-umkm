"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link
import { Loader2, LayoutDashboard, FileText, LogOut, PlusCircle } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ users: 0, articles: 0, events: 0 });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
        return;
      }
      
      // Ambil data real untuk statistik
      const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }); // Opsional jika ada tabel profiles
      const { count: articlesCount } = await supabase.from('articles').select('*', { count: 'exact', head: true });
      const { count: eventsCount } = await supabase.from('events').select('*', { count: 'exact', head: true });

      setStats({
        users: usersCount || 120, // Dummy fallback kalau tabel kosong
        articles: articlesCount || 0,
        events: eventsCount || 0
      });
      
      setLoading(false);
    };
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-500 w-10 h-10"/></div>;

  return (
    <div className="flex h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 p-6 flex flex-col fixed h-full">
        <h1 className="text-xl font-bold text-orange-600 mb-8">Admin Panel</h1>
        <nav className="space-y-2 flex-1">
            <Link href="/admin/dashboard">
                <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-xl font-medium cursor-pointer">
                    <LayoutDashboard className="w-5 h-5"/> Dashboard
                </div>
            </Link>
            <Link href="/admin/content">
                <div className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-zinc-100 rounded-xl font-medium cursor-pointer transition-colors">
                    <FileText className="w-5 h-5"/> Kelola Konten
                </div>
            </Link>
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium mt-auto transition-colors">
            <LogOut className="w-5 h-5"/> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <p className="text-zinc-500 text-sm font-medium">Total Artikel</p>
                <p className="text-3xl font-bold text-zinc-900 mt-2">{stats.articles}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <p className="text-zinc-500 text-sm font-medium">Active Events</p>
                <p className="text-3xl font-bold text-zinc-900 mt-2">{stats.events}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                <p className="text-zinc-500 text-sm font-medium">Revenue (Est)</p>
                <p className="text-3xl font-bold text-zinc-900 mt-2">Rp 45.2M</p>
            </div>
        </div>
        
        <div className="mt-8 p-8 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-400">
            <PlusCircle className="w-10 h-10 mb-2 opacity-50"/>
            <p>Pilih menu "Kelola Konten" untuk menambah data baru</p>
        </div>
      </main>
    </div>
  );
}