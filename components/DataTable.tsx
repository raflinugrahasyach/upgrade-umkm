"use client";

interface DataTableProps {
  data: any[];
  columns: string[];
}

export default function DataTable({ data, columns }: DataTableProps) {
  return (
    <div className="w-full overflow-x-auto border border-gray-700 rounded-lg">
      <table className="w-full text-left text-sm text-gray-400">
        <thead className="bg-gray-800 text-gray-200 uppercase font-bold text-xs">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-800/50 transition-colors">
              {columns.map((col) => (
                <td key={`${i}-${col}`} className="px-4 py-2 whitespace-nowrap">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}