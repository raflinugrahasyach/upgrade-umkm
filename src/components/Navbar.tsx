'use client'

import React, { useState, useEffect } from 'react';
import { 
  Rocket,
  ChevronDown, 
  LineChart,
  Users,
  Laptop,
  ShoppingBag,
  BarChart,
  BookOpen,
  Calendar,
  Menu,
  X,
  Grid,
  Target,
  Globe
} from 'lucide-react';
import Link from 'next/link';
type DropdownState = 'products' | 'solutions' | null;

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownState>(null);

  useEffect(() => {
    setMounted(true);
    
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
        
        if (currentScrollY > lastScrollY && !isMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => window.removeEventListener('scroll', controlNavbar);
    }
  }, [lastScrollY, isMenuOpen]);

  if (!mounted) return null;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Rocket className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              UpgradeUMKM
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Products Dropdown */}
            <Link href="/" className="text-zinc-300 hover:text-white transition-colors relative group py-2">
              <span className="relative z-10">Home</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </Link>
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors py-2">
                <span>Produk</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'products' ? 'rotate-180' : ''
                }`} />
              </button>
              
              <div className={`absolute top-full left-0 w-80 pt-4 transition-all duration-200 ${
                activeDropdown === 'products' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}>
                <div className="bg-zinc-900/95 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-4 shadow-xl">
                  {products.map((product, index) => (
                    <Link
                      key={index}
                      href={product.href}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20">
                        {product.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{product.title}</h4>
                        <p className="text-zinc-400 text-sm">{product.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors py-2">
                <span>Solusi</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  activeDropdown === 'solutions' ? 'rotate-180' : ''
                }`} />
              </button>
              
              <div className={`absolute top-full left-0 w-[480px] pt-4 transition-all duration-200 ${
                activeDropdown === 'solutions' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}>
                <div className="bg-zinc-900/95 backdrop-blur-lg rounded-2xl border border-zinc-800/50 p-4 shadow-xl">
                  <div className="grid grid-cols-2 gap-2">
                    {solutions.map((solution, index) => (
                      <Link
                        key={index}
                        href={solution.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20">
                          {solution.icon}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{solution.title}</h4>
                          <p className="text-zinc-400 text-sm">{solution.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/events" className="text-zinc-300 hover:text-white transition-colors relative group py-2">
              <span className="relative z-10">Event</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </Link>

            <Link href="/articles" className="text-zinc-300 hover:text-white transition-colors relative group py-2">
              <span className="relative z-10">Artikel</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </Link>

            <Link href="/about" className="text-zinc-300 hover:text-white transition-colors relative group py-2">
              <span className="relative z-10">Tentang</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
            </Link>

            
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="px-4 py-2 text-white font-medium hover:text-orange-400 transition-colors">
              Masuk
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-semibold hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105">
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 transition-all duration-500 ${
            isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-6 px-4">
            <div className="flex-1 overflow-y-auto">
              {/* Mobile Products Section */}
              <div className="mb-8">
                <h3 className="text-zinc-400 font-medium mb-4 px-4">Produk</h3>
                <div className="space-y-2">
                  {products.map((product, index) => (
                    <Link
                      key={index}
                      href={product.href}
                      className="flex items-start gap-3 p-4 hover:bg-white/5 rounded-xl transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20">
                        {product.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{product.title}</h4>
                        <p className="text-zinc-400 text-sm">{product.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Solutions Section */}
              <div className="mb-8">
                <h3 className="text-zinc-400 font-medium mb-4 px-4">Solusi</h3>
                <div className="space-y-2">
                  {solutions.map((solution, index) => (
                    <Link
                      key={index}
                      href={solution.href}
                      className="flex items-start gap-3 p-4 hover:bg-white/5 rounded-xl transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-pink-500/20">
                        {solution.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{solution.title}</h4>
                        <p className="text-zinc-400 text-sm">{solution.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4 px-4">
                <Link
                  href="/events"
                  className="block text-white font-medium p-4 hover:bg-white/5 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Event
                </Link>
                <Link
                  href="/testimonials"
                  className="block text-white font-medium p-4 hover:bg-white/5 rounded-xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimoni
                </Link>
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="pt-6 px-4 border-t border-zinc-800">
              <div className="flex flex-col gap-4">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-semibold hover:from-orange-600 hover:to-pink-600 transition-all">
                  Daftar Sekarang
                </button>
                <button className="w-full px-6 py-3 border border-zinc-800 rounded-full text-white font-semibold hover:bg-white/5 transition-all">
                  Masuk
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const products = [
  {
    icon: <BookOpen className="w-5 h-5 text-orange-400" />,
    title: "BizGuide Pro",
    description: "Pendampingan personal untuk optimasi bisnis",
    href: "/products/bizguide"
  },
  {
    icon: <Target className="w-5 h-5 text-pink-400" />,
    title: "SkillBoost Pro",
    description: "Pelatihan dan sumber daya bisnis",
    href: "/products/skillboost"
  },
  {
    icon: <LineChart className="w-5 h-5 text-purple-400" />,
    title: "BizTrack Monitor",
    description: "Pemantauan kinerja real-time",
    href: "/products/biztrack"
  }
];

const solutions = [
  {
    icon: <BarChart className="w-5 h-5 text-orange-400" />,
    title: "Business Analytics",
    description: "Analisis data untuk keputusan bisnis",
    href: "/solutions/analytics"
  },
  {
    icon: <ShoppingBag className="w-5 h-5 text-pink-400" />,
    title: "E-Commerce",
    description: "Solusi penjualan online lengkap",
    href: "/solutions/ecommerce"
  },
  {
    icon: <Globe className="w-5 h-5 text-purple-400" />,
    title: "Digital Marketing",
    description: "Strategi pemasaran digital",
    href: "/solutions/marketing"
  },
  {
    icon: <Grid className="w-5 h-5 text-orange-400" />,
    title: "Automation",
    description: "Otomatisasi proses bisnis",
    href: "/solutions/automation"
  }
];

export default Navbar;