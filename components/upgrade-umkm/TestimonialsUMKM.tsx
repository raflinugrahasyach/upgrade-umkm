"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Daffa",
    location: "Sidoarjo",
    business: "Usaha Pakaian",
    text: "Layanan dukungan bikin mudah. Sekarang saya lebih percaya diri mengembangkan bisnis karena ada pendampingan yang jelas.",
    rating: 5,
  },
  {
    name: "Intan",
    location: "Surabaya",
    business: "Produk Kecantikan",
    text: "Produk kecantikan jadi jelas datanya pakai BizTrack. Saya bisa lihat produk mana yang laris dan mana yang perlu dipromosikan.",
    rating: 5,
  },
  {
    name: "Zalwa",
    location: "Malang",
    business: "Aksesoris Interior",
    text: "Pemasaran digital jadi lancar. Dulu bingung cara promosi online, sekarang sudah paham strategi yang tepat.",
    rating: 5,
  },
  {
    name: "Ahmad",
    location: "Jakarta",
    business: "Kuliner",
    text: "Platform ini benar-benar membantu UMKM seperti saya untuk naik kelas. Fitur analitiknya sangat berguna!",
    rating: 5,
  },
  {
    name: "Siti",
    location: "Bandung",
    business: "Fashion Muslim",
    text: "Komunitas BizConnect Hub sangat supportive. Banyak dapat insight dari sesama pelaku UMKM.",
    rating: 5,
  },
  {
    name: "Budi",
    location: "Yogyakarta",
    business: "Kerajinan",
    text: "SkillBoost Pro membantu saya belajar digital marketing dengan waktu yang fleksibel. Recommended!",
    rating: 5,
  },
]

export default function TestimonialsUMKM() {
  // 1. KITA BUAT SALINAN DATA YANG DIBALIK AGAR DATA ASLI AMAN
  const reversedTestimonials = [...testimonials].reverse();

  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] mb-4">
            Apa Kata <span className="gradient-text">Mereka</span>
          </h2>
          <p className="text-lg text-[#18181B]/60 max-w-2xl mx-auto">
            Ribuan UMKM telah merasakan manfaat dari platform kami
          </p>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        {/* First Row - Left to Right */}
        <div className="flex gap-6 animate-marquee mb-6">
          {/* Kita gandakan array biar loopingnya mulus (infinite effect) */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div 
              key={`row1-${index}`} // Key harus unik
              className="flex-shrink-0 w-[350px] bg-gradient-to-br from-[#FBC904]/5 to-[#F97316]/5 rounded-3xl p-6 border border-[#FBC904]/20"
            >
              <Quote className="w-8 h-8 text-[#FBC904] mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FBC904] text-[#FBC904]" />
                ))}
              </div>
              
              <p className="text-[#18181B]/80 mb-6 leading-relaxed">"{testimonial.text}"</p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-[#18181B] font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[#18181B]">{testimonial.name}</div>
                  <div className="text-sm text-[#18181B]/60">{testimonial.business} • {testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Right to Left */}
        {/* Perhatikan style animation reverse di sini */}
        <div className="flex gap-6" style={{ animation: "marquee 40s linear infinite reverse" }}>
          {/* GUNAKAN reversedTestimonials YANG SUDAH KITA COPY DI ATAS */}
          {[...reversedTestimonials, ...reversedTestimonials].map((testimonial, index) => (
            <div 
              key={`row2-${index}`} // Key harus unik
              className="flex-shrink-0 w-[350px] bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 border border-orange-100"
            >
              <Quote className="w-8 h-8 text-[#F97316] mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FBC904] text-[#FBC904]" />
                ))}
              </div>
              
              <p className="text-[#18181B]/80 mb-6 leading-relaxed">"{testimonial.text}"</p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-[#18181B] font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[#18181B]">{testimonial.name}</div>
                  <div className="text-sm text-[#18181B]/60">{testimonial.business} • {testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}