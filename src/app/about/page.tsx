'use client'

import React from 'react';
import { 
  Rocket, 
  Target, 
  Award,
  ArrowRight,
  CheckCircle2,
  Building2,
  Gem,
  HandshakeIcon,
  ChevronRight,
  BarChart3,
  Globe2
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>
          
          <div className="container mx-auto text-center relative z-10 mt-20">
            <div className="inline-block animate-bounce-slow mb-8">
              <div className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/50">
                <span className="text-orange-400 font-medium">Tentang Kami</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
                Transformasi Digital UMKM Indonesia
              </span>
            </h1>
            
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12">
              Mendukung pertumbuhan UMKM Indonesia melalui digitalisasi dan inovasi 
              untuk menciptakan ekosistem bisnis yang lebih kuat
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-all" />
                  <div className="relative h-full rounded-3xl bg-zinc-900/90 p-8 backdrop-blur-xl border border-zinc-800">
                    <div className="mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </h3>
                    <p className="text-zinc-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-all" />
                <div className="relative h-full rounded-3xl bg-zinc-900/90 p-8 backdrop-blur-xl border border-zinc-800">
                  <div className="mb-6">
                    <Target className="w-12 h-12 text-orange-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Visi Kami</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    Menjadi katalisator utama dalam transformasi digital UMKM Indonesia, 
                    menciptakan ekosistem bisnis yang inklusif dan berdaya saing global.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-all" />
                <div className="relative h-full rounded-3xl bg-zinc-900/90 p-8 backdrop-blur-xl border border-zinc-800">
                  <div className="mb-6">
                    <Rocket className="w-12 h-12 text-pink-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Misi Kami</h3>
                  <ul className="space-y-4">
                    {missions.map((mission, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="w-6 h-6 text-orange-400 mt-1 mr-4 flex-shrink-0" />
                        <span className="text-zinc-400">{mission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Program Unggulan</h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                Berbagai program inovatif yang kami rancang untuk mendukung 
                pertumbuhan dan digitalisasi UMKM Indonesia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-all" />
                  <div className="relative h-full rounded-3xl bg-zinc-900/90 p-8 backdrop-blur-xl border border-zinc-800 hover:border-orange-500/50 transition-all">
                    <div className="mb-6">
                      {program.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{program.title}</h3>
                    <p className="text-zinc-400 mb-6">{program.description}</p>
                    <button className="flex items-center text-orange-400 hover:text-orange-300 transition-colors group">
                      <span>Pelajari Lebih Lanjut</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-xl opacity-20" />
              <div className="relative p-1 rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                <div className="bg-black rounded-3xl p-16 text-center backdrop-blur-xl">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    Siap Bertransformasi Digital?
                  </h2>
                  <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
                    Bergabunglah dengan ribuan UMKM yang telah sukses bertransformasi 
                    digital bersama kami. Mari mulai perjalanan Anda sekarang!
                  </p>
                  <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all">
                    <span className="flex items-center">
                      Mulai Sekarang
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
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

const stats = [
  {
    icon: <Building2 className="w-8 h-8 text-orange-400" />,
    value: "10,000+",
    label: "UMKM Terdaftar"
  },
  {
    icon: <Award className="w-8 h-8 text-pink-400" />,
    value: "500+",
    label: "Program Berhasil"
  },
  {
    icon: <HandshakeIcon className="w-8 h-8 text-purple-400" />,
    value: "150+",
    label: "Mitra Strategis"
  },
  {
    icon: <Globe2 className="w-8 h-8 text-orange-400" />,
    value: "34",
    label: "Provinsi Terjangkau"
  }
];

const missions = [
  "Memfasilitasi akses teknologi digital yang terjangkau dan mudah digunakan untuk UMKM",
  "Memberikan pelatihan dan pendampingan komprehensif dalam transformasi digital",
  "Membangun jaringan kolaborasi antara UMKM, teknologi provider, dan pasar",
  "Mendorong inovasi dan adopsi teknologi untuk meningkatkan daya saing UMKM"
];

const programs = [
  {
    icon: <Rocket className="w-12 h-12 text-orange-400" />,
    title: "Digital Bootcamp",
    description: "Program intensif 3 bulan untuk transformasi digital total, dari strategi hingga implementasi"
  },
  {
    icon: <Gem className="w-12 h-12 text-pink-400" />,
    title: "Mentoring Bisnis",
    description: "Pendampingan one-on-one dengan expert untuk optimasi proses bisnis digital"
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-purple-400" />,
    title: "Akselerasi Growth",
    description: "Program khusus untuk scale-up bisnis melalui teknologi dan strategi digital"
  }
];

export default AboutPage;