
import React from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { ChartDataPoint } from '../../types';
import { formatIntegerPtBR } from '../../utils/formatting';

interface CombinedTradeBalanceChartProps {
  data: ChartDataPoint[]; // expects 'name' (for year), 'Exportações (US$ FOB)', 'Importações (US$ FOB) Neg', 'Balança Comercial (FOB)'
  title: string;
}

const CombinedTradeBalanceChart: React.FC<CombinedTradeBalanceChartProps> = ({ data, title }) => {
  if (!data || data.length === 0) {
    return <div className="p-4 bg-white shadow rounded-lg mb-6"><h3 className="text-xl font-semibold mb-2">{title}</h3><p className="text-gray-500">Nenhum dado disponível para o gráfico.</p></div>;
  }
  
  const yAxisTickFormatter = (value: number) => formatIntegerPtBR(value);

  return (
    <div className="p-4 bg-white shadow-xl rounded-lg mb-8 h-96">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height="85%">
        <ComposedChart data={data} margin={{ top: 5, right: 20, left: 50, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis 
            tickFormatter={yAxisTickFormatter} 
            label={{ value: "Valores (US$)", angle: -90, position: 'insideLeft', offset: -30, style: {textAnchor: 'middle', fontSize: '14px', fill: '#555'} }}
            tick={{ fontSize: 12 }}
            allowDataOverflow={true}
            domain={['auto', 'auto']}
          />
          <Tooltip formatter={(value: number) => formatIntegerPtBR(value)} cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}/>
          <Legend wrapperStyle={{paddingTop: '10px'}} />
          <ReferenceLine y={0} stroke="#000" strokeWidth={1.5} />
          <Bar dataKey="Exportações (US$ FOB)" name="Exportação" fill="#3B82F6" barSize={20} />
          <Bar dataKey="Importações (US$ FOB) Neg" name="Importação" fill="#EF4444" barSize={20} />
          <Line type="monotone" dataKey="Balança Comercial (FOB)" name="Balança Comercial" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 text-center mt-1">Fonte: Comex Stat/MDIC. Elaboração própria.</p>
    </div>
  );
};

export default CombinedTradeBalanceChart;
