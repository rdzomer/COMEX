
import React from 'react';

interface DataTableProps {
  title?: string;
  data: Record<string, any>[];
  columns: { key: string; header: string; LTR?: boolean }[]; // LTR for Left-to-Right text alignment
  formatters?: Record<string, (value: any) => string>;
  highlightRow?: (row: Record<string, any>) => boolean;
  source?: string; // Optional source text
}

const DataTable: React.FC<DataTableProps> = ({ title, data, columns, formatters, highlightRow, source }) => {
  if (!data || data.length === 0) {
    return title ? <div className="p-4 bg-white shadow rounded-lg mb-6"><h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3><p className="text-gray-500">Nenhum dado disponível.</p></div> : null;
  }

  return (
    <div className="bg-white shadow-xl rounded-lg mb-8 overflow-hidden">
      {title && <h3 className="text-xl font-semibold p-5 bg-gray-50 border-b border-gray-200 text-gray-800">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${highlightRow && highlightRow(row) ? 'bg-yellow-50' : (rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50')} hover:bg-gray-100 transition-colors duration-150`}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${col.LTR ? 'text-left' : 'text-right'} ${
                      typeof row[col.key] === 'number' && row[col.key] < 0 ? 'text-red-600' : 'text-gray-700'
                    }`}
                  >
                    {formatters && formatters[col.key]
                      ? formatters[col.key](row[col.key])
                      : (row[col.key] === undefined || row[col.key] === null ? 'N/A' : String(row[col.key]))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {source && <p className="p-4 text-xs text-gray-500 border-t border-gray-200">{source}</p>}
    </div>
  );
};

export default DataTable;
    