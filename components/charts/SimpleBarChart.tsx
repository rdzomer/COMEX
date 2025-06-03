
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartDataPoint } from '../../types';
import { formatDecimalPtBR, formatIntegerPtBR } from '../../utils/formatting';

interface SimpleBarChartProps {
  data: ChartDataPoint[];
  xAxisKey: string;
  dataKey: string;
  title: string;
  yAxisLabel?: string;
  fillColor?: string | ((entry: any, index: number) => string);
  dataLabelFormatter?: (value: number) => string;
  customTooltip?: React.ReactElement | ((props: any) => React.ReactElement);
}

const DefaultTooltipContent = (props: any) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 shadow-lg rounded">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color || entry.fill }}>
            {`${entry.name}: ${formatDecimalPtBR(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};


const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, xAxisKey, dataKey, title, yAxisLabel, fillColor = "#8884d8", dataLabelFormatter = formatIntegerPtBR, customTooltip }) => {
  if (!data || data.length === 0) {
    return <div className="p-4 bg-white shadow rounded-lg mb-6"><h3 className="text-xl font-semibold mb-2">{title}</h3><p className="text-gray-500">Nenhum dado disponível para o gráfico.</p></div>;
  }
  
  const yAxisTickFormatter = (value: number) => formatIntegerPtBR(value);

  return (
    <div className="p-4 bg-white shadow-xl rounded-lg mb-8 h-96">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 50, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }}/>
          <YAxis 
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', offset: -30, style: {textAnchor: 'middle', fontSize: '14px', fill: '#555'} } : undefined}
            tickFormatter={yAxisTickFormatter}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={customTooltip || <DefaultTooltipContent />} cursor={{ fill: 'rgba(206, 206, 206, 0.2)' }}/>
          <Legend wrapperStyle={{paddingTop: '10px'}} />
          <Bar dataKey={dataKey} name={yAxisLabel || dataKey} >
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={typeof fillColor === 'function' ? fillColor(entry, index) : fillColor} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
       <p className="text-xs text-gray-500 text-center mt-1">Fonte: Comex Stat/MDIC. Elaboração própria.</p>
    </div>
  );
};

export default SimpleBarChart;
    
