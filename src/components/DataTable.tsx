import React from "react";

export type TableColumn<T> = {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
};

type TableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    actions?: (item: T) => React.ReactNode;
};

// Composant DataTable générique
const DataTable = <T extends object>({ data, columns, actions }: TableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        {columns.map((column, index) => (
                            <th key={index}>{column.header}</th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-base-100 transition-colors">
                            <th>{rowIndex + 1}</th>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {/* Utiliser la fonction render si elle est définie, sinon accéder à la propriété */}
                                    {column.render
                                        ? column.render(item)
                                        : String(item[column.key as keyof T])}
                                </td>
                            ))}
                            {/* Afficher les actions si elles sont définies */}
                            {actions && <td>{actions(item)}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
