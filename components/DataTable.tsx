
import React from 'react';

// FIX: Export the Column interface so it can be used in other files for strong typing.
export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T extends { [key: string]: any }> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

const DataTable = <T extends { [key: string]: any },>({ data, columns, onEdit, onDelete }: DataTableProps<T>) => {
  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    return item[column.accessor] as React.ReactNode;
  };

  return (
    <div className="overflow-x-auto bg-surface rounded-lg border border-border">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-gray-800">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-surface divide-y divide-border">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-700/50">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {renderCell(item, col)}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  {onEdit && <button onClick={() => onEdit(item)} className="text-primary hover:text-indigo-400">Edit</button>}
                  {onDelete && <button onClick={() => onDelete(item)} className="text-red-500 hover:text-red-400">Delete</button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
