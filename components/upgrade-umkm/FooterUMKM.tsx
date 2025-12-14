"use client"

import { Rocket, Mail, Phone, MapPin, Instagram, Youtube, Linkedin } from "lucide-react"
import Link from "next/link"

const products = [
  { name: "BizTrack Monitor", href: "#" },
  { name: "BizGuide Pro", href: "#" },
  { name: "SkillBoost Pro", href: "#" },
  { name: "BizConnect Hub", href: "#" },
  { name: "BizLive Insight", href: "#" },
]

const company = [
  { name: "Tentang Kami", href: "#" },
  { name: "Karir", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Kebijakan Privasi", href: "#" },
  { name: "Syarat & Ketentuan", href: "#" },
]

export function FooterUMKM() {
  return (
    <footer className="bg-[#F4F4F5] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-[#18181B]" />
              </div>
              <span className="font-bold text-xl text-[#18181B]">Upgrade UMKM</span>
            </Link>
            <p className="text-[#18181B]/60 text-sm leading-relaxed mb-6">
              Platform pembawa perubahan bagi UMKM di Indonesia. 
              Kami berkomitmen untuk membantu setiap pelaku usaha naik kelas melalui teknologi AI dan pendampingan profesional.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#FBC904] transition-colors group">
                <Instagram className="w-5 h-5 text-[#18181B]/60 group-hover:text-[#18181B]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#FBC904] transition-colors group">
                <Youtube className="w-5 h-5 text-[#18181B]/60 group-hover:text-[#18181B]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#FBC904] transition-colors group">
                <Linkedin className="w-5 h-5 text-[#18181B]/60 group-hover:text-[#18181B]" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-[#18181B] mb-4">Produk</h3>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.name}>
                  <a href={product.href} className="text-[#18181B]/60 hover:text-[#18181B] transition-colors text-sm">
                    {product.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-[#18181B] mb-4">Perusahaan</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-[#18181B]/60 hover:text-[#18181B] transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-[#18181B] mb-4">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#FBC904] flex-shrink-0 mt-0.5" />
                <a href="mailto:marketing@upgradeumkm.id" className="text-[#18181B]/60 hover:text-[#18181B] transition-colors text-sm">
                  marketing@upgradeumkm.id
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#FBC904] flex-shrink-0 mt-0.5" />
                <a href="tel:+6289505670305" className="text-[#18181B]/60 hover:text-[#18181B] transition-colors text-sm">
                  +62 895 0567 0305
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FBC904] flex-shrink-0 mt-0.5" />
                <span className="text-[#18181B]/60 text-sm">
                  Gedung Science Technopark ITS<br />
                  Surabaya, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#18181B]/60 text-sm">
              © {new Date().getFullYear()} PT Digital Nusantara Innovations. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[#18181B]/40 text-sm">Powered by</span>
              <span className="gradient-text font-semibold text-sm">Upgrade UMKM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
