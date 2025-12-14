"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowRight, Search, Tag } from "lucide-react";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setArticles(data || []);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <NavbarUMKM />
      
      {/* Hero Header Articles */}
      <section className="pt-32 pb-16 px-4 bg-white border-b border-zinc-100">
        <div className="container mx-auto text-center max-w-3xl">
          <span className="text-orange-500 font-bold tracking-wider text-sm uppercase mb-2 block">Pusat Wawasan</span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            Artikel & Panduan <span className="text-orange-500">Bisnis</span>
          </h1>
          <p className="text-lg text-zinc-500 mb-10">
            Temukan strategi terbaru, tips praktis, dan inspirasi untuk mengembangkan UMKM Anda ke level berikutnya.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Cari topik (misal: marketing, keuangan)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-zinc-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 container mx-auto px-4">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-3xl h-96 animate-pulse bg-zinc-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Thumbnail */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={article.image_url || "/placeholder.jpg"} 
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {article.read_time}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-zinc-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                    {article.excerpt || "Baca artikel selengkapnya untuk mendapatkan wawasan mendalam tentang topik ini..."}
                  </p>

                  <div className="pt-6 border-t border-zinc-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                       <img src={article.author_avatar || "/placeholder-user.jpg"} alt="Author" className="w-8 h-8 rounded-full bg-zinc-100" />
                       <span className="text-xs font-semibold text-zinc-600">{article.author}</span>
                    </div>
                    <Link href={`/articles/${article.id}`}>
                      <span className="text-orange-500 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                        Baca <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
            <div className="text-center py-20">
                <p className="text-zinc-400 text-lg">Tidak ada artikel yang ditemukan untuk "{searchTerm}"</p>
            </div>
        )}
      </section>

      <FooterUMKM />
    </main>
  );
}