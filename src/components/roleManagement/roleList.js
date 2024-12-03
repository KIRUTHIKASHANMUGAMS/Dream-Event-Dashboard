import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import RolePermissionTable from '../../components/table/RolePermission';
import { deleteRolePermissionDetails, rolePermissionListDetails } from '../../redux/rolePermission';
import Button from '../button/button';
import Card from '../card/card';
import CustomModal from '../modal/Modal';


const TableEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.rolePermission.rolePermissionList) || [];
  const [showModal, setShowModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(rolePermissionListDetails());
    };

    fetchData();
  }, [dispatch]);

  // Map and structure the data for the table
  const flattenedData = data.map((event, index) => ({
    id: event._id,
    SNo: index + 1,
    Role: event.roleName,
    Features: event.rolePermissions.map((feature) => ({
      featureName: feature.featureName,
      permissions: feature.permissions.map((perm) => perm.permissionName).join(', '),
    })),
  }));

  const headers = ['SNo', 'Role', 'Features', 'permission', 'Actions'];

  // Navigate to edit role page
  const handleEdit = (row) => {
    navigate(`/createRole/${row.id}`);
  };

  // Handle delete action
  const handleDelete = (row) => {
    setSelectedRoleId(row.id);
    setShowModal(true); // Show the modal
  };

  // Confirm delete action
  const confirmDelete = async (selectedRoleId) => {
    if (selectedRoleId) {
      await dispatch(deleteRolePermissionDetails(selectedRoleId)); // Wait for deletion to complete
      await dispatch(rolePermissionListDetails()); // Fetch updated list
      setShowModal(false); // Close the modal
      setSelectedRoleId(null); // Reset selected ID
    }
  };

  // Handle modal close
  const handleClose = () => {
    setShowModal(false);
    setSelectedRoleId(null); // Reset selected ID
  };

  return (
    <Card>
       <ToastContainer
                    autoClose={3000}
                    position="top-right"
                    hideProgressBar
                    closeOnClick
                    pauseOnHover
                    style={{ top: '90px', width: '17%', textAlign: 'center', left: '50%' }}
                />
      <div className="booking-main-head">
        {flattenedData.length > 0 ? (
          <RolePermissionTable
            headers={headers}
            data={flattenedData}
            featureName="Role Management"
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="no-details NoEventList">
            <p>No role permissions available.</p>
          </div>
        )}
      </div>

      {/* Custom Modal for Confirmation */}
      <CustomModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={confirmDelete}
        body={
          <div>
            <h3 className='mb-3'>Delete</h3>
            <h5>Are you sure you want to delete?</h5>
            <div className='d-flex justify-content-end gap-2 mt-3'>
              <Button name="Cancel" style={{ backgroundColor: "#6c757d", color: "white" }} onClick={handleClose} />
              <Button style={{ backgroundColor: "rgb(231, 28, 28)", color: "white" }} name="Delete" onClick={() => confirmDelete(selectedRoleId)} />
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default TableEvent;
