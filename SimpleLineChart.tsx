
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../../types';
import { formatDecimalPtBR, formatIntegerPtBR } from '../../utils/formatting';

interface SimpleLineChartProps {
  data: ChartDataPoint[];
  xAxisKey: string;
  lines: { dataKey: string; name: string; color: string; }[];
  title: string;
  yAxisLabel?: string;
  yAxisTickFormatter?: (value: number) => string;
}

const DefaultTooltipContent = (props: any) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 shadow-lg rounded">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.stroke }}>
            {`${entry.name}: ${formatDecimalPtBR(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data, xAxisKey, lines, title, yAxisLabel, yAxisTickFormatter = formatDecimalPtBR }) => {
   if (!data || data.length === 0) {
    return <div className="p-4 bg-white shadow rounded-lg mb-6"><h3 className="text-xl font-semibold mb-2">{title}</h3><p className="text-gray-500">Nenhum dado disponível para o gráfico.</p></div>;
  }

  return (
    <div className="p-4 bg-white shadow-xl rounded-lg mb-8 h-96">
      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">{title}</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 50, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} />
          <YAxis 
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', offset: -30, style: {textAnchor: 'middle', fontSize: '14px', fill: '#555'} } : undefined}
            tickFormatter={yAxisTickFormatter}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<DefaultTooltipContent />} cursor={{ strokeDasharray: '3 3' }}/>
          <Legend wrapperStyle={{paddingTop: '10px'}} />
          {lines.map(line => (
            <Line key={line.dataKey} type="monotone" dataKey={line.dataKey} name={line.name} stroke={line.color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
          ))}
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 text-center mt-1">Fonte: Comex Stat/MDIC. Elaboração própria.</p>
    </div>
  );
};

export default SimpleLineChart;
    