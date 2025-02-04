'use client'

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin,  
  Users, 
  ChevronRight, 
  Search,
  ArrowRight
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black" />
          
          <div className="container mx-auto text-center relative z-10 mt-20">
            <div className="inline-block animate-bounce-slow mb-8">
              <div className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/50">
                <span className="text-orange-400 font-medium">Agenda Transformasi Digital</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
                Event & Workshop
              </span>
            </h1>
            
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12">
              Temukan berbagai kegiatan menarik untuk mengembangkan 
              bisnis Anda bersama para ahli dan pelaku UMKM lainnya
            </p>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 mb-12">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari event..."
                  className="w-full px-12 py-4 bg-zinc-900/50 border border-zinc-800 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-6 py-4 rounded-full font-medium whitespace-nowrap transition-all
                      ${selectedCategory === category.value
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                        : 'bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:border-orange-500/50'
                      }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/api/placeholder/800/600')] bg-cover bg-center group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                  </div>
                  
                  <div className="p-8">
                    <div className="mb-4">
                      <span className="px-4 py-1 rounded-full text-sm font-medium bg-orange-500/20 text-orange-400">
                        {event.category}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-orange-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-zinc-400 mb-6 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-zinc-400">
                        <Calendar className="w-5 h-5 mr-3 text-orange-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-zinc-400">
                        <MapPin className="w-5 h-5 mr-3 text-pink-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-zinc-400">
                        <Users className="w-5 h-5 mr-3 text-purple-400" />
                        {event.capacity}
                      </div>
                    </div>
                    
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-semibold hover:from-orange-600 hover:to-pink-600 transition-all group">
                      <span className="flex items-center justify-center">
                        Daftar Event
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
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
            <div className="relative p-1 rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              <div className="bg-black rounded-3xl p-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Ingin Mengadakan Event?
                </h2>
                <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">
                  Jadilah bagian dari gerakan transformasi digital UMKM Indonesia. 
                  Daftarkan event Anda dan jangkau lebih banyak peserta.
                </p>
                <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-semibold hover:from-orange-600 hover:to-pink-600 transition-all">
                  <span className="flex items-center">
                    Ajukan Event
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

const categories = [
  { value: 'all', label: 'Semua Event' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'bootcamp', label: 'Bootcamp' },
  { value: 'mentoring', label: 'Mentoring' }
];

const events = [
  {
    title: "Digital Marketing Mastery",
    category: "workshop",
    description: "Workshop intensif 2 hari untuk menguasai strategi pemasaran digital yang efektif. Pelajari SEO, Social Media Marketing, dan Email Marketing dari para praktisi.",
    date: "15-16 Februari 2025",
    location: "Hotel Grand Mercure Jakarta",
    capacity: "50 peserta"
  },
  {
    title: "E-commerce Success Strategy",
    category: "seminar",
    description: "Seminar tentang strategi sukses berjualan di marketplace dan membangun toko online sendiri. Tips dan trik dari pelaku e-commerce sukses.",
    date: "20 Februari 2025",
    location: "Ballroom Hotel Mulia Surabaya",
    capacity: "200 peserta"
  },
  {
    title: "Tech Innovation Bootcamp",
    category: "bootcamp",
    description: "Program intensif 5 hari untuk transformasi digital UMKM. Implementasi teknologi terkini untuk efisiensi operasional bisnis.",
    date: "1-5 Maret 2025",
    location: "Innovation Hub Bandung",
    capacity: "30 peserta"
  },
  {
    title: "Financial Management",
    category: "workshop",
    description: "Workshop pengelolaan keuangan digital untuk UMKM. Belajar menggunakan tools digital untuk pembukuan dan laporan keuangan.",
    date: "10 Maret 2025",
    location: "Financial Center Jakarta",
    capacity: "40 peserta"
  },
  {
    title: "Business Scaling Mentoring",
    category: "mentoring",
    description: "Program mentoring one-on-one dengan expert untuk scaling bisnis Anda. Dapatkan bimbingan personal selama 3 bulan.",
    date: "Maret - Mei 2025",
    location: "Online & Offline Meeting",
    capacity: "15 peserta"
  },
  {
    title: "Social Media Content Creation",
    category: "workshop",
    description: "Workshop pembuatan konten social media yang menarik dan efektif untuk bisnis. Tips dan trik dari content creator profesional.",
    date: "25 Maret 2025",
    location: "Creative Hub Yogyakarta",
    capacity: "45 peserta"
  }
];

export default EventsPage;