"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Ticket, CheckCircle2, Video } from "lucide-react";
import Link from "next/link";

export default function EventDetailPage() {
  const { id } = useParams();
  const [evt, setEvt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const { data } = await supabase.from('events').select('*').eq('id', id).single();
      setEvt(data);
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full"></div></div>;

  if (!evt) return <div className="h-screen flex items-center justify-center">Event tidak ditemukan</div>;

  const dateObj = new Date(evt.date);
  const fullDate = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <NavbarUMKM />
      
      {/* Header Background */}
      <div className="h-96 bg-zinc-900 relative overflow-hidden">
        <img src={evt.image_url} alt="bg" className="w-full h-full object-cover opacity-40 blur-sm"/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAFAFA]"></div>
      </div>

      <div className="container mx-auto px-4 relative -mt-64 z-10 pb-20">
        <Link href="/events">
            <button className="text-white/80 hover:text-white flex items-center gap-2 mb-8 font-medium">
                <ArrowLeft className="w-5 h-5"/> Kembali ke Jadwal
            </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-zinc-100">
                    {/* Badge Kategori */}
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-flex items-center gap-2">
                        {evt.type === 'Online' ? <Video className="w-3 h-3"/> : <Ticket className="w-3 h-3"/>}
                        {evt.type} Event
                    </span>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">{evt.title}</h1>
                    
                    {/* Meta Data Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                                <Calendar className="w-5 h-5"/>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 font-bold uppercase">Tanggal</p>
                                <p className="font-semibold text-zinc-900">{fullDate}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                                <Clock className="w-5 h-5"/>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 font-bold uppercase">Waktu</p>
                                <p className="font-semibold text-zinc-900">{evt.time}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                                <MapPin className="w-5 h-5"/>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 font-bold uppercase">Lokasi</p>
                                <p className="font-semibold text-zinc-900">{evt.location}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                                <Ticket className="w-5 h-5"/>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 font-bold uppercase">Harga Tiket</p>
                                <p className={`font-bold ${evt.price === 'Gratis' ? 'text-green-600' : 'text-zinc-900'}`}>{evt.price}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <h3 className="text-xl font-bold mb-4 text-zinc-900">Deskripsi Event</h3>
                    <p className="text-zinc-600 leading-relaxed text-lg mb-8 whitespace-pre-line">
                        {evt.description}
                    </p>

                    <h3 className="text-xl font-bold mb-4 text-zinc-900">Apa yang Akan Anda Pelajari?</h3>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-zinc-600">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0"/>
                            Materi eksklusif dari praktisi berpengalaman
                        </li>
                        <li className="flex gap-3 text-zinc-600">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0"/>
                            E-Sertifikat resmi dari Upgrade UMKM
                        </li>
                        <li className="flex gap-3 text-zinc-600">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0"/>
                            Akses rekaman materi selamanya (untuk event online)
                        </li>
                    </ul>
                </div>
            </div>

            {/* Sidebar Sticky */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-zinc-100 sticky top-24">
                    <img src={evt.image_url} className="w-full rounded-2xl mb-6 shadow-sm object-cover h-48" alt="Flyer"/>
                    
                    <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:scale-[1.02] transition-transform mb-4">
                        Daftar Sekarang
                    </button>
                    
                    <p className="text-center text-xs text-zinc-400 mb-6">
                        *Kuota terbatas. Segera amankan kursi Anda.
                    </p>

                    <div className="border-t border-zinc-100 pt-6">
                        <p className="font-bold text-zinc-900 mb-3 text-center flex items-center justify-center gap-2">
                            <Share2 className="w-4 h-4"/> Bagikan Event
                        </p>
                        <div className="flex justify-center gap-4">
                             {/* Share Buttons */}
                             <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-full flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors cursor-pointer font-bold">FB</div>
                             <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors cursor-pointer font-bold">WA</div>
                             <div className="w-10 h-10 bg-zinc-100 text-zinc-600 rounded-full flex items-center justify-center hover:bg-pink-100 hover:text-pink-600 transition-colors cursor-pointer font-bold">IG</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <FooterUMKM />
    </main>
  );
}