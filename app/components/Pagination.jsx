import React from "react";

const Pagination = ({ page, setPage, totalPages }) => {
  const handlePrevClick = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevClick}
        disabled={page === 1}
        className="pagination-btn"
      >
        Prev
      </button>
      <span className="pagination-num">{page}</span>
      <button
        onClick={handleNextClick}
        disabled={page === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;