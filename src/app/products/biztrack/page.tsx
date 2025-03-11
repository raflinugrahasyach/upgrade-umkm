"use client";

import { useState, useEffect } from "react";
import FileUploader from "../../../components/FileUploader";
import DataTable from "../../../components/DataTable";
import Chatbot from "../../../components/Chatbot";
import dynamic from "next/dynamic";

// Gunakan dynamic import untuk react-plotly.js agar tidak dirender di server
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false }) as any;

import { Rocket, BarChart3, MessageSquare, MessageCircle } from "lucide-react";
import {
  visualizePelanggan,
  visualizeProduk,
  visualizeTransaksiPenjualan,
  visualizeLokasiPenjualan,
  visualizeStafPenjualan,
  visualizeInventaris,
  visualizePromosiPemasaran,
  visualizeFeedbackPengembalian,
  visualizeAnalisisPenjualan,
  visualizeLainnya,
} from "../../../app/lib/services/visualize";
import "./styles.css";

const businessOptions: Record<string, string[]> = {
  Pelanggan: [
    "Analisis demografi pelanggan",
    "Distribusi usia dan jenis kelamin pelanggan",
    "Segmentasi pelanggan berdasarkan preferensi",
  ],
  Produk: [
    "Kinerja penjualan produk dan stok",
    "Distribusi penjualan berdasarkan kategori produk",
    "Analisis harga produk dan trend penjualan",
  ],
  "Transaksi Penjualan": [
    "Jumlah penjualan, pendapatan, dan metode pembayaran",
    "Tren penjualan",
  ],
  "Lokasi Penjualan": ["Kinerja penjualan di berbagai lokasi"],
  "Staf Penjualan": ["Kinerja dan komisi staf penjualan"],
  Inventaris: ["Manajemen stok produk"],
  "Promosi dan Pemasaran": ["Efektivitas kampanye promosi"],
  "Feedback dan Pengembalian": ["Masalah dan kepuasan pelanggan"],
  "Analisis Penjualan": ["Penjualan agregat dan tren"],
  Lainnya: ["Analisis tambahan dan faktor eksternal"],
};

