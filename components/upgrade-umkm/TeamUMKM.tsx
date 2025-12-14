"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter } from "lucide-react"

// Data Team (Color dihapus agar seragam & profesional)
const team = [
  {
    name: "Dzakki Damar",
    role: "CEO",
    fullRole: "Chief Executive Officer",
    image: "/assets/team/dzakki.jpg",
    linkedin: "https://www.linkedin.com/in/dzakkidamar/",
  },
  {
    name: "Muhammad Rafli",
    role: "CAO",
    fullRole: "Chief Analytics Officer",
    image: "/assets/team/rafli.png",
    linkedin: "https://www.linkedin.com/in/raflinugrahasyach",
  },
  {
    name: "Muhamad Isa",
    role: "CBO",
    fullRole: "Chief Business Officer",
    image: "/assets/team/isa.jpg",
    linkedin: "https://www.linkedin.com/in/muhamad-isa-a6b017286/",
  },
  {
    name: "Azizah Jois",
    role: "CDO",
    fullRole: "Chief Design Officer",
    image: "/assets/team/jois.jpg",
    linkedin: "https://www.linkedin.com/in/azizah-jois-pradani/",
  },
  {
    name: "Melynda Isaura",
    role: "CMO",
    fullRole: "Chief Marketing Officer",
    image: "/assets/team/atus.jpg",
    linkedin: "https://www.linkedin.com/in/melyndaisaura/",
  },
]

export default function TeamUMKM() {
  return (
    <section className="py-24 bg-white border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-3 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold tracking-widest uppercase">
            Our Minds
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
            Meet the <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">Leadership</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Para profesional di balik layar yang berdedikasi membangun ekosistem digital untuk kemajuan UMKM Indonesia.
          </p>
        </motion.div>

        {/* Team Grid (Flexbox untuk Layout Piramida 3-2) */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group w-full sm:w-[calc(50%-2rem)] lg:w-[calc(30%-2rem)] max-w-[320px]"
            >
              <div className="bg-white rounded-[2rem] p-8 text-center border border-zinc-100 shadow-sm hover:shadow-2xl hover:border-orange-100 transition-all duration-500 relative overflow-hidden h-full">
                
                {/* Background Decor (Hover Effect) */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>

                {/* Avatar Image */}
                <div className="relative w-28 h-28 mx-auto mb-6">
                   {/* Ring Border Uniform (Gold/Orange) */}
                   <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-200 group-hover:border-orange-400 group-hover:rotate-180 transition-all duration-700"/>
                   
                   <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                     <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                     />
                   </div>
                </div>
                
                {/* Name */}
                <h3 className="font-bold text-zinc-900 mb-1 text-xl tracking-tight group-hover:text-orange-600 transition-colors">
                    {member.name}
                </h3>
                
                {/* Role - Elegant Swap */}
                <div className="relative h-12 overflow-hidden w-full mt-2">
                  {/* Default State: Short Role */}
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-10 group-hover:opacity-0">
                    <span className="inline-block px-3 py-1 bg-zinc-50 text-zinc-600 text-sm font-semibold rounded-lg">
                        {member.role}
                    </span>
                  </div>
                  
                  {/* Hover State: Full Role */}
                  <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                        {member.fullRole}
                    </span>
                  </div>
                </div>

                {/* Social Links - Minimalist */}
                <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-zinc-50">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-400 hover:text-[#0077b5] hover:scale-110 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="#" 
                    className="text-zinc-400 hover:text-black hover:scale-110 transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}