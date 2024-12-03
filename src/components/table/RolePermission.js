import React from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Cookies from "universal-cookie";

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

const RolePermissionTable = ({ headers, data, onEdit, onDelete, featureName }) => {
  return (
    <table className="role-permission-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>{row.Sno}</td>
            <td>{row.Role}</td>
            <td >
              {row.Features.map((feature, featureIndex) => (
                <div className='border-details' key={featureIndex}>
                  {feature.featureName}
                </div>
              ))}
            </td>
            <td >
              {row.Features.map((feature, featureIndex) => (
                <div className='border-details' key={featureIndex}>
                  {feature.permissions}
                </div>
              ))}
            </td>
            <td>
              {/* Only render Actions column if the user has permissions */}
              {(hasPermission(featureName, "Create") || hasPermission(featureName, "Delete")) && (
                <div className="d-flex justify-content-center gap-4">
                  {hasPermission(featureName, "Create") && (
                    <TbEdit size={20} onClick={() => onEdit(row)} />
                  )}
                  {hasPermission(featureName, "Delete") && (
                    <IoTrashOutline size={20} onClick={() => onDelete(row)} />
                  )}
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RolePermissionTable;
