
import React, { useState } from 'react';

interface NcmInputProps {
  onSubmit: (ncmCode: string) => void;
  loading: boolean;
}

const NcmInput: React.FC<NcmInputProps> = ({ onSubmit, loading }) => {
  const [ncm, setNcm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ncm.trim() && ncm.trim().length === 8 && /^\d+$/.test(ncm.trim())) {
      onSubmit(ncm.trim());
    } else {
      alert("Por favor, insira um código NCM válido com 8 dígitos numéricos.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-6 bg-white shadow-lg rounded-lg">
      <label htmlFor="ncm-input" className="block text-lg font-semibold mb-2 text-gray-700">
        Código NCM
      </label>
      <div className="flex space-x-3">
        <input
          id="ncm-input"
          type="text"
          value={ncm}
          onChange={(e) => setNcm(e.target.value)}
          placeholder="Digite o código NCM (8 dígitos)"
          maxLength={8}
          className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          disabled={loading}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Analisando...' : 'Analisar'}
        </button>
      </div>
    </form>
  );
};

export default NcmInput;
    