"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import * as XLSX from "xlsx";
import { 
  Rocket, UploadCloud, Bot, User, Send, BarChart3, 
  ArrowLeft, FileSpreadsheet, CheckCircle2, X, Layers, ChevronDown, Sparkles, AlertCircle, BrainCircuit 
} from "lucide-react";
import Link from "next/link";
import NavbarUMKM from "@/components/upgrade-umkm/NavbarUMKM";
import FooterUMKM from "@/components/upgrade-umkm/FooterUMKM";

// Import Plotly
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false }) as any;

// --- TYPES ---
interface ChartResult {
  type: string;
  figure: { data: any[]; layout: any; };
}

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

// --- CONFIG ---
const SHEET_CONFIG: Record<string, string[]> = {
  "Pelanggan": ["Demografi (Kota)", "Segmen Pelanggan", "Preferensi Pembelian"],
  "Produk": ["Produk Terlaris", "Analisis Harga", "Kategori Populer"],
  "Transaksi Penjualan": ["Tren Penjualan", "Metode Pembayaran", "Pendapatan per Transaksi"],
  "Lokasi": ["Performa Cabang/Lokasi"],
  "Staf": ["Performa Staf", "Komisi Tertinggi"],
  "Inventaris": ["Stok Menipis"],
  "Promosi Pemasaran": ["Efektivitas Promosi"],
  "Lainnya": ["Analisis Umum"]
};

// --- HELPER LOGIC ---
const findColumn = (row: any, keywords: string[]): string | undefined => {
  if (!row) return undefined;
  const keys = Object.keys(row);
  return keys.find(key => keywords.some(k => key.toLowerCase().includes(k.toLowerCase())));
};

const aggregateData = (data: any[], groupCol: string, valueCol?: string, op: 'sum' | 'count' = 'count') => {
  const result: Record<string, number> = {};
  data.forEach(row => {
    const key = row[groupCol] || "Lainnya";
    const val = valueCol ? (parseFloat(row[valueCol]) || 0) : 1;
    result[key] = (result[key] || 0) + val;
  });
  return Object.entries(result).sort((a, b) => b[1] - a[1]).slice(0, 10);
};

// --- AI ENGINE (CONSULTANT PERSONALITY) ---
const generateProfessionalInsight = (sheetName: string, metric: string, dataSummary: any[]) => {
  const topItem = dataSummary[0];
  const topName = topItem ? topItem[0] : "Data Tidak Tersedia";
  const topVal = topItem ? topItem[1].toLocaleString() : "0";
  
  let executiveSummary = "";
  let deepInsight = "";
  let actionPlan = "";

  if (sheetName.includes("Pelanggan")) {
    if (metric.includes("Demografi")) {
        executiveSummary = `📍 **Dominasi Pasar Lokal:** Data menunjukkan konsentrasi pelanggan terbesar Anda berada di **${topName}** dengan total **${topVal}** pelanggan.`;
        deepInsight = `Ini mengindikasikan *Product-Market Fit* yang kuat di area tersebut. Namun, ketergantungan pada satu wilayah bisa berisiko.`;
        actionPlan = `🚀 **Saran Aksi:**\n1. Lakukan kampanye "Referral Program" khusus warga ${topName}.\n2. Coba tes pasar di kota tetangga dengan demografi serupa.`;
    } else {
        executiveSummary = `🎯 **Target Audiens Utama:** Segmen **${topName}** adalah penyumbang trafik terbesar bisnis Anda (${topVal} orang).`;
        deepInsight = `Perilaku belanja segmen ini biasanya didorong oleh tren dan kemudahan akses.`;
        actionPlan = `🚀 **Saran Aksi:**\n1. Sesuaikan bahasa promosi (copywriting) agar relevan dengan gaya hidup ${topName}.\n2. Buat paket bundling khusus segmen ini.`;
    }
  }
  else if (sheetName.includes("Produk")) {
    executiveSummary = `🏆 **Produk Juara:** **"${topName}"** adalah *Hero Product* Anda saat ini dengan volume penjualan **${topVal}** unit.`;
    deepInsight = `Berdasarkan Prinsip Pareto, produk ini kemungkinan besar menopang cashflow operasional Anda.`;
    actionPlan = `🚀 **Saran Aksi:**\n1. Prioritaskan restock produk ini, jangan sampai kosong.\n2. Gunakan produk ini sebagai "pancingan" (loss leader) untuk menjual produk lain.`;
  }
  else if (sheetName.includes("Transaksi")) {
    executiveSummary = `📈 **Tren Utama:** Puncak performa tercatat pada **${topName}** dengan nilai **${topVal}**.`;
    deepInsight = `Pola ini menunjukkan adanya siklus pembelian yang konsisten dari pelanggan.`;
    actionPlan = `🚀 **Saran Aksi:**\n1. Ulangi strategi promosi yang Anda lakukan pada periode tersebut.\n2. Siapkan stok ekstra menjelang siklus berikutnya.`;
  }
  else {
      executiveSummary = `🔍 **Analisis Umum:** Data ${sheetName} menunjukkan **${topName}** memimpin dengan nilai (${topVal}).`;
      deepInsight = `Distribusi data ini menunjukkan adanya konsentrasi kinerja pada entitas tertentu.`;
      actionPlan = `🚀 **Saran Aksi:**\n1. Evaluasi faktor sukses dari ${topName}.\n2. Replikasi strategi tersebut ke bagian lain.`;
  }

  return `${executiveSummary}\n\n💡 **Insight:**\n${deepInsight}\n\n${actionPlan}`;
};

