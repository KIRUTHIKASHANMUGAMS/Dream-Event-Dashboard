import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

import Button from '../button/button';

const BootstrapCustomTable = ({ headers, data, rowsPerPage: defaultRowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const firstRowIndex = (currentPage - 1) * rowsPerPage + 1;
  const lastRowIndex = Math.min(currentPage * rowsPerPage, data.length);

  return (
    <div>
      <div className="table-responsive">
        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                {headers.map((header, headerIndex) => (
                  <td key={headerIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <nav className="d-flex justify-content-end align-items-center gap-4">
          <span className="mr-2">Rows per page:</span>
          <div className="d-flex align-items-center">
            <select
              className="form-control form-control-sm"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <span>{`${firstRowIndex} - ${lastRowIndex} of ${data.length}`}</span>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <Button
                name={<MdKeyboardArrowLeft />}
                className="page-link"
                onClick={() => handleChangePage(currentPage - 1)}
              />
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <Button
                name={<MdOutlineKeyboardArrowRight />}
                className="page-link"
                onClick={() => handleChangePage(currentPage + 1)}
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BootstrapCustomTable;
