import { WebpageContentTable } from "@types";
import React from "react";

interface RenderTableProps {
  content: WebpageContentTable;
}

const RenderTable: React.FC<RenderTableProps> = ({ content }) => {
    const { columns, rows, settings } = content.table;

    return (
        <div className="webpage-content-table">
            {settings.title && settings.showHeader && <h3>{settings.title}</h3>}
            {settings.description && <p>{settings.description}</p>}
            <table>
                <thead>
                    {settings.showHeader ? (
                        <tr>
                            {columns.map((col) => (
                                <th key={col.id} style={{ textAlign: col.textAlign || "left" }}>
                                    {col.name}
                                </th>
                            ))}
                        </tr>
                    ) : (
                        <tr>
                            <th colSpan={columns.length} style={{ textAlign: "left" }}>
                                {settings.title}
                            </th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            {columns.map((col, idx) => (
                                <td key={col.id} style={{ textAlign: col.textAlign || "left" }}>
                                    {row.data[idx] || ""}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {settings.footer && <div className="table-footer">{settings.footer}</div>}
        </div>
    );
};

export default RenderTable;
