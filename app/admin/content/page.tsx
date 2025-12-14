"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Loader2, ArrowLeft, Plus, Trash2, Calendar, FileText } from "lucide-react";

export default function ContentManager() {
  const [articles, setArticles] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State Form Input
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState(""); // Kategori / Tanggal
  const [activeTab, setActiveTab] = useState("article"); // 'article' or 'event'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. READ (Ambil Data)
  const fetchData = async () => {
    const { data: articlesData } = await supabase.from('articles').select('*').order('id', { ascending: false });
    const { data: eventsData } = await supabase.from('events').select('*').order('id', { ascending: false });
    
    setArticles(articlesData || []);
    setEvents(eventsData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. CREATE (Tambah Data)
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (activeTab === "article") {
      await supabase.from('articles').insert([{ title: newTitle, category: newCategory || "Umum" }]);
    } else {
      await supabase.from('events').insert([{ title: newTitle, date: newCategory, type: "Online Webinar" }]);
    }

    setNewTitle("");
    setNewCategory("");
    await fetchData(); // Refresh table
    setIsSubmitting(false);
  };

  // 3. DELETE (Hapus Data)
  const handleDelete = async (id: number, table: string) => {
    if (!confirm("Yakin hapus data ini?")) return;
    await supabase.from(table).delete().eq('id', id);
    await fetchData();
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-500"/></div>;

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar Simple (Bisa dipisah component kalau mau rapi) */}
      <aside className="w-64 bg-white border-r border-zinc-200 p-6 fixed h-full hidden md:block">
        <h1 className="text-xl font-bold text-orange-600 mb-8">Admin Panel</h1>
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 mb-4 font-medium">
            <ArrowLeft className="w-4 h-4"/> Kembali ke Dashboard
        </Link>
      </aside>

      <main className="flex-1 p-8 md:ml-64">
        <h2 className="text-2xl font-bold text-zinc-900 mb-8">Kelola Konten</h2>

        {/* Input Form Section */}
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm mb-8">
            <div className="flex gap-4 mb-6 border-b border-zinc-100 pb-4">
                <button 
                    onClick={() => setActiveTab("article")}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === "article" ? "bg-orange-500 text-white" : "bg-zinc-100 text-zinc-500"}`}
                >
                    + Artikel Baru
                </button>
                <button 
                    onClick={() => setActiveTab("event")}
                    className={`px-4 py-2 rounded-lg font-bold transition-all ${activeTab === "event" ? "bg-orange-500 text-white" : "bg-zinc-100 text-zinc-500"}`}
                >
                    + Event Baru
                </button>
            </div>

            <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">Judul {activeTab === "article" ? "Artikel" : "Event"}</label>
                    <input 
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder={activeTab === "article" ? "Contoh: Tips Digital Marketing 2025" : "Contoh: Webinar Bisnis Pemula"}
                    />
                </div>
                <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">{activeTab === "article" ? "Kategori" : "Tanggal Event"}</label>
                    <input 
                        required
                        type={activeTab === "event" ? "date" : "text"}
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder={activeTab === "article" ? "Contoh: Marketing" : ""}
                    />
                </div>
                <button 
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-6 py-3 bg-zinc-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4"/> : <><Plus className="w-4 h-4"/> Tambah Data</>}
                </button>
            </form>
        </div>

        {/* List Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tabel Artikel */}
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-orange-500"/> Daftar Artikel</h3>
                    <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-zinc-200">{articles.length} Data</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto p-2 space-y-2">
                    {articles.length === 0 && <p className="text-center text-sm text-zinc-400 py-8">Belum ada artikel.</p>}
                    {articles.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-white border border-zinc-100 rounded-xl hover:border-orange-200 transition-colors shadow-sm">
                            <div>
                                <p className="font-bold text-zinc-800 text-sm">{item.title}</p>
                                <p className="text-xs text-orange-500 uppercase">{item.category}</p>
                            </div>
                            <button 
                                onClick={() => handleDelete(item.id, 'articles')}
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabel Event */}
            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
                <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-orange-500"/> Daftar Event</h3>
                    <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-zinc-200">{events.length} Data</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto p-2 space-y-2">
                    {events.length === 0 && <p className="text-center text-sm text-zinc-400 py-8">Belum ada event.</p>}
                    {events.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-white border border-zinc-100 rounded-xl hover:border-orange-200 transition-colors shadow-sm">
                            <div>
                                <p className="font-bold text-zinc-800 text-sm">{item.title}</p>
                                <p className="text-xs text-blue-500">{item.date}</p>
                            </div>
                            <button 
                                onClick={() => handleDelete(item.id, 'events')}
                                className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4"/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}