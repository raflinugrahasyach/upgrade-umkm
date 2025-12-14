"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Video, Ticket } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true }); // Urutkan dari tanggal terdekat
      
      if (!error) setEvents(data || []);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  // Format Tanggal Cantik (25 Des)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
        day: date.getDate(),
        month: date.toLocaleDateString('id-ID', { month: 'short' }),
        full: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <NavbarUMKM />
      
      {/* Hero Header Events */}
      <section className="pt-32 pb-16 px-4 bg-white border-b border-zinc-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

        <div className="container mx-auto text-center max-w-3xl relative z-10">
          <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">Upgrade Skill Anda</span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">
            Jadwal <span className="text-blue-600">Event & Webinar</span>
          </h1>
          <p className="text-lg text-zinc-500 mb-8">
            Ikuti berbagai pelatihan, workshop, dan sesi networking untuk memperluas wawasan dan jaringan bisnis Anda.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 container mx-auto px-4">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="bg-zinc-200 h-80 rounded-3xl animate-pulse"/>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((evt, index) => {
               const dateObj = formatDate(evt.date);
               return (
                <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                    {/* Image Area */}
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={evt.image_url} 
                            alt={evt.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Date Badge */}
                        <div className="absolute top-4 left-4 bg-white rounded-xl p-2 text-center min-w-[60px] shadow-lg">
                            <span className="block text-xl font-bold text-zinc-900 leading-none">{dateObj.day}</span>
                            <span className="block text-xs font-bold text-zinc-500 uppercase">{dateObj.month}</span>
                        </div>
                        {/* Type Badge */}
                        <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            {evt.type === 'Online' ? <Video className="w-3 h-3"/> : <MapPin className="w-3 h-3"/>}
                            {evt.type}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-zinc-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {evt.title}
                        </h3>
                        
                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <Clock className="w-4 h-4 text-orange-500"/>
                                <span>{evt.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <MapPin className="w-4 h-4 text-orange-500"/>
                                <span className="line-clamp-1">{evt.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <Ticket className="w-4 h-4 text-orange-500"/>
                                <span className={evt.price === 'Gratis' ? 'text-green-600 font-bold' : 'font-semibold'}>
                                    {evt.price}
                                </span>
                            </div>
                        </div>

                        <Link href={`/events/${evt.id}`} className="mt-auto">
                            <button className="w-full py-3 rounded-xl border border-zinc-200 text-zinc-900 font-bold hover:bg-zinc-900 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:border-zinc-900">
                                Detail Event <ArrowRight className="w-4 h-4"/>
                            </button>
                        </Link>
                    </div>
                </motion.div>
               )
            })}
          </div>
        )}
      </section>

      <FooterUMKM />
    </main>
  );
}