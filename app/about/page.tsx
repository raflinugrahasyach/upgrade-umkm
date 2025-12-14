"use client";

import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";
import TeamUMKM from "@/components/upgrade-umkm/TeamUMKM"; // Kita reuse komponen Team
import { Target, Users, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <NavbarUMKM />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
          Membangun Masa Depan <span className="text-orange-500">UMKM Indonesia</span>
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
          Upgrade UMKM lahir dari sebuah mimpi sederhana: Mendemokratisasi teknologi canggih agar bisa diakses oleh setiap pedagang, pengrajin, dan pengusaha kecil di pelosok negeri.
        </p>
      </section>

      {/* Visi Misi Grid */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm text-center hover:border-orange-200 transition-colors">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-600">
                    <Target className="w-8 h-8"/>
                </div>
                <h3 className="text-xl font-bold mb-4">Visi Kami</h3>
                <p className="text-zinc-500">Menjadi ekosistem digital terintegrasi no. 1 yang mengantarkan 1 juta UMKM naik kelas pada tahun 2030.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm text-center hover:border-orange-200 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                    <ShieldCheck className="w-8 h-8"/>
                </div>
                <h3 className="text-xl font-bold mb-4">Komitmen</h3>
                <p className="text-zinc-500">Menyediakan data yang akurat, keamanan privasi tingkat tinggi, dan pendampingan yang tulus bagi mitra kami.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm text-center hover:border-orange-200 transition-colors">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                    <Users className="w-8 h-8"/>
                </div>
                <h3 className="text-xl font-bold mb-4">Komunitas</h3>
                <p className="text-zinc-500">Membangun jejaring kolaborasi yang kuat antar pelaku usaha untuk saling mendukung dan bertumbuh bersama.</p>
            </div>
        </div>
      </section>

      {/* Tim Kami (Reuse Component) */}
      <TeamUMKM />

      {/* Lokasi Kantor */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Markas Kami</h2>
            <div className="max-w-4xl mx-auto bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-200 p-8">
                <p className="text-xl font-semibold mb-2">Gedung Science Technopark ITS</p>
                <p className="text-zinc-500">Jl. Teknik Kimia, Keputih, Kec. Sukolilo, Surabaya, Jawa Timur 60111</p>
                <div className="mt-8 h-64 bg-zinc-200 rounded-xl flex items-center justify-center text-zinc-400">
                    {/* Nanti ganti dengan Google Maps iframe atau foto gedung */}
                    [Peta Lokasi Science Technopark ITS]
                </div>
            </div>
        </div>
      </section>

      <FooterUMKM />
    </main>
  );
}