
import React from 'react';
import { LastUpdateData, NcmDetails } from '../types';
import { getMonthNamePtBR, formatNcmCode } from '../utils/formatting';

interface InfoDisplayProps {
  ncmCode: string | null;
  lastUpdateData: LastUpdateData | null;
  ncmDetails: NcmDetails | null;
  loading: boolean;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ ncmCode, lastUpdateData, ncmDetails, loading }) => {
  if (loading && !lastUpdateData && !ncmDetails) { // Only show initial loading if nothing is loaded yet
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg mb-6 text-center">
        <p className="text-gray-600">Carregando informações básicas...</p>
      </div>
    );
  }

  if (!ncmCode) return null; // Don't display if no NCM code submitted

  const formattedNcm = formatNcmCode(ncmCode);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mb-6 space-y-3">
      {lastUpdateData && lastUpdateData.date && (
        <p className="text-md text-gray-700">
          <span className="font-semibold">Última Atualização Comex Stat:</span> {lastUpdateData.date} 
          {lastUpdateData.month && lastUpdateData.year && 
            ` (Dados consolidados até ${getMonthNamePtBR(lastUpdateData.month)} de ${lastUpdateData.year})`}
        </p>
      )}
      {ncmDetails && (
        <>
          <p className="text-md text-gray-700">
            <span className="font-semibold">NCM {formattedNcm}:</span> {ncmDetails.description || 'N/A'}
          </p>
          <p className="text-md text-gray-700">
            <span className="font-semibold">Unidade Estatística:</span> {ncmDetails.unit || 'N/A'}
          </p>
        </>
      )}
      {(!lastUpdateData || !ncmDetails) && !loading && ncmCode && (
         <p className="text-md text-red-500">Não foi possível carregar todas as informações básicas para o NCM {formattedNcm}.</p>
      )}
    </div>
  );
};

export default InfoDisplay;
    