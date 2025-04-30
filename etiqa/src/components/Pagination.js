import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (pageNum) => {
    if (pageNum !== currentPage) {
      onPageChange(pageNum);
    }
  };

  return (
    <div className="text-center my-4">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          className={`btn btn-primary me-2 ${currentPage === number ? 'active' : ''}`}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
