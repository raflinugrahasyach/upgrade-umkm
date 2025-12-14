import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import HeroUMKM from "@/components/upgrade-umkm/HeroUMKM";
import FeaturesUMKM from "@/components/upgrade-umkm/FeaturesUMKM";
import ProblemSolutionUMKM from "@/components/upgrade-umkm/ProblemSolutionUMKM";
import TestimonialsUMKM from "@/components/upgrade-umkm/TestimonialsUMKM";
import TeamUMKM from "@/components/upgrade-umkm/TeamUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";

// HAPUS import DashboardPreviewSection

export default function Home() {
  return (
    <main className="bg-white min-h-screen relative selection:bg-orange-100 selection:text-orange-900">
      
      {/* 1. Navbar */}
      <NavbarUMKM />
      
      {/* 2. Hero Section (Yang visual kanannya sudah diperbaiki jadi Chart Animasi) */}
      <HeroUMKM />
      
      {/* 3. Masalah vs Solusi */}
      <div id="solution">
        <ProblemSolutionUMKM />
      </div>
      
      {/* 4. Fitur Produk (Versi Bento Grid yang Benar) */}
      <div id="features">
        <FeaturesUMKM />
      </div>
      
      {/* 5. Testimoni */}
      <TestimonialsUMKM />
      
      {/* 6. Tim */}
      <TeamUMKM />
      
      {/* 7. Footer */}
      <FooterUMKM />
      
    </main>
  );
}