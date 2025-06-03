
import React, { useRef } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  label: string;
  acceptedFileTypes?: string; // e.g., ".xlsx,.xls"
  loading?: boolean;
  fileName?: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, label, acceptedFileTypes, loading, fileName }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileUpload(event.target.files[0]);
      // Reset file input to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes}
          className="hidden"
          id={`file-upload-${label.replace(/\s+/g, '-')}`}
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Processando...' : (fileName ? 'Substituir Arquivo' : 'Selecionar Arquivo')}
        </button>
        {fileName && <span className="text-sm text-gray-600 truncate" title={fileName}>{fileName}</span>}
      </div>
       {acceptedFileTypes === ".xlsx,.xls" && <p className="text-xs text-gray-500 mt-1">Apenas arquivos Excel (.xlsx, .xls)</p>}
    </div>
  );
};

export default FileUpload;

    