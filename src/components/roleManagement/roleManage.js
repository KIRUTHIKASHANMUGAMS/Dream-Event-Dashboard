import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import {
    editRoleList,
    featuresListDetails,
    permissionListDetails,
    permissionListDetailsById,
    roleListDetails,
    rolePermissionDetails,
} from '../../redux/rolePermission';
import Button from '../button/button';
import Card from '../card/card';
import Toggle from '../customInput/customCheckbox';
import CustomInput from '../customInput/customInput';
import RoleHead from './roleHead';
const RoleManagement = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const navigate = useNavigate()
    const roles = useSelector((state) => state.rolePermission.roleList) || [];
    const features = useSelector((state) => state.rolePermission.featuresList) || [];
    const permissions = useSelector((state) => state.rolePermission.permissionList) || [];
    const rolePermissionById = useSelector((state) => state.rolePermission.permissionListById) || {};

    const [formValues, setFormValues] = useState({
        roleId: '',
        featurePermissions: [],
    });

    const isEditMode = !!id;

    useEffect(() => {
        dispatch(roleListDetails());
        dispatch(featuresListDetails());
        dispatch(permissionListDetails());
        if (isEditMode) {
            dispatch(permissionListDetailsById(id));
        }
    }, [dispatch, id, isEditMode]);

    useEffect(() => {
        if (isEditMode && rolePermissionById.roleId) {
            setFormValues({
                roleId: rolePermissionById.roleId,
                featurePermissions: rolePermissionById.rolePermissions.map((rolePermission) => ({
                    featureId: rolePermission.featureId,
                    permissions: rolePermission.permissions.map((perm) => perm.permissionId),
                })),
            });
        }
    }, [rolePermissionById, isEditMode]);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'permissionId') {
            const [featureId, permissionId] = value.split('-');
            if (!featureId || !permissionId) {
                console.error('Invalid featureId or permissionId');
                return;
            }

            setFormValues((prevValues) => {
                const featurePermissions = [...prevValues.featurePermissions];
                const featureIndex = featurePermissions.findIndex((item) => item.featureId === featureId);

                if (featureIndex > -1) {
                    const permissionsSet = new Set(featurePermissions[featureIndex].permissions);
                    if (checked) {
                        permissionsSet.add(permissionId);
                    } else {
                        permissionsSet.delete(permissionId);
                    }
                    featurePermissions[featureIndex].permissions = Array.from(permissionsSet);
                } else if (checked) {
                    featurePermissions.push({
                        featureId,
                        permissions: [permissionId],
                    });
                }

                return { ...prevValues, featurePermissions };
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            roleId: formValues.roleId,
            featurePermissions: formValues.featurePermissions.map((item) => ({
                featureId: item.featureId,
                permissions: item.permissions,
            })),
        };

        try {
            let response;
            if (isEditMode) {
                response = await dispatch(editRoleList(payload)).unwrap();
                toast.success("Role Updated Successfully!", {
                    display: 'flex',
                    toastId: 'user-action',
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    toastClassName: 'custom-toast',
                    bodyClassName: 'custom-toast',
                });
            } else {
                response=await dispatch(rolePermissionDetails(payload)).unwrap();
                toast.success("Role created Successfully!", {
                    display: 'flex',
                    toastId: 'user-action',
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    toastClassName: 'custom-toast',
                    bodyClassName: 'custom-toast',
                });
            }
            
            console.log(response)
            if (response && response.status === 200) {
                setTimeout(()=>{
                    navigate('/roleManagement'); // Navigate on success
                },2000)
             
            }
        } catch (error) {
            console.error("Submission error:", error);
            // Optionally, you can show an error toast here
        }
    };

    const handleCategoryChange = (event) => {
        setFormValues((prev) => ({ ...prev, roleId: event.target.value }));
    };






    return (
        <div>
            <Container fluid>
                <RoleHead />
                <ToastContainer
                    autoClose={3000}
                    position="top-right"
                    hideProgressBar
                    closeOnClick
                    pauseOnHover
                    style={{ top: '90px', width: '17%', textAlign: 'center', left: '50%' }}
                />
                <Form className="create-event" onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={12} md={12} className="mb-4">
                            <Card>
                                <div className="booking-main-head">
                                    <h3 className="mb-4">{isEditMode ? 'Edit Role' : 'New Role'}</h3>
                                    <Form.Group controlId="roleId" className="mb-4">
                                        <CustomInput
                                            type="dropdown"
                                            label="Role Name"
                                            options={roles}
                                            className="form-control"
                                            name="roleId"
                                            value={formValues.roleId}
                                            onChange={handleCategoryChange}
                                        />
                                    </Form.Group>
                                    <h3 className="mb-4">Permission List</h3>
                                    <Row className="mb-4">
                                        <Col className="d-flex align-items-center justify-content-between">
                                            <Col xs={3}><h3 className="mb-0">Features</h3></Col>
                                            <Col xs={2}><h3 className="mb-0">View</h3></Col>
                                            <Col xs={2}><h3 className="mb-0">Create</h3></Col>
                                            <Col xs={2}><h3 className="mb-0">Delete</h3></Col>
                                        </Col>
                                    </Row>

                                    {features.map((feature) => (
                                        <Row key={feature._id}>
                                            <Col className="d-flex align-items-center justify-content-between">
                                                <Col xs={3}><h4>{feature.featureName}</h4></Col>
                                                {permissions.map((perm) => (
                                                    <Col xs={2} key={perm._id}>
                                                        <Toggle
                                                            isChecked={formValues.featurePermissions.some(
                                                                (featurePermission) =>
                                                                    featurePermission.featureId === feature._id &&
                                                                    featurePermission.permissions.includes(perm._id || perm.permissionId)
                                                            )}
                                                            onToggle={(newState) => {
                                                                handleChange({
                                                                    target: {
                                                                        name: 'permissionId',
                                                                        value: `${feature._id}-${perm.permissionId || perm._id}`,
                                                                        checked: newState,
                                                                    },
                                                                });
                                                            }}
                                                        />

                                                    </Col>
                                                ))}
                                            </Col>
                                            <hr className="mt-2 hr-line" />
                                        </Row>
                                    ))}
                                    <div className="d-flex justify-content-end">
                                        <Button type="submit" name={isEditMode ? 'Update' : 'Save'} />
                                    </div>
                                </div>

                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default RoleManagement;
