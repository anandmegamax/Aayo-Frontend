import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const CustomPagination = ({ resPerPage, totalResults }) => {
  const totalPages = Math.ceil(totalResults / resPerPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    setSearchParams({ page: pageNum });
  };

  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {pages.map((num) => (
          <li
            key={num}
            className={`page-item ${num === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => handlePageChange(num)}>
              {num}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CustomPagination;
