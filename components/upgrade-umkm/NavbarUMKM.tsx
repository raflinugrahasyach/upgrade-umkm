"use client"

import { useState, useEffect } from "react"
import { Menu, X, Rocket, ChevronDown } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Beranda", href: "#" },
  { 
    name: "Produk", 
    href: "#features",
    dropdown: ["BizTrack Monitor", "BizGuide Pro", "SkillBoost Pro", "BizConnect Hub", "BizLive Insight"]
  },
  { 
    name: "Solusi", 
    href: "#solutions",
    dropdown: ["Untuk UMKM Pemula", "Untuk UMKM Berkembang", "Untuk UMKM Mapan"]
  },
  { name: "Event", href: "#events" },
  { name: "Artikel", href: "#articles" },
]

export function NavbarUMKM() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300 ${isScrolled ? 'top-2' : 'top-4'}`}>
      <div className={`glass rounded-full px-4 py-3 md:px-6 shadow-lg ${isScrolled ? 'shadow-xl' : ''}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Rocket className="w-5 h-5 text-[#18181B]" />
            </div>
            <span className="font-bold text-lg text-[#18181B] hidden sm:block">Upgrade UMKM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className="text-[#18181B]/70 hover:text-[#18181B] transition-colors font-medium text-sm flex items-center gap-1 py-2"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />}
                </a>
                {item.dropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white border border-gray-100 rounded-2xl p-2 shadow-xl min-w-[200px]">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
                          className="block px-4 py-2.5 text-sm text-[#18181B]/70 hover:text-[#18181B] hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-[#18181B]/70 hover:text-[#18181B] font-medium px-4 py-2 transition-colors">
              Masuk
            </button>
            <button className="gradient-bg text-[#18181B] font-semibold rounded-full px-6 py-2.5 hover:opacity-90 transition-all hover:scale-105 shadow-md">
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#18181B] p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#18181B]/70 hover:text-[#18181B] hover:bg-gray-50 py-3 px-3 rounded-xl font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-200">
                <button className="text-[#18181B]/70 hover:text-[#18181B] font-medium py-2.5 text-left px-3">
                  Masuk
                </button>
                <button className="gradient-bg text-[#18181B] font-semibold rounded-full py-3 hover:opacity-90 transition-all">
                  Daftar Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
