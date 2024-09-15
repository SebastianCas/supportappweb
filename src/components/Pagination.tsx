import React from "react";
import { Button } from "react-bootstrap";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
            <Button
              variant="link"
              onClick={() => paginate(number)}
              style={{ border: "none", background: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
