// src/app/lib/services/interpretation.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTERPRETATION_PROMPT } from "../prompts";

// Inisialisasi GoogleGenerativeAI dengan API key yang diset di environment variable
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Mendapatkan interpretasi untuk sheet tertentu dengan menggabungkan informasi chart.
 * @param sheetName - Nama sheet data.
 * @param charts - Array objek chart yang berisi informasi visualisasi.
 * @returns Sebuah Promise yang menghasilkan teks interpretasi.
 */
export async function getInterpretation(sheetName: string, charts: any[]): Promise<string> {
  try {
    // Kumpulkan informasi ringkas tentang setiap chart
    let chartInfo = "";
    if (charts && charts.length > 0) {
      chartInfo = charts
        .map((chart, idx) => {
          // Asumsikan setiap chart memiliki properti "type" dan layout dengan judul di "figure.layout.title"
          const title = chart.figure?.layout?.title || "Tidak ada judul";
          return `Chart ${idx + 1} (${chart.type}): ${title}`;
        })
        .join("\n");
    }

    // Gabungkan nama sheet dan informasi chart ke dalam prompt
    const fullPrompt = INTERPRETATION_PROMPT(`${sheetName}\n${chartInfo}`);
    
    // Panggil model generative AI untuk menghasilkan konten interpretasi
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error getting interpretation:", error);
    return `Interpretation placeholder for ${sheetName}`;
  }
}
