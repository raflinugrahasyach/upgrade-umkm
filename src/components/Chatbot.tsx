"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { getChatbotResponse } from "@/app/lib/services/gemini";

export interface ChatMessage {
  user?: string;
  bot?: string;
}

export interface ChatbotProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  charts: any[];
  interpretation: string;
}

const Chatbot: React.FC<ChatbotProps> = ({
  chatHistory,
  setChatHistory,
  charts,
  interpretation,
}) => {
  const [userInput, setUserInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll otomatis ke bawah saat chatHistory berubah
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Tambahkan pesan user ke chat history
    setChatHistory((prev) => [...prev, { user: userInput }]);
    const currentInput = userInput;
    setUserInput("");
    setIsTyping(true);

    try {
      // Panggil fungsi getChatbotResponse yang terintegrasi dengan Google Generative AI
      const botResponse = await getChatbotResponse(currentInput, charts, interpretation);
      setChatHistory((prev) => [...prev, { bot: botResponse }]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { bot: "Maaf, terjadi kesalahan. Silakan coba lagi." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="data-card h-[calc(100vh-2rem)] flex flex-col">
      {/* Header Chatbot */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
          <Bot className="w-6 h-6 text-orange-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gradient">Business AIssistant</h2>
          <p className="text-sm text-gray-400">Tanyakan analisis bisnis Anda</p>
        </div>
      </div>

      {/* Area Chat */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-4">
        {/* Pesan Sambutan bila chat history kosong */}
        {chatHistory.length === 0 && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-orange-500" />
            </div>
            <div className="bg-gray-800/50 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
              <p className="text-gray-200">
                Halo! Saya adalah Business AIssistant yang siap membantu menganalisis data bisnis Anda.
                Silakan tanyakan apa saja tentang data yang telah diunggah.
              </p>
            </div>
          </div>
        )}

        {chatHistory.map((chat, idx) => (
          <div key={idx}>
            {chat.user && (
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-orange-500/20 rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                  <p className="text-gray-200">{chat.user}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            )}
            {chat.bot && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-orange-500" />
                </div>
                <div className="bg-gray-800/50 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                  <p className="text-gray-200 whitespace-pre-wrap">{chat.bot}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-orange-500" />
            </div>
            <div className="bg-gray-800/50 rounded-2xl rounded-tl-none px-4 py-2">
              <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Ketik pertanyaan Anda di sini..."
          className="w-full pr-12 py-3 px-4 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-200 placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none"
          rows={1}
        />
        <button
          type="submit"
          disabled={!userInput.trim() || isTyping}
          className="absolute right-2 p-2 rounded-lg text-orange-500 hover:bg-orange-500/20 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
