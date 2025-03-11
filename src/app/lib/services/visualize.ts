// src/app/lib/services/visualize.ts

import { getInterpretation } from "./interpretation";

export interface ChartResult {
  type: string;
  figure: {
    data: Array<{
      type: string;
      x?: any[];
      y?: any[];
      labels?: string[];
      values?: number[];
      marker: {
        color?: string | string[];
      };
    }>;
    layout: {
      title: string;
      paper_bgcolor: string;
      plot_bgcolor: string;
      font: {
        color: string;
      };
      yaxis?: {
        title?: string;
        tickformat?: string;
      };
    };
  };
}

export interface VisualizationResult {
  charts: ChartResult[];
  interpretation: string;
}

// Fungsi helper: Mengelompokkan data dan menghitung jumlahnya
function groupByCount(data: any[], key: string): { [key: string]: number } {
  return data.reduce((acc, item) => {
    const value = item[key];
    if (value !== undefined) {
      acc[value] = (acc[value] || 0) + 1;
    }
    return acc;
  }, {} as { [key: string]: number });
}

/** Visualisasi untuk data Pelanggan */
export async function visualizePelanggan(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];

  if (selectedBusinessInfo === "Analisis demografi pelanggan") {
    // Periksa apakah ada data dengan properti "Jenis Kelamin Pelanggan"
    if (sheetData && sheetData.length > 0 && sheetData.some(item => item["Jenis Kelamin Pelanggan"] !== undefined)) {
      const genderCounts = groupByCount(sheetData, "Jenis Kelamin Pelanggan");
      charts.push({
        type: "Analisis demografi pelanggan",
        figure: {
          data: [{
            type: "bar",
            x: Object.keys(genderCounts),
            y: Object.values(genderCounts),
            marker: { color: "#FF6B2C" }
          }],
          layout: { 
            title: "Distribusi Jenis Kelamin Pelanggan",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  }

  try {
    const interpretation = await getInterpretation("Pelanggan", charts);
    return { charts, interpretation };
  } catch (error) {
    console.error("Error in visualizePelanggan:", error);
    return { charts, interpretation: "Tidak dapat menghasilkan interpretasi saat ini." };
  }
}

/** Visualisasi untuk data Produk */
export async function visualizeProduk(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];

  if (selectedBusinessInfo === "Kinerja penjualan produk dan stok") {
    const productSales: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const produk = item["Produk"];
      const jumlah = Number(item["Jumlah Terjual"] || 0);
      if (produk) {
        productSales[produk] = (productSales[produk] || 0) + jumlah;
      }
    });

    if (Object.keys(productSales).length > 0) {
      charts.push({
        type: "Kinerja penjualan produk dan stok",
        figure: {
          data: [{
            type: "bar",
            x: Object.keys(productSales),
            y: Object.values(productSales),
            marker: { color: "#FF4785" }
          }],
          layout: { 
            title: "Penjualan Produk",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  }

  const interpretation = await getInterpretation("Produk", charts);
  return { charts, interpretation };
}

/** Visualisasi untuk Transaksi Penjualan */
export async function visualizeTransaksiPenjualan(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];
  if (selectedBusinessInfo === "Jumlah penjualan, pendapatan, dan metode pembayaran") {
    const paymentSales: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const metode = item["Metode Pembayaran"];
      const pendapatan = Number(item["Pendapatan"] || 0);
      if (metode) {
        paymentSales[metode] = (paymentSales[metode] || 0) + pendapatan;
      }
    });
    if (Object.keys(paymentSales).length > 0) {
      charts.push({
        type: "Jumlah penjualan, pendapatan, dan metode pembayaran",
        figure: {
          data: [{
            type: "bar",
            x: Object.keys(paymentSales),
            y: Object.values(paymentSales),
            marker: { color: "orange" }
          }],
          layout: { 
            title: "Pendapatan per Metode Pembayaran",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  }
  const interpretation = await getInterpretation("Transaksi Penjualan", charts);
  return { charts, interpretation };
}

/** Visualisasi untuk Lokasi Penjualan */
export async function visualizeLokasiPenjualan(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];
  if (selectedBusinessInfo === "Kinerja penjualan di berbagai lokasi") {
    const locationSales: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const lokasi = item["Lokasi"];
      const jumlah = Number(item["Jumlah Terjual"] || 0);
      if (lokasi) {
        locationSales[lokasi] = (locationSales[lokasi] || 0) + jumlah;
      }
    });
    if (Object.keys(locationSales).length > 0) {
      charts.push({
        type: "Kinerja penjualan di berbagai lokasi",
        figure: {
          data: [{
            type: "bar",
            x: Object.keys(locationSales),
            y: Object.values(locationSales),
            marker: { color: "#FF4785" }
          }],
          layout: { 
            title: "Penjualan per Lokasi",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  } else if (selectedBusinessInfo === "Distribusi penjualan berdasarkan kota/provinsi") {
    const citySales: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const kota = item["Kota/Provinsi"];
      const jumlah = Number(item["Jumlah Terjual"] || 0);
      if (kota) {
        citySales[kota] = (citySales[kota] || 0) + jumlah;
      }
    });
    if (Object.keys(citySales).length > 0) {
      charts.push({
        type: "Distribusi penjualan berdasarkan kota/provinsi",
        figure: {
          data: [{
            type: "pie",
            labels: Object.keys(citySales),
            values: Object.values(citySales),
            marker: { color: ["#FF6B2C", "#FF4785", "#9333EA", "#4F46E5", "#0EA5E9", "#10B981"] }
          }],
          layout: { 
            title: "Penjualan per Kota/Provinsi",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  } else if (selectedBusinessInfo === "Analisis lokasi dengan penjualan tertinggi/rendah") {
    const locationPerformance: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const lokasi = item["Lokasi"];
      const revenue = Number(item["Pendapatan"] || 0);
      if (lokasi) {
        locationPerformance[lokasi] = (locationPerformance[lokasi] || 0) + revenue;
      }
    });
    if (Object.keys(locationPerformance).length > 0) {
      const sortedLocations = Object.entries(locationPerformance)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [loc, rev]) => ({ ...acc, [loc]: rev }), {});
      const values = Object.values(sortedLocations) as number[];
      const max = Math.max(...values);
      const min = Math.min(...values);
      const gradientColors = values.map((value: number) => {
        const ratio = (value - min) / (max - min);
        return `rgba(255, 107, 44, ${0.3 + ratio * 0.7})`;
      });
      charts.push({
        type: "Analisis lokasi dengan penjualan tertinggi/rendah",
        figure: {
          data: [{
            type: "bar",
            x: Object.keys(sortedLocations),
            y: Object.values(sortedLocations),
            marker: { color: gradientColors }
          }],
          layout: { 
            title: "Performa Penjualan per Lokasi",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" },
            yaxis: {
              title: "Pendapatan",
              tickformat: ",.0f"
            }
          }
        }
      });
    }
  }

  const interpretation = await getInterpretation("Lokasi Penjualan", charts);
  return { charts, interpretation };
}

/** Visualisasi untuk Staf Penjualan */
export async function visualizeStafPenjualan(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];
  if (selectedBusinessInfo === "Kinerja dan komisi staf penjualan") {
    const staffCommissions: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const staf = item["Staf"];
      const komisi = Number(item["Komisi"] || 0);
      if (staf) {
        staffCommissions[staf] = (staffCommissions[staf] || 0) + komisi;
      }
    });
    if (Object.keys(staffCommissions).length > 0) {
      charts.push({
        type: "Kinerja dan komisi staf penjualan",
        figure: {
          data: [{
            type: "bar",
            x: Object.keys(staffCommissions),
            y: Object.values(staffCommissions),
            marker: { color: "red" }
          }],
          layout: { 
            title: "Komisi Staf",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  }
  const interpretation = await getInterpretation("Staf Penjualan", charts);
  return { charts, interpretation };
}

/** Visualisasi untuk Inventaris */
export async function visualizeInventaris(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];
  if (selectedBusinessInfo === "Manajemen stok produk") {
    const stockManagement: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const produk = item["Produk"];
      const stok = Number(item["Stok"] || 0);
      if (produk) {
        stockManagement[produk] = (stockManagement[produk] || 0) + stok;
      }
    });
    if (Object.keys(stockManagement).length > 0) {
      charts.push({
        type: "Manajemen stok produk",
        figure: {
          data: [{
            type: "bar",
            x: Object.keys(stockManagement),
            y: Object.values(stockManagement),
            marker: { color: "teal" }
          }],
          layout: { 
            title: "Stok Produk",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  }
  const interpretation = await getInterpretation("Inventaris", charts);
  return { charts, interpretation };
}

/** Visualisasi untuk Promosi dan Pemasaran */
export async function visualizePromosiPemasaran(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];
  if (selectedBusinessInfo === "Efektivitas kampanye promosi") {
    const campaignEffectiveness: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const kampanye = item["Kampanye Promosi"];
      const jumlah = Number(item["Jumlah Terjual"] || 0);
      if (kampanye) {
        campaignEffectiveness[kampanye] = (campaignEffectiveness[kampanye] || 0) + jumlah;
      }
    });
    if (Object.keys(campaignEffectiveness).length > 0) {
      charts.push({
        type: "Efektivitas kampanye promosi",
        figure: {
          data: [{
            type: "bar",
            x: Object.keys(campaignEffectiveness),
            y: Object.values(campaignEffectiveness),
            marker: { color: "#FF4785" }
          }],
          layout: { 
            title: "Kampanye Promosi",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  }
  const interpretation = await getInterpretation("Promosi dan Pemasaran", charts);
  return { charts, interpretation };
}

/** Visualisasi untuk Feedback dan Pengembalian */
export async function visualizeFeedbackPengembalian(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];
  if (selectedBusinessInfo === "Masalah dan kepuasan pelanggan") {
    const problemSatisfaction: { [key: string]: { total: number, count: number } } = {};
    sheetData.forEach(item => {
      const masalah = item["Masalah Pelanggan"];
      const kepuasan = Number(item["Kepuasan Pelanggan"] || 0);
      if (masalah) {
        if (!problemSatisfaction[masalah]) {
          problemSatisfaction[masalah] = { total: 0, count: 0 };
        }
        problemSatisfaction[masalah].total += kepuasan;
        problemSatisfaction[masalah].count += 1;
      }
    });
    if (Object.keys(problemSatisfaction).length > 0) {
      const x = Object.keys(problemSatisfaction);
      const y = x.map(key => problemSatisfaction[key].total / problemSatisfaction[key].count);
      charts.push({
        type: "Masalah dan kepuasan pelanggan",
        figure: {
          data: [{
            type: "bar",
            x,
            y,
            marker: { color: "#FF6B2C" }
          }],
          layout: { 
            title: "Kepuasan Pelanggan",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  }
  const interpretation = await getInterpretation("Feedback dan Pengembalian", charts);
  return { charts, interpretation };
}

/** Visualisasi untuk Analisis Penjualan */
export async function visualizeAnalisisPenjualan(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];
  if (selectedBusinessInfo === "Penjualan agregat dan tren") {
    const salesTrends: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const tanggal = item["Tanggal"];
      const pendapatan = Number(item["Pendapatan"] || 0);
      if (tanggal) {
        salesTrends[tanggal] = (salesTrends[tanggal] || 0) + pendapatan;
      }
    });
    if (Object.keys(salesTrends).length > 0) {
      charts.push({
        type: "Penjualan agregat dan tren",
        figure: {
          data: [{
            type: "line",
            x: Object.keys(salesTrends),
            y: Object.values(salesTrends),
            marker: { color: "#FF4785" }
          }],
          layout: { 
            title: "Tren Penjualan",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  }
  const interpretation = await getInterpretation("Analisis Penjualan", charts);
  return { charts, interpretation };
}

/** Visualisasi untuk Lainnya */
export async function visualizeLainnya(sheetData: any[], selectedBusinessInfo: string): Promise<VisualizationResult> {
  const charts: ChartResult[] = [];
  if (selectedBusinessInfo === "Analisis tambahan dan faktor eksternal") {
    const externalFactors: { [key: string]: number } = {};
    sheetData.forEach(item => {
      const faktor = item["Faktor Eksternal"];
      const pendapatan = Number(item["Pendapatan"] || 0);
      if (faktor) {
        externalFactors[faktor] = (externalFactors[faktor] || 0) + pendapatan;
      }
    });
    if (Object.keys(externalFactors).length > 0) {
      charts.push({
        type: "Analisis tambahan dan faktor eksternal",
        figure: {
          data: [{
            type: "bar",
            x: Object.keys(externalFactors),
            y: Object.values(externalFactors),
            marker: { color: "#FF6B2C" }
          }],
          layout: { 
            title: "Faktor Eksternal",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            font: { color: "#9CA3AF" }
          }
        }
      });
    }
  }
  const interpretation = await getInterpretation("Lainnya", charts);
  return { charts, interpretation };
}
