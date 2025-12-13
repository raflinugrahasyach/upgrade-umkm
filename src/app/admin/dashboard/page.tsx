// src/app/admin/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Optimize Image
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/Toast"; // Pakai Toast Keren
import { 
  LayoutDashboard, FileText, ShoppingBag, Lightbulb, 
  UploadCloud, Loader2, Plus, Trash2, Edit, LogOut, X, ImageIcon
} from "lucide-react";

type ContentType = "articles" | "products" | "solutions";

export default function AdminDashboard() {
  const router = useRouter();
  const { showToast } = useToast(); // Hook Toast
  const [sessionChecking, setSessionChecking] = useState(true);

  // State Utama
  const [activeTab, setActiveTab] = useState<ContentType>("articles");
  const [viewMode, setViewMode] = useState<"list" | "form">("list");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // State Form
  const [formData, setFormData] = useState<any>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/login");
        } else {
            // SECURITY CHECK: Cek email admin
            const adminEmails = ["admin@upgradeumkm.id", "rafli@upgradeumkm.id"]; // Daftar email admin
            // Atau cek domain perusahaan
            const isCompanyEmail = session.user.email?.endsWith("@upgradeumkm.id");

            if (!adminEmails.includes(session.user.email!) && !isCompanyEmail) {
            alert("Anda tidak memiliki akses ke halaman Admin!");
            router.push("/"); // Tendang user biasa ke Home
            return;
            }

            setSessionChecking(false);
            fetchItems(activeTab);
        }
        };
    checkSession();
  }, [router, activeTab]);

  const fetchItems = async (table: string) => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      showToast("Gagal mengambil data", "error");
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showToast("Berhasil Logout", "info");
    router.push("/login");
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Create local preview
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image_url = formData.image_url;
      
      if (imageFile) {
        const fileName = `${activeTab}/${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
        const { error: uploadError } = await supabase.storage.from('images').upload(fileName, imageFile);
        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
        image_url = publicUrlData.publicUrl;
      }

      const payload = { ...formData, image_url };

      if (editingId) {
        const { error } = await supabase.from(activeTab).update(payload).eq('id', editingId);
        if (error) throw error;
        showToast(`Berhasil memperbarui ${activeTab}`, "success");
      } else {
        const { error } = await supabase.from(activeTab).insert([payload]);
        if (error) throw error;
        showToast(`Berhasil menambah ${activeTab} baru`, "success");
      }

      await fetchItems(activeTab);
      resetForm();

    } catch (error: any) {
      console.error("Error:", error);
      showToast(error.message || "Terjadi kesalahan", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus item ini?")) return;
    
    try {
      const { error } = await supabase.from(activeTab).delete().eq('id', id);
      if (error) throw error;
      
      setItems(items.filter(item => item.id !== id));
      showToast("Item berhasil dihapus", "success");
    } catch (error: any) {
      showToast("Gagal menghapus: " + error.message, "error");
    }
  };

  const handleEdit = (item: any) => {
    setFormData(item);
    setEditingId(item.id);
    setImagePreview(item.image_url);
    setViewMode("form");
  };

  const resetForm = () => {
    setFormData({});
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setViewMode("list");
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case "articles":
        return (
          <>
            <input name="title" value={formData.title || ""} placeholder="Judul Artikel" className="admin-input" onChange={handleInputChange} required />
            <div className="grid grid-cols-2 gap-4">
              <input name="author" value={formData.author || ""} placeholder="Penulis" className="admin-input" onChange={handleInputChange} required />
              <select name="category" value={formData.category || "technology"} className="admin-input" onChange={handleInputChange}>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="strategy">Strategy</option>
              </select>
            </div>
            <input name="read_time" value={formData.read_time || ""} placeholder="Waktu Baca (mis: 5 min read)" className="admin-input" onChange={handleInputChange} required />
            <textarea name="excerpt" value={formData.excerpt || ""} placeholder="Deskripsi Singkat" rows={3} className="admin-input" onChange={handleInputChange} required />
            <textarea name="content" value={formData.content || ""} placeholder="Isi Artikel Lengkap" rows={8} className="admin-input" onChange={handleInputChange} required />
          </>
        );
      case "products":
        return (
          <>
            <input name="name" value={formData.name || ""} placeholder="Nama Produk" className="admin-input" onChange={handleInputChange} required />
            <div className="grid grid-cols-2 gap-4">
              <select name="category" value={formData.category || "SaaS"} className="admin-input" onChange={handleInputChange}>
                <option value="SaaS">SaaS</option>
                <option value="Service">Jasa</option>
                <option value="E-Course">E-Course</option>
              </select>
              <input name="price" value={formData.price || ""} placeholder="Harga (mis: Rp 500.000)" className="admin-input" onChange={handleInputChange} />
            </div>
            <textarea name="description" value={formData.description || ""} placeholder="Deskripsi Produk" rows={4} className="admin-input" onChange={handleInputChange} required />
            <textarea name="features" value={formData.features || ""} placeholder="Fitur (pisahkan dengan koma)" rows={3} className="admin-input" onChange={handleInputChange} />
          </>
        );
      case "solutions":
        return (
          <>
            <input name="title" value={formData.title || ""} placeholder="Nama Solusi" className="admin-input" onChange={handleInputChange} required />
            <input name="industry" value={formData.industry || ""} placeholder="Industri (mis: F&B, Retail)" className="admin-input" onChange={handleInputChange} required />
            <textarea name="challenge" value={formData.challenge || ""} placeholder="Tantangan Klien" rows={3} className="admin-input" onChange={handleInputChange} />
            <textarea name="solution" value={formData.solution || ""} placeholder="Solusi yang Diberikan" rows={4} className="admin-input" onChange={handleInputChange} />
          </>
        );
    }
  };

  if (sessionChecking) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="animate-spin text-orange-500 w-10 h-10"/></div>;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 font-sans">
      <Navbar />
      <div className="flex min-h-screen pt-20">
        
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:block fixed h-full pt-6">
          <div className="px-6 mb-8">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500">
              Admin CMS
            </h2>
            <p className="text-xs text-zinc-500">Upgrade UMKM Cloud</p>
          </div>
          <nav className="space-y-2 px-4">
            {(["articles", "products", "solutions"] as ContentType[]).map((tab) => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setViewMode("list"); }} 
                className={`sidebar-btn capitalize ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'articles' && <FileText className="w-5 h-5" />}
                {tab === 'products' && <ShoppingBag className="w-5 h-5" />}
                {tab === 'solutions' && <Lightbulb className="w-5 h-5" />}
                {tab}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-24 w-full px-4">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold capitalize">Kelola {activeTab}</h1>
              {viewMode === "list" ? (
                <button 
                  onClick={() => { resetForm(); setViewMode("form"); }}
                  className="bg-white text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200"
                >
                  <Plus className="w-5 h-5" /> Tambah Baru
                </button>
              ) : (
                <button 
                  onClick={resetForm}
                  className="bg-zinc-800 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-zinc-700"
                >
                  <X className="w-5 h-5" /> Batal
                </button>
              )}
            </div>

            {/* LIST VIEW */}
            {viewMode === "list" && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden">
                {loading ? (
                  <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-orange-500 w-8 h-8"/></div>
                ) : items.length === 0 ? (
                  <div className="p-20 text-center text-zinc-500">Belum ada data. Klik "Tambah Baru".</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs">
                        <tr>
                          <th className="px-6 py-4">Image</th>
                          <th className="px-6 py-4">Judul / Nama</th>
                          <th className="px-6 py-4">Info</th>
                          <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                        {items.map((item) => (
                          <tr key={item.id} className="hover:bg-zinc-800/50 transition-colors">
                            <td className="px-6 py-4 w-24">
                              {item.image_url ? (
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-zinc-700">
                                  <Image 
                                    src={item.image_url} 
                                    alt="thumb" 
                                    fill 
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center"><ImageIcon className="w-4 h-4 text-zinc-600"/></div>
                              )}
                            </td>
                            <td className="px-6 py-4 font-medium">{item.title || item.name}</td>
                            <td className="px-6 py-4 text-zinc-400 text-sm">{item.category || item.industry}</td>
                            <td className="px-6 py-4 flex justify-end gap-2">
                              <button onClick={() => handleEdit(item)} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* FORM VIEW */}
            {viewMode === "form" && (
              <form onSubmit={handleSubmit} className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 backdrop-blur-xl relative overflow-hidden">
                <div className="space-y-6 relative z-10">
                  {renderFormFields()}

                  <div className="space-y-2">
                    <label className="text-zinc-400 text-sm">Gambar Cover</label>
                    <div className="flex gap-6 items-start">
                      {imagePreview && (
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-zinc-700 flex-shrink-0">
                          <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      
                      <div className="flex-1 relative border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center hover:border-orange-500 transition-colors group cursor-pointer bg-black/20">
                        <input type="file" onChange={handleFileChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center">
                          <UploadCloud className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 mb-2" />
                          <p className="text-sm text-zinc-300">{imageFile ? imageFile.name : "Klik / Drop gambar di sini"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : editingId ? "Simpan Perubahan" : "Publikasikan"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}