"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface ChatbotProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  charts?: any;
  interpretation?: string;
}

export default function Chatbot({ chatHistory, setChatHistory, interpretation }: ChatbotProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", parts: [{ text: input }] };
    setChatHistory((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulasi respon AI (Nanti bisa diganti API Gemini beneran)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: "model",
        parts: [{ text: `Berdasarkan data di atas, ${input} menunjukkan tren yang positif. Fokus pada produk terlaris Anda.` }]
      };
      setChatHistory((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center gap-2">
        <Bot className="w-5 h-5 text-green-400" />
        <span className="font-bold text-gray-200">BizTrack AI Assistant</span>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Welcome Message */}
        <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-green-400"/>
            </div>
            <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none text-sm text-gray-300">
                Halo! Saya asisten AI Anda. Data sudah dianalisis. Ada yang ingin ditanyakan lebih detail?
            </div>
        </div>

        {/* Interpretation from Analyze */}
        {interpretation && (
             <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-green-400"/>
                </div>
                <div className="bg-gray-800 p-3 rounded-2xl rounded-tl-none text-sm text-gray-300 whitespace-pre-line">
                    {interpretation}
                </div>
            </div>
        )}

        {/* History */}
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-900/50' : 'bg-green-900/50'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-blue-400"/> : <Bot className="w-4 h-4 text-green-400"/>}
            </div>
            <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-300 rounded-tl-none'}`}>
                {msg.parts[0].text}
            </div>
          </div>
        ))}
        
        {loading && <div className="text-xs text-gray-500 ml-12">AI sedang mengetik...</div>}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800">
        <div className="relative">
            <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya tentang data Anda..."
                className="w-full bg-gray-950 border border-gray-700 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-orange-500"
            />
            <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
            >
                <Send className="w-4 h-4 text-white" />
            </button>
        </div>
      </div>
    </div>
  );
}