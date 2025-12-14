"use client";

import { useCallback } from "react";
import * as XLSX from "xlsx";
import { UploadCloud } from "lucide-react";

interface FileUploaderProps {
  onFileUpload: (data: any[]) => void;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      onFileUpload(parsedData);
    };
    reader.readAsBinaryString(file);
  }, [onFileUpload]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-orange-500 hover:bg-gray-800/30 transition-all cursor-pointer group"
    >
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8 text-orange-500" />
        </div>
        <p className="text-gray-300 font-medium mb-1">
          Klik atau Drag file Excel di sini
        </p>
        <p className="text-xs text-gray-500">Format .xlsx atau .xls</p>
      </label>
    </div>
  );
}