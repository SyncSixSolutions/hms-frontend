import React from 'react';

interface Column<T> {
    header: string;
    accessor: keyof T;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
}

const Table = <T extends Record<string, any>>({ columns, data }: TableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-border bg-bg text-text rounded-lg overflow-hidden">
                <thead className="bg-border">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={`px-4 py-2 text-left text-sm font-semibold text-text border-b border-border ${idx === 0 ? 'rounded-tl-lg' : ''
                                    } ${idx === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rIdx) => (
                        <tr
                            key={rIdx}
                            className={`hover:bg-primary-ring transition-colors ${rIdx === data.length - 1 ? 'rounded-b-lg' : ''
                                }`}
                        >
                            {columns.map((col, cIdx) => (
                                <td
                                    key={cIdx}
                                    className={`px-4 py-2 text-sm border-b border-border ${rIdx === data.length - 1 && cIdx === 0 ? 'rounded-bl-lg' : ''
                                        } ${rIdx === data.length - 1 && cIdx === columns.length - 1
                                            ? 'rounded-br-lg'
                                            : ''
                                        }`}
                                >
                                    {row[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
