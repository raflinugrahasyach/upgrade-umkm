// src/components/FileUploader.tsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, FileSpreadsheet, Check, X } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (data: { sheets: any, sheetNames: string[] }) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');

  const handleFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      setFileName(file.name);
      
      reader.onload = (evt) => {
        try {
          const binaryStr = evt.target?.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const sheetNames = workbook.SheetNames;
          const sheets: any = {};
          
          sheetNames.forEach(name => {
            const worksheet = workbook.Sheets[name];
            sheets[name] = XLSX.utils.sheet_to_json(worksheet);
          });
          
          onFileUpload({ sheets, sheetNames });
          setUploadStatus('success');
          setTimeout(() => setUploadStatus('idle'), 3000);
        } catch (error) {
          setUploadStatus('error');
          setTimeout(() => setUploadStatus('idle'), 3000);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file?.type === 'application/vnd.ms-excel') {
      handleFile(file);
    } else {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      <div
        className={`upload-zone ${
          isDragging ? 'border-orange-500 bg-orange-500/5' : ''
        } ${
          uploadStatus === 'success' ? 'border-green-500/50 bg-green-500/5' :
          uploadStatus === 'error' ? 'border-red-500/50 bg-red-500/5' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx,.xls"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {uploadStatus === 'idle' && (
          <>
            <Upload className="upload-icon" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Unggah File Excel
            </h3>
            <p className="text-sm text-gray-500">
              Klik atau seret file Excel ke sini
            </p>
          </>
        )}

        {uploadStatus === 'success' && (
          <div className="text-green-500 flex flex-col items-center">
            <Check className="w-16 h-16 mb-4" />
            <p className="font-medium">File berhasil diunggah!</p>
            <p className="text-sm mt-2">{fileName}</p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="text-red-500 flex flex-col items-center">
            <X className="w-16 h-16 mb-4" />
            <p className="font-medium">Gagal mengunggah file</p>
            <p className="text-sm mt-2">Pastikan format file adalah Excel (.xlsx/.xls)</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <FileSpreadsheet className="w-4 h-4" />
        <span>Format yang didukung: .xlsx, .xls</span>
      </div>
    </div>
  );
};

export default FileUploader;