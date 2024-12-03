import React, { useEffect,useState } from 'react';
import Table from 'react-bootstrap/Table';
import { IoTrashOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Cookies from "universal-cookie";

import Button from '../button/button';

// Permission check function
const hasPermission = (featureName, permissionName) => {
  const cookies = new Cookies();
  const roles = cookies.get("roles");

  // Check if roles exist
  if (!roles || roles.length === 0) {
    return false; // No roles found
  }

  const rolePermissions = roles[0]?.rolePermissions;

  // Find the feature's permissions
  const featurePermissions = rolePermissions?.find(
    (role) => role.featureName === featureName
  );

  // Check if the user has the specified permission
  return (
    featurePermissions &&
    featurePermissions.permissions.some(
      (perm) => perm.permissionName === permissionName
    )
  );
};


const BootstrapCustomTable = ({
  headers,
  data,
  rowsPerPage: defaultRowsPerPage,
  onEdit,
  onDelete,
  onModule,
  featureName, 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  console.log("featureName" ,featureName)

  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage]);

  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const firstRowIndex = (currentPage - 1) * rowsPerPage + 1;
  const lastRowIndex = Math.min(currentPage * rowsPerPage, data.length);

  // Function to check permissions



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
                  <td key={headerIndex}>
                   {header === 'Actions' && (hasPermission(featureName, "Create") || hasPermission(featureName, "Delete")) ? (
                      <div className="d-flex justify-content-center gap-4">
                      {hasPermission(featureName, "Create") && row.canEdit && (
                          <TbEdit size={20} onClick={() => onEdit(row)} />
                        )}
                      {hasPermission(featureName, "Delete") && row.canDelete && (
                          <IoTrashOutline size={20} onClick={() => onDelete(row)} />
                        )}
                      </div>
                    ) : header === 'Module' && row[header] ? (
                      <Button type="button" name="Open Module" onClick={() => onModule(row)} />
                    ) : (
                      row[header]
                    )}
                  </td>
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
              onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
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
                type="button"
                name={<MdKeyboardArrowLeft />}
                className="page-link"
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1} // Disable if on the first page
              />
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <Button
                type="button"
                name={<MdOutlineKeyboardArrowRight />}
                className="page-link"
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPages} // Disable if on the last page
              />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BootstrapCustomTable;