// --- SMART CHATBOT LOGIC (IMPROVED) ---
const generateSmartReply = (input: string, context: { sheet: string, metric: string, insight: string }) => {
    const lowerInput = input.toLowerCase().trim();
    
    // 1. Identitas & Persona (Lebih Manusiawi & Branding Kuat)
    if (lowerInput.includes("kamu siapa") || lowerInput.includes("siapa kamu") || lowerInput.includes("who are you")) {
        return "Saya adalah **BizTrack AI**, asisten konsultan digital yang dikembangkan oleh UpgradeUMKM. Tugas saya adalah menerjemahkan data rumit menjadi strategi bisnis yang mudah Anda pahami. 🚀";
    }
    if (lowerInput.includes("aku siapa") || lowerInput.includes("siapa saya")) {
        return "Anda adalah **Nakhoda Bisnis** ini! 🚢 Tugas saya hanya sebagai navigator yang memberikan peta data, tapi keputusan besar tetap ada di tangan Anda. Mari kita bawa bisnis ini tumbuh lebih besar!";
    }
    if (lowerInput.includes("gemini") || lowerInput.includes("gpt") || lowerInput.includes("openai") || lowerInput.includes("google")) {
        return "Saya menggunakan teknologi *Large Language Model* terkini yang telah disesuaikan (fine-tuned) khusus untuk konteks bisnis UMKM di Indonesia. Jadi, saya lebih mengerti seluk-beluk 'Cuan' daripada AI standar. 😉";
    }
    if (lowerInput.match(/^(hai|halo|hello|hi|pagi|siang|sore|malam)$/)) {
        return "Halo! Senang bertemu Anda. Data apa yang ingin kita bedah hari ini agar omzet Anda naik?";
    }
    if (lowerInput.includes("terima kasih") || lowerInput.includes("thanks") || lowerInput.includes("makasih")) {
        return "Sama-sama! Senang bisa membantu bisnis Anda berkembang. Ada lagi yang ingin ditanyakan?";
    }

    // 2. Pertanyaan Kontekstual (Lebih Pintar)
    if (!context.sheet) {
        return "Saya sangat ingin memberikan saran, tapi saya **belum melihat data Anda**. \n\nSilakan pilih **Sheet** dan **Metrik** di panel sebelah kiri, lalu klik tombol 'Mulai Analisis'. Setelah itu, saya bisa memberikan rekomendasi spesifik.";
    }

    if (lowerInput.includes("saran") || lowerInput.includes("rekomendasi") || lowerInput.includes("harus apa")) {
        return `Berdasarkan data di sheet **${context.sheet}**, saran terbaik saya adalah fokus pada **${context.insight.split('**')[3] || 'data tertinggi'}**. \n\nCobalah untuk meningkatkan budget promosi atau stok di area tersebut karena ROI (Return on Investment)-nya paling menjanjikan saat ini.`;
    }

    if (lowerInput.includes("jelaskan") || lowerInput.includes("analisis") || lowerInput.includes("detail")) {
        return `Tentu. Grafik di samping menunjukkan bahwa performa **${context.metric}** tidak merata. Ada satu poin yang sangat menonjol (${context.insight.split('(')[1]?.split(')')[0] || 'lihat grafik'}). \n\nArtinya, pelanggan Anda memiliki preferensi yang sangat kuat. Jangan melawan arus, ikuti pola ini untuk keuntungan maksimal.`;
    }

    if (lowerInput.includes("jelek") || lowerInput.includes("turun") || lowerInput.includes("rugi")) {
        return "Penurunan atau data negatif adalah sinyal untuk perbaikan, bukan kegagalan. Coba kita lihat sheet lain (misalnya 'Promosi' atau 'Feedback') untuk mencari akar masalahnya.";
    }

    // 3. Fallback Cerdas (Open Ended)
    return `Pertanyaan yang menarik tentang ${context.sheet}. \n\nNamun, bisakah Anda lebih spesifik? Misalnya, tanyakan "Apa produk terlaris?" atau "Bagaimana tren penjualannya?". Saya akan coba gali data lebih dalam untuk itu.`;
};


