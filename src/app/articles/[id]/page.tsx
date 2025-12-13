// src/app/articles/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, ArrowLeft, Clock, User, Calendar } from "lucide-react";
import Link from "next/link";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error("Error:", error);
      else setArticle(data);
      
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-black flex justify-center items-center"><Loader2 className="animate-spin text-orange-500 w-10 h-10"/></div>;

  if (!article) return <div className="min-h-screen bg-black text-white flex justify-center items-center">Artikel tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <Link href="/articles" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Artikel
          </Link>

          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mb-6">
              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 font-medium uppercase tracking-wider text-xs">
                {article.category}
              </span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.read_time}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(article.created_at).toLocaleDateString('id-ID')}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <User className="w-5 h-5 text-zinc-400" />
              </div>
              <div>
                <p className="font-medium text-white">{article.author}</p>
              </div>
            </div>
          </div>

          {article.image_url && (
            <div className="rounded-3xl overflow-hidden mb-12 border border-zinc-800 aspect-video">
              <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none text-zinc-300">
             <div className="whitespace-pre-wrap font-light leading-relaxed">
               {article.content}
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}