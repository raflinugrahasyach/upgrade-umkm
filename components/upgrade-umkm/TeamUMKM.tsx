"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter } from "lucide-react"

const team = [
  {
    name: "Dzakki Damar",
    role: "CEO",
    fullRole: "Chief Executive Officer",
    avatar: "D",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Muhammad Rafli",
    role: "CAO",
    fullRole: "Chief Analytics Officer",
    avatar: "R",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Muhamad Isa",
    role: "CBO",
    fullRole: "Chief Business Officer",
    avatar: "I",
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Azizah",
    role: "CDO",
    fullRole: "Chief Design Officer",
    avatar: "A",
    color: "from-[#FBC904] to-[#F97316]",
  },
  {
    name: "Melynda",
    role: "CMO",
    fullRole: "Chief Marketing Officer",
    avatar: "M",
    color: "from-rose-500 to-red-600",
  },
]

export function TeamUMKM() {
  return (
    <section className="py-20 lg:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] mb-4">
            Leadership <span className="gradient-text">Team</span>
          </h2>
          <p className="text-lg text-[#18181B]/60 max-w-2xl mx-auto">
            Tim profesional yang berdedikasi untuk memajukan UMKM Indonesia
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-6 text-center border border-gray-100 card-hover relative overflow-hidden">
                {/* Avatar */}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {member.avatar}
                </div>
                
                {/* Name */}
                <h3 className="font-bold text-[#18181B] mb-1 text-lg">{member.name}</h3>
                
                {/* Role - Changes on hover */}
                <div className="relative h-6 overflow-hidden">
                  <span className="block text-sm font-medium gradient-text transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-6">
                    {member.role}
                  </span>
                  <span className="absolute inset-0 text-sm text-[#18181B]/60 transition-all duration-300 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0">
                    {member.fullRole}
                  </span>
                </div>

                {/* Social Links - Appear on hover */}
                <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#FBC904] hover:text-[#18181B] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#FBC904] hover:text-[#18181B] transition-colors">
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