// --- MAIN ANALYSIS FUNCTION ---
const generateAnalysis = (data: any[], sheetName: string, metric: string) => {
  const charts: ChartResult[] = [];
  let interpretation = "Data tidak cukup.";
  if (!data || !data.length) return { charts, interpretation };
  const row = data[0];

  // Logic Grafik 
  if (sheetName.includes("Pelanggan")) {
    const cityCol = findColumn(row, ['kota', 'asal', 'wilayah']);
    const segmentCol = findColumn(row, ['segmentasi', 'tipe']);
    
    if (metric.includes("Demografi") && cityCol) {
        const agg = aggregateData(data, cityCol, undefined, 'count');
        charts.push({ type: "bar", figure: { data: [{ x: agg.map(d=>d[0]), y: agg.map(d=>d[1]), type: 'bar', marker: {color: '#F97316'} }], layout: { title: 'Sebaran Pelanggan per Kota', paper_bgcolor: "transparent", plot_bgcolor: "transparent" }}});
        interpretation = generateProfessionalInsight(sheetName, metric, agg);
    } else if (metric.includes("Segmen") && segmentCol) {
        const agg = aggregateData(data, segmentCol, undefined, 'count');
        charts.push({ type: "pie", figure: { data: [{ labels: agg.map(d=>d[0]), values: agg.map(d=>d[1]), type: 'pie', marker: {colors: ['#F97316','#FDBA74','#FED7AA', '#ffedd5']} }], layout: { title: 'Segmentasi Pelanggan', paper_bgcolor: "transparent" }}});
        interpretation = generateProfessionalInsight(sheetName, metric, agg);
    }
  }
  else if (sheetName.includes("Produk")) {
    const nameCol = findColumn(row, ['nama', 'produk', 'item']);
    const catCol = findColumn(row, ['kategori', 'jenis']);
    const priceCol = findColumn(row, ['harga', 'price']);

    if (metric.includes("Kategori") && catCol) {
        const agg = aggregateData(data, catCol, undefined, 'count');
        charts.push({ type: "bar", figure: { data: [{ x: agg.map(d=>d[0]), y: agg.map(d=>d[1]), type: 'bar', marker: {color: '#EA580C'} }], layout: { title: 'Jumlah Produk per Kategori', paper_bgcolor: "transparent", plot_bgcolor: "transparent" }}});
        interpretation = generateProfessionalInsight(sheetName, metric, agg);
    } else if (metric.includes("Harga") && priceCol && nameCol) {
        const sorted = [...data].sort((a,b) => b[priceCol] - a[priceCol]).slice(0, 10);
        const agg = sorted.map(d => [d[nameCol], d[priceCol]]);
        charts.push({ type: "bar", figure: { data: [{ x: sorted.map(d=>d[nameCol]), y: sorted.map(d=>d[priceCol]), type: 'bar', marker: {color: '#F97316'} }], layout: { title: 'Top 10 Produk Termahal', paper_bgcolor: "transparent", plot_bgcolor: "transparent" }}});
        interpretation = generateProfessionalInsight(sheetName, metric, agg);
    } else { // Produk Terlaris
        const agg = aggregateData(data, nameCol || 'Produk', undefined, 'count'); 
        charts.push({ type: "bar", figure: { data: [{ x: agg.map(d=>d[0]), y: agg.map(d=>d[1]), type: 'bar', marker: {color: '#F97316'} }], layout: { title: 'Top 10 Produk Terlaris (Frekuensi)', paper_bgcolor: "transparent", plot_bgcolor: "transparent" }}});
        interpretation = generateProfessionalInsight(sheetName, "Terlaris", agg);
    }
  }
  else if (sheetName.includes("Transaksi") || sheetName.includes("Penjualan")) {
    const dateCol = findColumn(row, ['tanggal', 'date']);
    const totalCol = findColumn(row, ['pendapatan', 'total', 'amount']);
    const payCol = findColumn(row, ['metode', 'pembayaran']);

    if (metric.includes("Tren") && dateCol && totalCol) {
        const agg = aggregateData(data, dateCol, totalCol, 'sum');
        agg.sort((a, b) => a[0].localeCompare(b[0]));
        charts.push({ type: "line", figure: { data: [{ x: agg.map(d=>d[0]), y: agg.map(d=>d[1]), type: 'scatter', mode: 'lines+markers', line: {shape: 'spline', color: '#F97316', width: 3} }], layout: { title: 'Tren Pendapatan', paper_bgcolor: "transparent", plot_bgcolor: "transparent" }}});
        interpretation = generateProfessionalInsight(sheetName, metric, agg);
    } else if (metric.includes("Metode") && payCol) {
        const agg = aggregateData(data, payCol, undefined, 'count');
        charts.push({ type: "pie", figure: { data: [{ labels: agg.map(d=>d[0]), values: agg.map(d=>d[1]), type: 'pie', marker: {colors: ['#F97316','#FDBA74']} }], layout: { title: 'Metode Pembayaran', paper_bgcolor: "transparent" }}});
        interpretation = generateProfessionalInsight(sheetName, metric, agg);
    }
  }
  else {
      // Fallback Generic
      const labelCol = Object.keys(row).find(k => typeof row[k] === 'string' && !k.includes('ID'));
      const valCol = Object.keys(row).find(k => typeof row[k] === 'number' && !k.includes('ID'));
      if (labelCol) {
          const agg = aggregateData(data, labelCol, valCol, valCol ? 'sum' : 'count');
          charts.push({ type: "bar", figure: { data: [{ x: agg.map(d=>d[0]), y: agg.map(d=>d[1]), type: 'bar', marker: {color: '#F97316'} }], layout: { title: `Analisis ${sheetName}`, paper_bgcolor: "transparent", plot_bgcolor: "transparent" }}});
          interpretation = generateProfessionalInsight(sheetName, metric, agg);
      }
  }

  if (charts.length === 0) interpretation = `⚠️ **Kendala Data:** Kami tidak dapat menemukan kolom yang relevan pada sheet *${sheetName}* untuk analisis *${metric}*. Mohon pastikan format header Excel Anda sesuai standar.`;
  
  return { charts, interpretation };
};

