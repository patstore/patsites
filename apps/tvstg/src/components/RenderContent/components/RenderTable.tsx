import { useFindContent, useFindImages } from "@provider";
import { WebpageComponentTable } from "@types";
import React from "react";

interface RenderTableProps {
  contentId: string;
}

const RenderTable: React.FC<RenderTableProps> = ({ contentId }) => {
  const { findContent } = useFindContent();
  const content = findContent(contentId);
  if (!content) {
    return null;
  }
  const { columns, rows, settings } = content.data as WebpageComponentTable;
  return (
    <div css={{ margin: "24px 0" }} className="webpage-content-table">
      {settings.title && settings.showHeader && <h3>{settings.title}</h3>}
      {settings.description && <p>{settings.description}</p>}
      <table>
        <thead>
          {settings.showHeader ? (
            <tr>
              {columns.map((col) => (
                <th
                  key={col.id}
                  css={{ textAlign: (col.textAlign as "left") || "left" }}
                >
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
                <td
                  key={col.id}
                  style={{ textAlign: (col.textAlign as "left") || "left" }}
                >
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
