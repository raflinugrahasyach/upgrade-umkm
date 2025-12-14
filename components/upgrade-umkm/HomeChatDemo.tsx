"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, RefreshCcw, MessageSquare, ArrowDown } from "lucide-react";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

// Helper Format Text
const formatText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-zinc-900">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

export default function HomeChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: "model", 
      text: "Halo! 👋 Saya **Smart Assistant Upgrade UMKM**.\n\nSaya siap menjadi mitra diskusi strategi bisnis Anda. Supaya sarannya lebih spesifik, boleh tahu **siapa nama Anda** dan **bisnis apa yang sedang dijalankan**?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState<{ name: string; business: string } | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // Spacer ref sudah tidak dipakai untuk target scroll, tapi tetap ada untuk layout

  // --- SCROLL LOGIC (FIXED) ---
  // Perbaikan: Menggunakan container.scrollTo() agar halaman utama TIDAK ikut turun
  const scrollToBottom = (force = false) => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;

    if (force || isNearBottom) {
        chatContainerRef.current.scrollTo({
            top: scrollHeight,
            behavior: "smooth"
        });
    } else {
        setShowScrollButton(true);
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
      if (isNearBottom) setShowScrollButton(false);
    }
  };

  // Gunakan useEffect biasa agar tidak memblokir painting awal browser
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    const isUser = lastMessage?.role === 'user';
    
    // Delay sedikit agar DOM render sempurna dulu baru scroll internal chatnya
    const timer = setTimeout(() => {
        scrollToBottom(isUser);
    }, 100);

    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  // --- AI LOGIC ---
  const generateResponse = (question: string) => {
    const q = question.toLowerCase().trim();
    const words = question.split(" ");
    const greetings = ["hai", "halo", "hi", "hello", "pagi", "siang", "sore", "malam", "tes", "cek"];

    if (!userData) {
        if (greetings.includes(q) || (words.length <= 2 && greetings.some(g => q.includes(g)))) {
            return "Halo! 👋 Senang bertemu Anda. \n\nBiar enak ngobrolnya, boleh kenalan dulu? Siapa nama Anda dan bisnis apa yang sedang digeluti?";
        }
        if (q.includes("belum") || q.includes("tidak") || q.includes("ga ada") || q.includes("rencana")) {
            const name = words[0].toLowerCase() === "saya" ? (words[1] || "Kak") : words[0];
            const cleanName = name.charAt(0).toUpperCase() + name.slice(1);
            setUserData({ name: cleanName, business: "Rencana Bisnis" });
            return `Salam kenal, **${cleanName}**! 👋\n\nBelum punya bisnis ya? Tidak masalah! Justru ini saat yang tepat untuk merancang fondasi.\n\nKira-kira, ide bisnis apa yang sedang kamu pikirkan?`;
        } 
        else {
            let name = words[0];
            if (words[0].toLowerCase() === "nama" && words[1].toLowerCase() === "saya") name = words[2];
            else if (words[0].toLowerCase() === "saya") name = words[1];
            const cleanName = name ? name.charAt(0).toUpperCase() + name.slice(1) : "Kak";
            setUserData({ name: cleanName, business: "Owner" });
            return `Halo **${cleanName}**! Wah, mantap nih bisnisnya. 🚀\n\nBiasanya tantangan UMKM nggak jauh dari **penjualan**, **stok**, atau **modal**. \n\nKira-kira mana yang paling bikin kamu pusing sekarang?`;
        }
    }

    const userName = userData.name;
    const badWords = ["jancok", "asu", "anjing", "goblok", "tolol", "bego", "bangsat"];
    if (badWords.some(word => q.includes(word))) return `Waduh **${userName}**, bahasanya dijaga dong. 😅\n\nYuk fokus lagi ke cuan. Ada masalah bisnis apa yang bisa saya bantu?`;
    
    if (greetings.includes(q)) return `Halo lagi **${userName}**! Ada yang ingin ditanyakan soal bisnisnya?`;

    if (q.includes("omzet") || q.includes("jual") || q.includes("sepi")) return `💡 **Strategi Omzet untuk ${userName}:**\n\nCoba strategi **'Loss Leader'**. Jual 1 produk populer harga modal buat mancing trafik, terus tawarin produk lain yang untungnya gede.`;
    if (q.includes("modal") || q.includes("uang") || q.includes("dana")) return `💰 **Tips Modal:**\n\n${userName}, prinsip #1: **Pisahkan Rekening Pribadi & Bisnis**. Jangan dicampur buat beli bakso ya! 😂 Catat semua arus kas agar mudah ajuin KUR.`;
    if (q.includes("ide") || q.includes("saran") || q.includes("bingung")) return `🤔 **Saran Saya:**\n\nCoba riset kecil-kecilan, ${userName}. Cari apa yang lagi trending di Google/TikTok tapi penjualnya masih dikit. Fokus ke solusi masalah orang.`;

    return `Menarik nih pertanyaannya. Tapi biar jawabannya pas, coba lebih spesifik lagi dong, ${userName}.\n\nMisalnya: "Gimana cara bikin konten viral?" atau "Cara atur gaji karyawan?".`;
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setIsTyping(true);
    
    const delay = Math.random() * 1000 + 1000; 
    setTimeout(() => {
        setMessages(prev => [...prev, { role: "model", text: generateResponse(text) }]);
        setIsTyping(false);
    }, delay);
  };

  const suggestedQuestions = !userData ? [
    "Saya Rafli, bisnis kaos",
    "Putri, jualan kuliner",
    "Zaki, belum ada bisnis",
    "Saya Budi, bengkel"
  ] : [
    "📈 Cara naikin omzet?",
    "💰 Tips atur modal?",
    "💡 Ide konten sosmed?",
    "📦 Kelola stok numpuk?"
  ];

  return (
    <section className="py-20 bg-[#FAFAFA] relative overflow-hidden w-full border-t border-zinc-100">
      <div className="absolute -left-40 top-20 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[100px] pointer-events-none"/>
      <div className="absolute -right-40 bottom-20 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[100px] pointer-events-none"/>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-200 text-orange-600 text-sm font-bold shadow-sm mb-4">
                <Sparkles className="w-4 h-4"/> Demo AI Gratis
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-4 tracking-tight">
                Konsultasi Bisnis <span className="text-orange-500">24/7</span>
            </h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
                Ceritakan bisnis Anda, dapatkan solusi strategis instan.
            </p>
        </div>

        {/* CHAT CONTAINER */}
        <div className="w-full max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-zinc-200/50 border border-zinc-200 overflow-hidden flex flex-col h-[750px] relative">
            
            {/* Header */}
            <div className="bg-white/95 backdrop-blur-sm p-5 border-b border-zinc-100 flex items-center justify-between absolute top-0 w-full z-30">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-zinc-900 leading-tight">Upgrade UMKM Assistant</h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span>
                            <span className="text-xs text-zinc-500 font-medium">Online & Siap Membantu</span>
                        </div>
                    </div>
                </div>
                <button onClick={() => { setMessages([messages[0]]); setInput(""); setUserData(null); }} className="p-2.5 text-zinc-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all group" title="Reset Percakapan">
                    <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"/>
                </button>
            </div>

            {/* Chat Area */}
            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto bg-[#FAFAFA] scroll-smooth" style={{ paddingTop: "100px", paddingBottom: "0px" }}>
                <div className="px-6 sm:px-8 space-y-6 pb-4">
                    <AnimatePresence initial={false}>
                        {messages.map((msg, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm border ${msg.role === 'user' ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-orange-100 text-orange-600'}`}>
                                    {msg.role === 'user' ? <User className="w-5 h-5"/> : <Bot className="w-6 h-6"/>}
                                </div>
                                <div className={`px-5 py-4 rounded-2xl text-[15px] leading-relaxed max-w-[85%] sm:max-w-[75%] shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-zinc-900 text-white rounded-tr-sm' : 'bg-white text-zinc-700 border border-zinc-200 rounded-tl-sm'}`}>
                                    {formatText(msg.text)}
                                </div>
                            </motion.div>
                        ))}
                        
                        {isTyping && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white border border-orange-100 text-orange-600 flex items-center justify-center shadow-sm"><Bot className="w-6 h-6"/></div>
                                <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-sm border border-zinc-200 flex gap-1.5 items-center shadow-sm w-fit">
                                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"/><span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-75"/><span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-150"/>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Spacer agar chat terakhir tidak tertutup input */}
                    <div className="h-44 w-full bg-transparent shrink-0" />
                </div>
            </div>

            <AnimatePresence>
                {showScrollButton && (
                    <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} onClick={() => scrollToBottom(true)} className="absolute bottom-40 left-1/2 -translate-x-1/2 z-30 bg-zinc-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold hover:bg-zinc-700 transition-colors">
                        <ArrowDown className="w-4 h-4"/> Pesan Baru
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-zinc-100 p-4 sm:p-6 z-30">
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-1 mask-gradient-right">
                    {suggestedQuestions.map((q, i) => (
                        <button key={i} onClick={() => handleSend(q)} className="whitespace-nowrap px-4 py-2 bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs font-semibold rounded-full hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all active:scale-95">
                            {q}
                        </button>
                    ))}
                </div>
                <div className="relative flex items-center gap-2">
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                        placeholder={!userData ? "Kenalan dulu yuk..." : "Ketik pertanyaan bisnis Anda..."}
                        className="w-full pl-6 pr-14 py-4 bg-zinc-50 border border-zinc-200 rounded-full focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-zinc-900 placeholder:text-zinc-400 text-base transition-all shadow-inner"
                    />
                    <button onClick={() => handleSend(input)} disabled={!input.trim() || isTyping} className="absolute right-2 p-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100">
                        <Send className="w-5 h-5 ml-0.5" />
                    </button>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}