"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Rocket, Menu, X, ChevronDown, 
  BarChart3, BookOpen, Target, Network, ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase"; 
import { useRouter } from "next/navigation";

// Definisi Produk untuk Dropdown
const PRODUCTS = [
  { 
    name: "BizTrack Monitor", 
    href: "/products/biztrack", 
    desc: "Analisis data bisnis & keuangan otomatis",
    icon: BarChart3,
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  { 
    name: "BizGuide Pro", 
    href: "/products/bizguide", 
    desc: "Mentoring eksklusif dengan ahli",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  { 
    name: "SkillBoost Pro", 
    href: "/products/skillboost", 
    desc: "Platform e-learning UMKM terlengkap",
    icon: Target,
    color: "text-green-500",
    bg: "bg-green-50"
  },
  { 
    name: "BizConnect Hub", 
    href: "/products/bizconnect", 
    desc: "Jejaring B2B & marketplace supplier",
    icon: Network,
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
];

export default function NavbarUMKM() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [hoveredProduct, setHoveredProduct] = useState(false); // State untuk hover dropdown
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setUser(session.user);
    };
    checkUser();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.replace("/login");
    router.refresh();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-white/20 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-orange-500/20">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent">
            UpgradeUMKM
          </span>
        </Link>

        {/* Desktop Menu (HANYA PRODUK YANG BERUBAH) */}
        <div className="hidden md:flex items-center gap-8">
          
          {/* MEGA DROPDOWN PRODUK */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredProduct(true)}
            onMouseLeave={() => setHoveredProduct(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-orange-500 transition-colors py-2 group-hover:text-orange-500">
              Produk <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${hoveredProduct ? "rotate-180" : ""}`}/>
            </button>

            <AnimatePresence>
              {hoveredProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full -left-20 w-[600px] bg-white rounded-2xl shadow-2xl shadow-zinc-200/50 border border-zinc-100 p-2 grid grid-cols-2 gap-2 mt-2 z-50 overflow-hidden"
                >
                  {PRODUCTS.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 transition-colors group/item"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bg} ${item.color} group-hover/item:scale-110 transition-transform shadow-sm`}>
                        <item.icon className="w-5 h-5"/>
                      </div>
                      <div>
                        <h6 className="text-sm font-bold text-zinc-900 flex items-center gap-1">
                          {item.name} 
                          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-orange-500"/>
                        </h6>
                        <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Menu Lain Tetap Sama */}
          <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-orange-500 transition-colors relative group">
            Tentang Kami
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/events" className="text-sm font-medium text-zinc-600 hover:text-orange-500 transition-colors relative group">
            Event
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/articles" className="text-sm font-medium text-zinc-600 hover:text-orange-500 transition-colors relative group">
            Artikel
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/member/dashboard">
                <button className="px-5 py-2.5 bg-orange-50 text-orange-600 font-bold rounded-full hover:bg-orange-100 transition-all text-sm">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-zinc-500 hover:text-red-500 transition-colors"
              >
                Keluar
              </button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <button className="text-sm font-bold text-zinc-600 hover:text-orange-500 transition-colors">
                  Masuk
                </button>
              </Link>
              <Link href="/register">
                <button className="px-5 py-2.5 bg-gradient-to-r from-[#FBC904] to-orange-500 text-white font-bold rounded-full shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform text-sm">
                  Daftar Sekarang
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-zinc-100 p-4 md:hidden shadow-xl flex flex-col gap-4"
          >
            {/* Mobile Produk List */}
            <div className="space-y-2">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Produk Kami</p>
                {PRODUCTS.map(p => (
                    <Link key={p.name} href={p.href} className="block py-2 pl-4 border-l-2 border-transparent hover:border-orange-500 text-zinc-700 font-medium hover:text-orange-600 hover:bg-zinc-50 rounded-r-lg transition-all" onClick={() => setMobileMenuOpen(false)}>
                        {p.name}
                    </Link>
                ))}
            </div>
            
            <hr className="border-zinc-100"/>

            <Link href="/about" className="text-base font-medium text-zinc-600 py-2" onClick={() => setMobileMenuOpen(false)}>Tentang Kami</Link>
            <Link href="/events" className="text-base font-medium text-zinc-600 py-2" onClick={() => setMobileMenuOpen(false)}>Event</Link>
            <Link href="/articles" className="text-base font-medium text-zinc-600 py-2" onClick={() => setMobileMenuOpen(false)}>Artikel</Link>
            
            <div className="pt-2 flex flex-col gap-3">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 text-zinc-600 font-bold border border-zinc-200 rounded-xl">Masuk</button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20">
                  Daftar Sekarang
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}