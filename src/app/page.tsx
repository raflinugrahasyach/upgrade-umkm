'use client'

import React, { useState, useEffect } from 'react';
import { 
  Rocket, ChevronRight, ArrowRight, Users, Target, 
  TrendingUp, Star, ArrowDown, Quote, Lightbulb,
  LineChart, Globe, Video, Network, BookOpen
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
        
        <div className="container mx-auto text-center relative z-10 mt-20">
          <div className="inline-block animate-bounce-slow mb-8">
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/50">
              <span className="text-orange-400 font-medium">Transformasi Digital UMKM</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
              Upgrade Bisnis Anda
            </span>
            <br />
            <span className="text-white">Menuju Era Digital</span>
          </h1>
          
          <p className="text-zinc-400 text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Program inovatif yang membawa UMKM Indonesia ke level berikutnya 
            dengan teknologi modern dan strategi digital
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-semibold hover:from-orange-600 hover:to-pink-600 transition-all">
              <span className="flex items-center">
                Mulai Sekarang
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="group px-8 py-4 border border-zinc-700 hover:border-zinc-500 rounded-full text-white font-semibold transition-all hover:bg-white/5">
              <span className="flex items-center">
                Pelajari Lebih Lanjut
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <ArrowDown className="w-6 h-6 text-zinc-500 mx-auto animate-bounce" />
        </div>
      </section>
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent opacity-50" />
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl"
                style={{
                  width: `${Math.random() * 400 + 200}px`,
                  height: `${Math.random() * 400 + 200}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 20}s infinite linear`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Fitur <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">Unggulan</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Solusi lengkap untuk transformasi digital bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setActiveFeature(null)}

                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="relative p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 overflow-hidden h-full">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-zinc-400 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <button className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors">
                      <span>Selengkapnya</span>
                      <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Hover effect corner decorations */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-orange-500/0 group-hover:border-orange-500/50 transition-all duration-300 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-500/0 group-hover:border-pink-500/50 transition-all duration-300 rounded-br-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section with Hover Effects */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Manfaat Program
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Dapatkan akses ke berbagai fitur unggulan yang akan membantu 
              mengembangkan bisnis Anda secara signifikan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-sm hover:bg-zinc-800/50 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Kisah Sukses
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Dengarkan langsung dari para pelaku UMKM yang telah berhasil 
              mentransformasi bisnis mereka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-black/30 backdrop-blur-sm border border-zinc-800 hover:border-orange-500/50 transition-all"
              >
                <Quote className="w-10 h-10 text-orange-500 mb-6" />
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500" />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-zinc-500">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* Enhanced CTA Section */}
   <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="relative p-1 rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 animate-pulse" />
            
            <div className="relative bg-black rounded-3xl p-16 text-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Siap Mengembangkan Bisnis Anda?
              </h2>
              <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
                Bergabunglah dengan ribuan UMKM yang telah berhasil bertransformasi 
                melalui program Upgrade UMKM
              </p>
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-semibold hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105">
                <span className="flex items-center">
                  Mulai Perjalanan Anda
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
};

const advancedFeatures = [
  {
    icon: <BookOpen className="w-8 h-8 text-orange-400" />,
    title: "BizGuide Pro",
    description: "Dapatkan pendampingan personal dari expert bisnis untuk mengoptimalkan strategi dan pertumbuhan UMKM Anda."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-pink-400" />,
    title: "SkillBoost Pro",
    description: "Akses tak terbatas ke ribuan materi pelatihan dan sumber daya untuk meningkatkan kemampuan bisnis Anda."
  },
  {
    icon: <LineChart className="w-8 h-8 text-purple-400" />,
    title: "BizTrack Monitor",
    description: "Pantau dan analisis kinerja bisnis Anda secara real-time dengan dashboard yang informatif dan mudah dipahami."
  },
  {
    icon: <Globe className="w-8 h-8 text-orange-400" />,
    title: "DigiMarket Access",
    description: "Perluas jangkauan bisnis Anda ke pasar digital dengan akses ke berbagai marketplace dan platform e-commerce."
  },
  {
    icon: <Video className="w-8 h-8 text-pink-400" />,
    title: "BizLive Insight",
    description: "Ikuti webinar eksklusif dan dapatkan insight terbaru dari para pelaku bisnis sukses dan pakar industri."
  },
  {
    icon: <Network className="w-8 h-8 text-purple-400" />,
    title: "BizConnect Hub",
    description: "Bangun jaringan bisnis yang kuat dan temukan peluang kolaborasi dengan sesama pelaku UMKM."
  }
];

const features = [
  {
    icon: <Users className="w-8 h-8 text-orange-400" />,
    title: "Pendampingan Ahli",
    description: "Dapatkan bimbingan langsung dari para ahli digital marketing dan manajemen bisnis berpengalaman untuk mengembangkan strategi yang tepat."
  },
  {
    icon: <Target className="w-8 h-8 text-pink-400" />,
    title: "Pelatihan Terstruktur",
    description: "Kurikulum yang dirancang khusus dan terstruktur untuk memastikan Anda dapat menguasai setiap aspek bisnis digital dengan mudah."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
    title: "Akses Pasar Digital",
    description: "Perluas jangkauan bisnis Anda ke pasar digital yang lebih luas dengan strategi pemasaran modern dan efektif."
  }
];

const testimonials = [
  {
    content: "Program ini benar-benar membuka mata saya tentang potensi digital. Penjualan kami meningkat 300% dalam 6 bulan pertama setelah mengikuti program.",
    name: "Sarah Wijaya",
    business: "Batik Modern Collection"
  },
  {
    content: "Pendampingan yang luar biasa dan materi yang sangat relevan. Sekarang kami punya pelanggan dari seluruh Indonesia berkat strategi digital yang dipelajari.",
    name: "Budi Santoso",
    business: "Kuliner Nusantara"
  },
  {
    content: "Awalnya ragu dengan teknologi, tapi tim Upgrade UMKM sangat sabar membimbing. Sekarang bisnis kami sudah go digital dan omset meningkat signifikan.",
    name: "Linda Kusuma",
    business: "Handmade Craft"
  }
];

export default LandingPage;