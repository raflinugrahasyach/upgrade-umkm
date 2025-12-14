"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter } from "lucide-react"

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
    <section className="py-24 bg-[#FAFAFA] border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-orange-600 font-bold tracking-wider text-xs uppercase mb-2 block">Our Leadership</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
            Meet the <span className="text-orange-500">Team</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Para profesional di balik layar yang berdedikasi membangun ekosistem digital UMKM.
          </p>
        </motion.div>

        {/* Team Grid (Flexbox Center untuk Layout 3-2) */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(30%-1.5rem)] max-w-[300px]"
            >
              <div className="bg-white rounded-[24px] p-8 text-center border border-zinc-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center">
                
                {/* Avatar Image - Simple & Clean */}
                <div className="w-28 h-28 mb-6 relative">
                   {/* Circle Background Accent */}
                   <div className="absolute inset-0 bg-orange-50 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"/>
                   
                   {/* Image */}
                   <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-sm">
                     <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                     />
                   </div>
                </div>
                
                {/* Name */}
                <h3 className="font-bold text-zinc-900 text-lg mb-1">
                    {member.name}
                </h3>
                
                {/* Role */}
                <p className="text-sm font-medium text-orange-600 mb-4">
                    {member.role}
                </p>

                {/* Divider Kecil */}
                <div className="w-8 h-1 bg-zinc-100 rounded-full mb-4 mx-auto group-hover:bg-orange-200 transition-colors"/>
                
                {/* Full Role Description */}
                <p className="text-xs text-zinc-500 font-medium mb-6">
                    {member.fullRole}
                </p>

                {/* Social Links - Simple Icons */}
                <div className="mt-auto flex justify-center gap-4">
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href="#" 
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <Twitter className="w-4 h-4" />
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