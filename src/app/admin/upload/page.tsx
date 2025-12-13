// src/app/admin/upload/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Navbar from "@/components/Navbar";
import { Loader2, UploadCloud, CheckCircle } from "lucide-react";

export default function AdminUploadPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    excerpt: "",
    content: "",
    category: "technology", 
    readTime: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      let image_url = "";

      // 1. Upload Gambar ke Supabase Storage
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { data, error: uploadError } = await supabase
          .storage
          .from('images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        // Dapatkan URL Public
        const { data: publicUrlData } = supabase
          .storage
          .from('images')
          .getPublicUrl(fileName);
          
        image_url = publicUrlData.publicUrl;
      }

      // 2. Simpan Data ke Tabel Supabase
      const { error: insertError } = await supabase
        .from('articles')
        .insert([
          {
            title: formData.title,
            author: formData.author,
            category: formData.category,
            read_time: formData.readTime, // perhatikan nama kolom di DB snake_case
            excerpt: formData.excerpt,
            content: formData.content,
            image_url: image_url
          }
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({
        title: "", author: "", excerpt: "", content: "", category: "technology", readTime: ""
      });
      setImageFile(null);
      setTimeout(() => setSuccess(false), 3000);

    } catch (error) {
      console.error("Error upload:", error);
      alert("Gagal mengupload artikel. Cek console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
          Admin Panel: Upload Artikel
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
          {/* Judul */}
          <div>
            <label className="block text-zinc-400 mb-2">Judul Artikel</label>
            <input
              required
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-orange-500"
              placeholder="Contoh: Masa Depan AI"
            />
          </div>

          {/* Kategori & Penulis */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 mb-2">Kategori</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
              >
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="strategy">Strategy</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 mb-2">Penulis</label>
              <input
                required
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
                placeholder="Nama Penulis"
              />
            </div>
          </div>

          {/* Waktu Baca */}
          <div>
            <label className="block text-zinc-400 mb-2">Estimasi Waktu Baca</label>
            <input
              required
              name="readTime"
              value={formData.readTime}
              onChange={handleInputChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3"
              placeholder="Contoh: 5 menit baca"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-zinc-400 mb-2">Deskripsi Singkat</label>
            <textarea
              required
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-zinc-400 mb-2">Isi Konten</label>
            <textarea
              required
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={10}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-zinc-400 mb-2">Gambar Cover</label>
            <div className="relative border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center hover:border-orange-500 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-8 h-8 mx-auto text-zinc-500 mb-2" />
              <p className="text-sm text-zinc-400">
                {imageFile ? imageFile.name : "Klik atau seret gambar ke sini"}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : success ? <CheckCircle /> : "Publikasikan"}
          </button>
        </form>
      </div>
    </div>
  );
}