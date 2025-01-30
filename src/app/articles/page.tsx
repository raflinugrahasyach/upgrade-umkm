'use client'

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  User, 
  ChevronRight, 
  Search,
  Tag,
  Share2,
  Bookmark,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ArticlesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredArticle, setHoveredArticle] = useState(null);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {filteredArticles.map((article, index) => (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredArticle(null)}
                  onMouseLeave={() => setHoveredArticle(null)}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-all" />
                  
                  <div className="relative h-full rounded-3xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('/api/placeholder/800/500')] bg-cover bg-center group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400 backdrop-blur-xl border border-orange-500/20">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-zinc-400 mb-6 line-clamp-3">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center text-zinc-400">
                          <User className="w-4 h-4 mr-2 text-orange-400" />
                          {article.author}
                        </div>
                        <div className="flex items-center text-zinc-400">
                          <Clock className="w-4 h-4 mr-2 text-pink-400" />
                          {article.readTime}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all group">
                          <span className="flex items-center">
                            Baca Selengkapnya
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                        
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
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-xl opacity-20" />
              <div className="relative p-1 rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                <div className="bg-black rounded-3xl p-16 text-center backdrop-blur-xl">
                  <div className="flex justify-center mb-8">
                    <Sparkles className="w-12 h-12 text-orange-400" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    Tetap Terupdate
                  </h2>
                  <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
                    Berlangganan newsletter kami dan dapatkan artikel terbaru, 
                    wawasan, dan update langsung di inbox Anda.
                  </p>
                  <div className="max-w-md mx-auto relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity" />
                    <div className="relative flex">
                      <input
                        type="email"
                        placeholder="Masukkan email Anda"
                        className="flex-1 px-6 py-4 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-l-full text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50"
                      />
                      <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-r-full text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all">
                        Berlangganan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const categories = [
  { value: 'all', label: 'Semua Artikel' },
  { value: 'technology', label: 'Teknologi' },
  { value: 'business', label: 'Bisnis' },
  { value: 'innovation', label: 'Inovasi' },
  { value: 'strategy', label: 'Strategi' },
  { value: 'tutorials', label: 'Tutorial' }
];

const articles = [
  {
    title: "Masa Depan AI dalam Bisnis",
    category: "technology",
    description: "Jelajahi bagaimana kecerdasan buatan mengubah lanskap bisnis dan apa artinya bagi inovasi masa depan. Pelajari aplikasi praktis dan tren yang akan datang.",
    author: "Dr. Sarah Chen",
    readTime: "8 menit baca"
  },
  {
    title: "Strategi Transformasi Digital",
    category: "strategy",
    description: "Panduan lengkap untuk menerapkan transformasi digital di organisasi Anda. Termasuk studi kasus nyata dan wawasan yang dapat ditindaklanjuti.",
    author: "Michael Roberts",
    readTime: "12 menit baca"
  },
  {
    title: "Membangun Budaya Data-Driven",
    category: "business",
    description: "Pelajari cara menumbuhkan budaya berbasis data di organisasi Anda dan membuat keputusan lebih baik menggunakan analitik dan wawasan.",
    author: "Emma Thompson",
    readTime: "10 menit baca"
  },
  {
    title: "Dasar-Dasar Cloud Computing",
    category: "technology",
    description: "Memahami fundamental komputasi awan dan cara memanfaatkan layanan cloud untuk pertumbuhan dan skalabilitas bisnis.",
    author: "James Wilson",
    readTime: "15 menit baca"
  },
  {
    title: "Inovasi dalam Praktik",
    category: "innovation",
    description: "Contoh nyata bagaimana perusahaan mendorong inovasi dan menciptakan solusi terobosan di berbagai industri.",
    author: "Lisa Anderson",
    readTime: "7 menit baca"
  },
  {
    title: "Menguasai Digital Marketing",
    category: "tutorials",
    description: "Panduan langkah demi langkah untuk membuat dan menjalankan strategi pemasaran digital yang efektif dalam lanskap yang kompetitif saat ini.",
    author: "Alex Martinez",
    readTime: "14 menit baca"
  }
];

export default ArticlesPage;