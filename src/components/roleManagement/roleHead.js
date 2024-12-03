import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createRoleList } from "../../redux/rolePermission";
import Button from '../button/button';
import Card from '../card/card';
import CustomInput from '../customInput/customInput';
import CustomModal from '../modal/Modal';

function RoleHead() {
    const [showModal, setShowModal] = useState(false);
    const [roleName, setRoleName] = useState('');
    const dispatch = useDispatch();

    const handleOpen = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false);
        setRoleName(''); // Clear the input on close
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting role:", roleName);
        if (roleName.trim()) {
            dispatch(createRoleList(roleName));
            handleClose(); // Close modal after submission if desired
        }
    };

    return (
        <div className='mb-3'>
            <Card>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3>Role Management</h3>
                    <div className='d-flex justify-content-between gap-2'>
                        <Button
                            type="button"
                            name="Add Role"
                            featureName="Role Management"
                            permissionName="Create"
                            onClick={handleOpen} />
                    </div>
                </div>
            </Card>

            <CustomModal show={showModal} handleClose={handleClose} body={
                <div>
                    <h3 className='mb-3'>Create New Role</h3>
                    <form onSubmit={handleSubmit}>
                        <CustomInput
                            type="text"
                            label="New Role"
                            className="mb-3"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            name="roleName"
                        />
                        <div className='d-flex justify-content-end gap-2 mt-3'>
                            <Button name="Cancel" style={{ backgroundColor: "#6c757d", color: "white" }} onClick={handleClose} />
                            <Button type="button"  name="Save" />
                        </div>
                    </form>
                </div>
            } />
        </div>
    );
}

export default RoleHead;
