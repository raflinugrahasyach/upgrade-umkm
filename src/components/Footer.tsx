import React from 'react';
import { Rocket, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-zinc-800/50">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black pointer-events-none" />
      
      {/* Main content */}
      <div className="relative container mx-auto px-4 pt-20 pb-12">
        {/* Top section with grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand section */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <Rocket className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-white">UpgradeUMKM</span>
            </div>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Program transformasi digital untuk memajukan UMKM Indonesia. Bergabung bersama kami untuk membawa bisnis Anda ke level berikutnya.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group relative w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center transition-all hover:bg-orange-500"
                >
                  <social.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="md:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-6">Program</h3>
            <ul className="space-y-4">
              {programs.map((program) => (
                <li key={program.name}>
                  <Link
                    href={program.href}
                    className="text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                  >
                    {program.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-6">Kontak</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@upgradeumkm.id"
                  className="flex items-center gap-3 text-zinc-400 hover:text-orange-500 transition-colors group"
                >
                  <Mail className="w-5 h-5 text-orange-500" />
                  <span>info@upgradeumkm.id</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+6282123456789"
                  className="flex items-center gap-3 text-zinc-400 hover:text-orange-500 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>+62 821-2345-6789</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                <span>
                  Jl. Sudirman No. 123<br />
                  Jakarta Selatan, 12345<br />
                  Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} UpgradeUMKM. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-zinc-800/50 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all text-sm flex items-center gap-2"
          >
            Kembali ke Atas
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' }
];

const quickLinks = [
  { name: 'Tentang Kami', href: '/about' },
  { name: 'Event & Webinar', href: '/events' },
  { name: 'Testimoni', href: '/testimonials' },
  { name: 'Hubungi Kami', href: '/contact' }
];

const programs = [
  { name: 'Digital Marketing', href: '#' },
  { name: 'Business Management', href: '#' },
  { name: 'Financial Planning', href: '#' },
  { name: 'Market Research', href: '#' }
];

export default Footer;