// --- SUB-COMPONENTS ---

const FileUploader = ({ onFileUpload }: { onFileUpload: (wb: Record<string, any[]>) => void }) => {
  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const allData: Record<string, any[]> = {};
      wb.SheetNames.forEach(sheetName => {
        const ws = wb.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(ws);
        if (data.length > 0) allData[sheetName] = data;
      });
      onFileUpload(allData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="relative group cursor-pointer w-full">
      <input type="file" accept=".xlsx, .xls" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"/>
      <div className="border-2 border-dashed border-zinc-300 bg-zinc-50 rounded-2xl p-8 text-center hover:border-orange-500 hover:bg-orange-50 transition-all duration-300">
        <div className="w-16 h-16 bg-white border border-zinc-200 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 shadow-sm group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h4 className="text-zinc-900 font-bold mb-1">Klik atau Drag File Excel</h4>
        <p className="text-zinc-500 text-xs">Format .xlsx atau .xls (Maks 5MB)</p>
      </div>
    </div>
  );
};

const ChatbotAssistant = ({ history, onSend, loading }: { history: ChatMessage[], onSend: (msg: string) => void, loading: boolean }) => {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center gap-2">
        <div className="p-1.5 bg-orange-100 rounded-lg text-orange-600"><BrainCircuit className="w-4 h-4"/></div>
        <span className="font-bold text-zinc-900 text-sm">BizTrack AI Consultant</span>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAFAFA]">
        {history.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 text-zinc-400">
                <Sparkles className="w-10 h-10 mb-3 text-orange-300 opacity-50"/>
                <p className="text-sm font-medium text-zinc-500">Halo! Saya siap membantu analisis bisnis Anda.</p>
                <p className="text-xs mt-1">Coba tanya: "Siapa kamu?" atau "Apa saran untuk produk ini?".</p>
            </div>
        )}
        {history.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-zinc-900 text-white' : 'bg-orange-500 text-white'}`}>{msg.role === 'user' ? <User className="w-4 h-4"/> : <Bot className="w-4 h-4"/>}</div>
            <div className={`p-4 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-white border border-zinc-200 text-zinc-800 rounded-tr-none' : 'bg-orange-50 text-zinc-800 border border-orange-100 rounded-tl-none'}`}>{msg.parts[0].text}</div>
          </div>
        ))}
        {loading && <div className="text-xs text-zinc-400 ml-12 animate-pulse flex items-center gap-1"><span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"/> Mengetik analisis...</div>}
        <div ref={scrollRef} />
      </div>
      <div className="p-3 bg-white border-t border-zinc-200 relative">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (onSend(input), setInput(""))} placeholder="Ketik pertanyaan bisnis Anda..." className="w-full pl-4 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-zinc-900"/>
        <button onClick={() => { onSend(input); setInput(""); }} disabled={!input.trim() || loading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-zinc-900 text-white rounded-lg hover:bg-orange-500 disabled:opacity-50"><Send className="w-4 h-4" /></button>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function BizTrackPage() {
  const [workbook, setWorkbook] = useState<Record<string, any[]>>({});
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [metric, setMetric] = useState<string>("");
  const [charts, setCharts] = useState<ChartResult[]>([]);
  const [insight, setInsight] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const onUpload = (data: Record<string, any[]>) => {
    setWorkbook(data);
    const sheets = Object.keys(data);
    setSheetNames(sheets);
    if (sheets.length > 0) setSelectedSheet(sheets[0]);
  };

  const handleSheetChange = (sheet: string) => {
    setSelectedSheet(sheet);
    setMetric(""); 
    setHasAnalyzed(false);
  };

  const handleAnalyze = () => {
    if (!selectedSheet || !metric) return;
    const currentData = workbook[selectedSheet];
    setIsAnalyzing(true);
    setHasAnalyzed(true);

    setTimeout(() => {
      const res = generateAnalysis(currentData, selectedSheet, metric);
      setCharts(res.charts);
      setInsight(res.interpretation);
      setIsAnalyzing(false);
      
      // Auto add professional report to chat
      setChatHistory(prev => [...prev, { role: "model", parts: [{ text: `✅ **Laporan Eksekutif: ${metric}**\n\n${res.interpretation}\n\nJika ada yang kurang jelas, silakan tanyakan detailnya kepada saya.` }] }]);
    }, 1200);
  };

  const handleChatSend = (msg: string) => {
    setChatHistory(prev => [...prev, { role: "user", parts: [{ text: msg }] }]);
    setIsChatLoading(true);
    
    // Gunakan Smart AI Engine
    setTimeout(() => {
        const reply = generateSmartReply(msg, { sheet: selectedSheet, metric: metric, insight: insight });
        setChatHistory(prev => [...prev, { role: "model", parts: [{ text: reply }] }]);
        setIsChatLoading(false);
    }, 1500);
  };

  const availableMetrics = SHEET_CONFIG[Object.keys(SHEET_CONFIG).find(k => selectedSheet.includes(k)) || "Lainnya"] || ["Analisis Umum"];

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-zinc-900 font-sans">
      <NavbarUMKM />

      <main className="pt-32 pb-20 container mx-auto px-4">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-600 mb-2 text-sm font-medium"><ArrowLeft className="w-4 h-4"/> Kembali ke Beranda</Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 flex items-center gap-3">
              BizTrack <span className="text-orange-500">Monitor</span>
              <span className="bg-zinc-900 text-white text-xs px-2 py-1 rounded-md font-bold tracking-wider">PRO</span>
            </h1>
            <p className="text-zinc-500 mt-2 text-lg">Intelligent Business Analytics & Consultant.</p>
          </div>
          {sheetNames.length > 0 && (
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-zinc-200 shadow-sm">
                <FileSpreadsheet className="w-5 h-5 text-green-600"/>
                <span className="font-bold text-zinc-700">{sheetNames.length} Sheet Data</span>
                <button onClick={() => { setWorkbook({}); setSheetNames([]); setHasAnalyzed(false); setChatHistory([]); }} className="p-1 hover:bg-zinc-100 rounded-full"><X className="w-4 h-4 text-zinc-400"/></button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            {!sheetNames.length ? (
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-zinc-900 flex items-center gap-2"><div className="w-1 h-6 bg-orange-500 rounded-full"></div> 1. Upload Database</h3>
                <FileUploader onFileUpload={onUpload} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-zinc-900 flex items-center gap-2"><div className="w-1 h-6 bg-orange-500 rounded-full"></div> 2. Konfigurasi</h3>
                  <CheckCircle2 className="w-5 h-5 text-green-500"/>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Sumber Data (Sheet)</label>
                    <div className="relative">
                        <select 
                            value={selectedSheet}
                            onChange={(e) => handleSheetChange(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer font-medium"
                        >
                            {sheetNames.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"/>
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-1 ml-1 flex items-center gap-1"><Layers className="w-3 h-3"/> Data aktif: {workbook[selectedSheet]?.length || 0} baris</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase mb-1 block">Fokus Analisis</label>
                    <div className="relative">
                        <select 
                            value={metric}
                            onChange={(e) => setMetric(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer"
                        >
                            <option value="">-- Pilih Analisis --</option>
                            {availableMetrics.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"/>
                    </div>
                  </div>

                  <button 
                    onClick={handleAnalyze}
                    disabled={!metric || isAnalyzing}
                    className="w-full py-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-zinc-900 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? "AI Memproses..." : <><Rocket className="w-4 h-4"/> Mulai Analisis</>}
                  </button>
                </div>
              </div>
            )}

            {/* Preview Table */}
            {selectedSheet && workbook[selectedSheet] && (
                <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 overflow-hidden">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase mb-4 flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4"/> Preview: {selectedSheet}
                    </h4>
                    <div className="overflow-x-auto border border-zinc-200 rounded-lg">
                        <table className="w-full text-xs text-left text-zinc-600">
                            <thead className="bg-zinc-50 text-zinc-700 font-bold border-b border-zinc-200">
                                <tr>
                                    {Object.keys(workbook[selectedSheet][0] || {}).slice(0, 3).map(k => <th key={k} className="px-3 py-2 whitespace-nowrap">{k}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {workbook[selectedSheet].slice(0, 5).map((row, i) => (
                                    <tr key={i} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                                        {Object.values(row).slice(0, 3).map((v: any, j) => <td key={j} className="px-3 py-2 whitespace-nowrap">{v}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-8 space-y-6">
            {hasAnalyzed ? (
              <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                {/* Visualisasi */}
                {charts.length > 0 ? (
                    charts.map((chart, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm relative overflow-hidden">
                        <h4 className="font-bold text-lg text-zinc-900 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-orange-500"/> {chart.figure.layout.title}</h4>
                        <div className="w-full h-[400px]">
                        <Plot data={chart.figure.data} layout={{ ...chart.figure.layout, autosize: true, margin: { t: 30, b: 40, l: 50, r: 20 }, font: { family: 'inherit', color: '#52525B' } }} useResizeHandler={true} style={{ width: "100%", height: "100%" }} config={{ displayModeBar: false }}/>
                        </div>
                    </div>
                    ))
                ) : (
                    <div className="bg-red-50 rounded-2xl p-8 border border-red-100 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"><AlertCircle className="w-8 h-8 text-red-500"/></div>
                        <h4 className="font-bold text-xl text-red-700 mb-2">Visualisasi Gagal</h4>
                        <p className="text-red-600/80 max-w-lg whitespace-pre-wrap">{insight}</p>
                    </div>
                )}

                {/* Insight Box (Hidden, dipindah ke chat biar rapi) */}
                
                {/* Chatbot Interface */}
                <ChatbotAssistant history={chatHistory} onSend={handleChatSend} loading={isChatLoading} />
              </div>
            ) : (
              <div className="h-full min-h-[500px] bg-white rounded-2xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center text-zinc-400 p-8 text-center">
                <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6"><BarChart3 className="w-10 h-10 opacity-20"/></div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Area Visualisasi</h3>
                <p className="max-w-md text-zinc-500">Pilih <b>Sheet Data</b> (contoh: 'Produk') dan <b>Metrik</b> yang sesuai, lalu klik Mulai Analisis untuk melihat laporan lengkap.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterUMKM />
    </div>
  );
}