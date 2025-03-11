import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTERPRETATION_PROMPT, CHATBOT_PROMPT } from "../prompts";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * Menghasilkan interpretasi berdasarkan nama sheet dan informasi chart.
 * Fungsi ini menggabungkan informasi chart ke dalam prompt agar respons AI lebih spesifik.
 */
export async function getInterpretation(sheetName: string, charts: any[]): Promise<string> {
  try {
    // Kumpulkan informasi ringkas untuk setiap chart (misal: tipe dan judul)
    const chartInfo = charts && charts.length > 0 
      ? charts.map((chart, idx) => {
          const title = chart.figure?.layout?.title || "Tidak ada judul";
          return `Chart ${idx + 1} (${chart.type}): ${title}`;
        }).join("\n")
      : "";
    
    // Gabungkan sheetName dan chartInfo untuk membuat prompt lengkap
    const fullPrompt = INTERPRETATION_PROMPT(`${sheetName}\n${chartInfo}`);
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error getting interpretation:", error);
    return `Interpretation placeholder for ${sheetName}`;
  }
}

/**
 * Menghasilkan respons chatbot berdasarkan pertanyaan user, chart, dan interpretasi.
 */
export async function getChatbotResponse(
  userQuestion: string,
  charts: any[],
  interpretation: string
): Promise<string> {
  try {
    const prompt = CHATBOT_PROMPT(userQuestion, charts, interpretation);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "Maaf, terjadi kesalahan. Silakan coba lagi.";
  }
}
