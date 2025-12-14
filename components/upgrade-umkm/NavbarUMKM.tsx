"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Rocket, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase"; 
import { useRouter } from "next/navigation";

export default function NavbarUMKM() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
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

  // MENU NAVBAR PROFESIONAL
  const navLinks = [
    { name: "Produk", href: "/#features" }, // Langsung scroll ke fitur
    { name: "Tentang Kami", href: "/about" }, // Halaman baru
    { name: "Event", href: "/events" },
    { name: "Artikel", href: "/articles" },
  ];

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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-600 hover:text-orange-500 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-zinc-600 py-2 border-b border-zinc-50 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
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