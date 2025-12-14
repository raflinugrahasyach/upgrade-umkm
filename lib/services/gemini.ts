import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure you have GEMINI_API_KEY in your .env.local
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(apiKey);

export async function getInterpretation(
  category: string,
  charts: any[]
): Promise<string> {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Returning default text.");
    return "API Key Gemini tidak ditemukan. Harap tambahkan NEXT_PUBLIC_GEMINI_API_KEY di .env.local.";
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Prepare prompt based on charts data
    const chartDataSummary = charts.map(chart => {
        return `Chart Type: ${chart.type}, Title: ${chart.figure.layout.title}, Data Points: ${JSON.stringify(chart.figure.data[0]?.x)} values ${JSON.stringify(chart.figure.data[0]?.y)}`;
    }).join('\n');

    const prompt = `
      Anda adalah asisten analisis bisnis AI untuk UMKM.
      Berikan interpretasi singkat, padat, dan actionable (dapat ditindaklanjuti) berdasarkan data grafik berikut.
      Kategori Analisis: ${category}
      
      Data Grafik:
      ${chartDataSummary}

      Berikan insight bisnis yang berguna bagi pemilik UMKM dalam 2-3 kalimat. Fokus pada tren, anomali, atau peluang.
      Gunakan bahasa Indonesia yang profesional namun mudah dimengerti.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Maaf, saya sedang mengalami gangguan koneksi ke otak AI. Coba lagi nanti.";
  }
}