export default function Page() {
  // State untuk menyimpan data dan pilihan
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<"dashboard" | "chatbot">("dashboard");
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [selectedBusinessInfo, setSelectedBusinessInfo] = useState<string>("");
  const [charts, setCharts] = useState<any[]>([]);
  const [interpretation, setInterpretation] = useState<string>("");
  const [typingInterpretation, setTypingInterpretation] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ user?: string; bot?: string }[]>([]);

  // Handler untuk file upload
  const handleFileUpload = (data: { sheets: any; sheetNames: string[] }) => {
    setUploadedData(data.sheets);
    setSheetNames(data.sheetNames);
  };

  // Update visualisasi & interpretasi ketika pilihan berubah
  useEffect(() => {
    const updateVisualization = async () => {
      if (selectedSheet && selectedBusinessInfo && uploadedData) {
        const sheetData = uploadedData[selectedSheet];
        let result: { charts: any[]; interpretation: string };
        try {
          switch (selectedSheet) {
            case "Pelanggan":
              result = await visualizePelanggan(sheetData, selectedBusinessInfo);
              break;
            case "Produk":
              result = await visualizeProduk(sheetData, selectedBusinessInfo);
              break;
            case "Transaksi Penjualan":
              result = await visualizeTransaksiPenjualan(sheetData, selectedBusinessInfo);
              break;
            case "Lokasi Penjualan":
              result = await visualizeLokasiPenjualan(sheetData, selectedBusinessInfo);
              break;
            case "Staf Penjualan":
              result = await visualizeStafPenjualan(sheetData, selectedBusinessInfo);
              break;
            case "Inventaris":
              result = await visualizeInventaris(sheetData, selectedBusinessInfo);
              break;
            case "Promosi dan Pemasaran":
              result = await visualizePromosiPemasaran(sheetData, selectedBusinessInfo);
              break;
            case "Feedback dan Pengembalian":
              result = await visualizeFeedbackPengembalian(sheetData, selectedBusinessInfo);
              break;
            case "Analisis Penjualan":
              result = await visualizeAnalisisPenjualan(sheetData, selectedBusinessInfo);
              break;
            case "Lainnya":
              result = await visualizeLainnya(sheetData, selectedBusinessInfo);
              break;
            default:
              result = { charts: [], interpretation: "Pilihan informasi bisnis tidak ditemukan." };
          }
          setCharts(result.charts);
          setInterpretation(result.interpretation);
          // Efek pengetikan untuk interpretasi
          let idx = 0;
          setTypingInterpretation("");
          const interval = setInterval(() => {
            idx++;
            setTypingInterpretation(result.interpretation.slice(0, idx));
            if (idx >= result.interpretation.length) clearInterval(interval);
          }, 4);
        } catch (error) {
          console.error("Error updating visualization:", error);
        }
      }
    };
    updateVisualization();
  }, [selectedSheet, selectedBusinessInfo, uploadedData]);

  return (
    <div className="biztrack-container">
      <div className="biztrack-content">
        {/* Header Section */}
        <div className="text-center mb-12 biztrack-fade-in">
          <div className="biztrack-badge inline-flex mb-4">
            <Rocket className="w-4 h-4 mr-2 text-orange-500" />
            <span className="text-sm text-orange-500">Analisis Bisnis AI</span>
          </div>
          <h1 className="biztrack-title">Pantau Kinerja Bisnis Kamu!</h1>
          <p className="biztrack-subtitle">
            Dapatkan informasi dan rekomendasi bisnis berbasis AI dengan mudah. Transformasi digital untuk UMKM Indonesia.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="biztrack-card biztrack-card-hover sticky top-8">
              <div className="space-y-6">
                {/* Upload Section dengan WhatsApp di antara judul dan area unggah */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-orange-500" />
                    Unggah Data
                  </h3>
                  {/* WhatsApp Contact Link */}
                  <a
                    href="https://wa.me/6289505670305?text=Halo%20admin%20Upgrade%20UMKM%20%F0%9F%98%8A%20mau%20konsultasi%20Analisis%20Bisnis%20berbasis%20Artificial%20Intelligence%20untuk%20pantau%20kinerja%20bisnis%20saya%20dong"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="biztrack-wa-button mb-4 block"
                  >
                    <div className="biztrack-wa-icon-container">
                      <MessageCircle className="biztrack-wa-icon" />
                    </div>
                    <div className="biztrack-wa-content">
                      <span className="biztrack-wa-title">Butuh Bantuan?</span>
                      <span className="biztrack-wa-text">
                        Klik disini untuk konsultasi Analisis Bisnis AI
                      </span>
                    </div>
                  </a>
                  {/* Upload Area */}
                  <div className="biztrack-upload">
                    <FileUploader onFileUpload={handleFileUpload} />
                  </div>
                </div>

                {/* Navigation */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-500" />
                    Menu Utama
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedTab("dashboard")}
                      className={`biztrack-nav-btn ${
                        selectedTab === "dashboard" ? "biztrack-nav-btn-active" : "biztrack-nav-btn-inactive"
                      }`}
                    >
                      <BarChart3 className="w-5 h-5" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => setSelectedTab("chatbot")}
                      className={`biztrack-nav-btn ${
                        selectedTab === "chatbot" ? "biztrack-nav-btn-active" : "biztrack-nav-btn-inactive"
                      }`}
                    >
                      <MessageSquare className="w-5 h-5" />
                      Chatbot
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 biztrack-fade-in">
            {selectedTab === "dashboard" ? (
              <div className="space-y-8">
                {uploadedData ? (
                  <>
                    {/* Data Selection */}
                    <div className="biztrack-card">
                      <h2 className="text-xl font-semibold mb-6">Pilih Data Analisis</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">
                            Kategori Data
                          </label>
                          <select
                            value={selectedSheet}
                            onChange={(e) => {
                              setSelectedSheet(e.target.value);
                              setSelectedBusinessInfo("");
                            }}
                            className="biztrack-select"
                          >
                            <option value="">-- Pilih kategori --</option>
                            {sheetNames.map((name) => (
                              <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {selectedSheet && (
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                              Informasi Bisnis
                            </label>
                            <select
                              value={selectedBusinessInfo}
                              onChange={(e) => setSelectedBusinessInfo(e.target.value)}
                              className="biztrack-select"
                            >
                              <option value="">-- Pilih informasi --</option>
                              {(businessOptions[selectedSheet] || []).map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Data Table */}
                    {selectedSheet && (
                      <div className="biztrack-card biztrack-scroll">
                        <h2 className="text-xl font-semibold mb-6">Data yang Diunggah</h2>
                        <DataTable data={uploadedData[selectedSheet]} />
                      </div>
                    )}

                    {/* Visualizations */}
                    {charts.length > 0 && (
                      <div className="space-y-8">
                        {charts.map((chart, idx) => (
                          <div key={idx} className="biztrack-chart">
                            <h3 className="text-xl font-semibold mb-6 biztrack-gradient-text">
                              {chart.type}
                            </h3>
                            <Plot
                              data={chart.figure.data}
                              layout={{
                                ...chart.figure.layout,
                                paper_bgcolor: "transparent",
                                plot_bgcolor: "transparent",
                                font: { color: "#9CA3AF" },
                                margin: { t: 40, r: 20, b: 40, l: 60 },
                              }}
                              style={{ width: "100%" }}
                              config={{ responsive: true }}
                            />
                          </div>
                        ))}

                        {/* AI Interpretation */}
                        {interpretation && (
                          <div className="biztrack-interpretation">
                            <div className="flex items-center gap-2 mb-4">
                              <Rocket className="w-6 h-6 text-orange-500" />
                              <h4 className="text-xl font-semibold biztrack-gradient-text">
                                Interpretasi AI
                              </h4>
                            </div>
                            <p className="text-gray-300 whitespace-pre-wrap">{typingInterpretation}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-8">
                      <a href="#" className="text-blue-600 underline hover:text-blue-800">
                        Masih bingung sama hasilnya? Yuk tanyain ke Chatbot!
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="biztrack-card text-center py-12">
                    <Rocket className="w-16 h-16 text-orange-500 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-medium text-gray-400 mb-2">
                      Belum ada data yang diunggah
                    </h3>
                    <p className="text-gray-500">
                      Silakan unggah file Excel untuk memulai analisis bisnis Anda
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="biztrack-card h-[calc(100vh-2rem)]">
                <Chatbot
                  chatHistory={chatHistory}
                  setChatHistory={setChatHistory}
                  charts={charts}
                  interpretation={interpretation}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
