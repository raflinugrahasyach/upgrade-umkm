import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import HeroUMKM from "@/components/upgrade-umkm/HeroUMKM";
import HomeChatDemo from "@/components/upgrade-umkm/HomeChatDemo"; // Import Baru
import FeaturesUMKM from "@/components/upgrade-umkm/FeaturesUMKM";
import ProblemSolutionUMKM from "@/components/upgrade-umkm/ProblemSolutionUMKM";
import TestimonialsUMKM from "@/components/upgrade-umkm/TestimonialsUMKM";
import TeamUMKM from "@/components/upgrade-umkm/TeamUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";

export default function Home() {
  return (
    <main className="bg-white min-h-screen relative selection:bg-orange-100 selection:text-orange-900">
      <NavbarUMKM />
      
      {/* 1. Hero */}
      <HeroUMKM />
      
      {/* 2. CHAT DEMO (NEW SECTION) - Lead Magnet */}
      <HomeChatDemo />
      
      {/* 3. Masalah vs Solusi */}
      <div id="solution">
        <ProblemSolutionUMKM />
      </div>
      
      {/* 4. Fitur Produk (Bento Grid) */}
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