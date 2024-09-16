import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableComponent from "./Table";

const columns = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "created_at", header: "Created At", isSorteable: true },
];

const data = [
  { id: 1, name: "John Doe", created_at: "2023-01-01T00:00:00Z" },
  { id: 2, name: "Jane Smith", created_at: "2023-02-01T00:00:00Z" },
];

describe("TableComponent", () => {
  test("renders table headers correctly", () => {
    render(<TableComponent data={data} colums={columns} sortDirection="asc" onSort={jest.fn()} />);

    columns.forEach((col) => {
      expect(screen.getByText(col.header)).toBeInTheDocument();
    });
  });

  test("renders table data correctly", () => {
    render(<TableComponent data={data} colums={columns} sortDirection="asc" onSort={jest.fn()} />);

    data.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(formatDate(row.created_at)))).toBeInTheDocument();
    });
  });

  test("calls onSort when sortable header is clicked", () => {
    const onSortMock = jest.fn();
    render(<TableComponent data={data} colums={columns} sortDirection="asc" onSort={onSortMock} />);

    const sortButton = screen.getByText("↑");
    fireEvent.click(sortButton);

    expect(onSortMock).toHaveBeenCalled();
  });

  test("displays correct sort direction indicator", () => {
    const { rerender } = render(<TableComponent data={data} colums={columns} sortDirection="asc" onSort={jest.fn()} />);

    expect(screen.getByText("↑")).toBeInTheDocument();

    rerender(<TableComponent data={data} colums={columns} sortDirection="desc" onSort={jest.fn()} />);

    expect(screen.getByText("↓")).toBeInTheDocument();
  });
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
};
