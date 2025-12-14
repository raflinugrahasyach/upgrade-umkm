"use client";

import Link from "next/link";
import { Rocket, Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";

export default function FooterUMKM() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-20 pb-10 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-1.5 bg-orange-500 rounded-lg">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-zinc-900">
                UpgradeUMKM
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Platform ekosistem digital no. 1 untuk membantu UMKM Indonesia naik kelas dengan teknologi AI dan pendampingan ahli.
            </p>
            <div className="flex gap-4">
                <a href="#" className="p-2 bg-white border border-zinc-200 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all"><Instagram className="w-4 h-4"/></a>
                <a href="#" className="p-2 bg-white border border-zinc-200 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all"><Linkedin className="w-4 h-4"/></a>
            </div>
          </div>

          {/* Kolom 2: Produk */}
          <div>
            <h4 className="font-bold text-zinc-900 mb-6 text-sm uppercase tracking-wider">Produk</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="/products/bizguide" className="hover:text-orange-600 transition-colors">BizGuide Pro</Link></li>
              <li><Link href="/products/skillboost" className="hover:text-orange-600 transition-colors">SkillBoost Pro</Link></li>
              <li><Link href="/products/biztrack" className="hover:text-orange-600 transition-colors">BizTrack Monitor</Link></li>
              <li><Link href="/products/bizconnect" className="hover:text-orange-600 transition-colors">BizConnect Hub</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Perusahaan */}
          <div>
            <h4 className="font-bold text-zinc-900 mb-6 text-sm uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><Link href="/about" className="hover:text-orange-600 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/events" className="hover:text-orange-600 transition-colors">Event</Link></li>
              <li><Link href="/articles" className="hover:text-orange-600 transition-colors">Blog / Artikel</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-600 transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h4 className="font-bold text-zinc-900 mb-6 text-sm uppercase tracking-wider">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Gedung Science Technopark ITS, Kota Surabaya 60117</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="mailto:marketing@upgradeumkm.id" className="hover:text-orange-600">marketing@upgradeumkm.id</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="https://wa.me/6289505670305" className="hover:text-orange-600">+62 895 0567 0305</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
          <p>&copy; {new Date().getFullYear()} PT Digital Nusantara Innovations. All rights reserved.</p>
          <div className="flex gap-6">
             <Link href="#" className="hover:text-zinc-600">Terms</Link>
             <Link href="#" className="hover:text-zinc-600">Privacy</Link>
             <Link href="#" className="hover:text-zinc-600">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}