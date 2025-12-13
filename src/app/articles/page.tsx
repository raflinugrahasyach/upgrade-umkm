// src/app/articles/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  User,  
  Search,
  Share2,
  Bookmark,
  ArrowRight,
  Sparkles,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';

// Tipe data untuk Artikel
interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string; // Di DB kita pakai excerpt/description
  author: string;
  read_time: string;
  image_url: string;
  created_at: string;
}

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);

  // Fetch Data dari Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error("Error fetching articles:", error);
      else setArticles(data || []);
      
      setLoading(false);
    };

    fetchArticles();
  }, []);

  // Filter Logic
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { value: 'all', label: 'Semua Artikel' },
    { value: 'technology', label: 'Teknologi' },
    { value: 'business', label: 'Bisnis' },
    { value: 'strategy', label: 'Strategi' },
    { value: 'marketing', label: 'Marketing' }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center px-4">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>
          
          <div className="container mx-auto text-center relative z-10 mt-20">
            <div className="inline-block mb-8">
              <div className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/50 backdrop-blur-xl">
                <span className="text-orange-400 font-medium">Pusat Pengetahuan</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
              Jelajahi Wawasan
            </h1>
            
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12">
              Temukan artikel pilihan tentang transformasi digital, 
              tren teknologi, dan inovasi bisnis
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity" />
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  className="w-full px-12 py-4 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all backdrop-blur-xl
                    ${selectedCategory === category.value
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:border-orange-500/50'
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {loading ? (
               <div className="flex justify-center py-20">
                 <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
               </div>
            ) : filteredArticles.length === 0 ? (
               <div className="text-center py-20 text-zinc-500">
                 Tidak ada artikel ditemukan.
               </div>
            ) : (
              /* Articles Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredArticle(article.id)}
                    onMouseLeave={() => setHoveredArticle(null)}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-all" />
                    
                    <div className="relative h-full rounded-3xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="aspect-[16/10] relative overflow-hidden">
                        {/* Menggunakan Image dari Supabase atau Placeholder */}
                        <div 
                           className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                           style={{ backgroundImage: `url(${article.image_url || '/api/placeholder/800/500'})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                        
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400 backdrop-blur-xl border border-orange-500/20 uppercase">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-zinc-400 mb-6 line-clamp-3 flex-grow">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mb-6 mt-auto">
                          <div className="flex items-center text-zinc-400 text-sm">
                            <User className="w-4 h-4 mr-2 text-orange-400" />
                            {article.author}
                          </div>
                          <div className="flex items-center text-zinc-400 text-sm">
                            <Clock className="w-4 h-4 mr-2 text-pink-400" />
                            {article.read_time}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Link href={`/articles/${article.id}`}>
                            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all group">
                              <span className="flex items-center">
                                Baca Selengkapnya
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </button>
                          </Link>
                          
                          <div className="flex gap-3">
                            <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white">
                              <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white">
                              <Bookmark className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section (Tetap sama) */}
        <section className="py-32">
           {/* ... (Kode newsletter tetap sama) ... */}
           {/* Saya persingkat di sini agar tidak kepanjangan, tapi Anda biarkan saja kode newsletter yang lama */}
           <div className="container mx-auto px-4 text-center">
             <div className="p-10 bg-zinc-900/50 rounded-3xl border border-zinc-800">
               <h2 className="text-3xl font-bold text-white mb-4">Newsletter</h2>
               <p className="text-zinc-400">Dapatkan update terbaru.</p>
             </div>
           </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default ArticlesPage;