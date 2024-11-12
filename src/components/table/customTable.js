import React, { useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';

const CustomTable = ({ headers, data, rowsPerPage, renderCell }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Logic to determine which page numbers to show
  const getVisiblePages = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4];
    }

    if (currentPage > totalPages - 3) {
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <div>
      <Table responsive hover>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              {headers.map((header, headerIndex) => (
                <td key={headerIndex}>
                  {/* Use renderCell function if provided */}
                  {renderCell ? renderCell(header, item[header]) : item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {/* Show pagination only after page 1 */}
          {currentPage > 1 && (
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
          )}

          {getVisiblePages().map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}

          {currentPage < totalPages && (
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
          )}
        </Pagination>
      )}
    </div>
  );
};

export default CustomTable;
