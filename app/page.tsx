import { NavbarUMKM } from "@/components/upgrade-umkm/NavbarUMKM"
import { HeroUMKM } from "@/components/upgrade-umkm/HeroUMKM"
import { ProblemSolutionUMKM } from "@/components/upgrade-umkm/ProblemSolutionUMKM"
import { FeaturesUMKM } from "@/components/upgrade-umkm/FeaturesUMKM"
import { TestimonialsUMKM } from "@/components/upgrade-umkm/TestimonialsUMKM"
import { TeamUMKM } from "@/components/upgrade-umkm/TeamUMKM"
import { FooterUMKM } from "@/components/upgrade-umkm/FooterUMKM"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-hidden">
      <NavbarUMKM />
      <main>
        <HeroUMKM />
        <ProblemSolutionUMKM />
        <FeaturesUMKM />
        <TestimonialsUMKM />
        <TeamUMKM />
      </main>
      <FooterUMKM />
    </div>
  )
}
