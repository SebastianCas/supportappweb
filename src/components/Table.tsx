import React from "react";
import { format } from "date-fns";
import { Table } from "react-bootstrap";

interface Column {
  key: string;
  header: string;
  isSorteable?: boolean;
}

interface TableProps {
  data: any[];
  colums: Column[];
  sortDirection: "asc" | "desc";
  onSort: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "MMMM dd, yyyy");
};

const TableComponent: React.FC<TableProps> = ({ data, colums, sortDirection, onSort }) => {
  return (
    <Table>
      <thead>
        <tr>
          {colums.map((col) => (
            <th key={col.key}>
              {col.header}
              {col.isSorteable && (
                <button
                  onClick={onSort}
                  style={{ border: "none", background: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  {sortDirection === "asc" ? "↑" : "↓"}
                </button>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {colums.map((col) => (
              <td key={col.key}>{col.key === "created_at" ? formatDate(row[col.key]) : row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
