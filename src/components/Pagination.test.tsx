import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationComponent from "./Pagination";

describe("PaginationComponent", () => {
  const itemsPerPage = 10;
  const totalItems = 50;
  const paginate = jest.fn();
  const currentPage = 1;

  test("renders correct number of page buttons", () => {
    render(
      <PaginationComponent
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
        currentPage={currentPage}
      />,
    );

    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(Math.ceil(totalItems / itemsPerPage));
  });

  test("calls paginate function with correct page number when button is clicked", () => {
    render(
      <PaginationComponent
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
        currentPage={currentPage}
      />,
    );

    const pageButton = screen.getByText("2");
    fireEvent.click(pageButton);

    expect(paginate).toHaveBeenCalledWith(2);
  });

  test("applies active class to the current page button", () => {
    render(
      <PaginationComponent itemsPerPage={itemsPerPage} totalItems={totalItems} paginate={paginate} currentPage={2} />,
    );

    const activePageButton = screen.getByRole("button", { name: "2" });
    expect(activePageButton).toHaveClass("btn btn-link");
  });
});
