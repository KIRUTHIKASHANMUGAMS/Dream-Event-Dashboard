import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Button from '../components/button/button';
import Card from '../components/card/card';
import CustomInput from '../components/customInput/customInput';
import { roleListDetails } from '../redux/rolePermission';
import { createUserListDetails } from "../redux/userSlice";

const User = () => {
    const initialFormValues = {
        email: '',
        roleId: '',
        userName: '', 
    };

    const [formValues, setFormValues] = useState(initialFormValues);
    const roles = useSelector((state) => state.rolePermission.roleList) || [];
    console.log("roles" ,roles)

    const [error, setError] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormValues({
            ...formValues, // spread the current state
            [name]: value, // update the specific field
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Values to be dispatched:", formValues);
            dispatch(createUserListDetails(formValues));
        }
    };

    useEffect(() => {
        dispatch(roleListDetails());
    }, [dispatch]);

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setFormValues((prev) => ({ ...prev, roleId: categoryId }));
    };
    const validate = () => {
        const error = {};
        let isFormValid = true;

        if (!formValues.roleId || formValues.roleId.trim() === "") {
            isFormValid = false;
            error.roleId = "Please select the Role.";
        }

        if (!formValues.email || formValues.email.trim() === "") {
            isFormValid = false;
            error.email = "Please enter the email.";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            isFormValid = false;
            error.email = "Please enter a valid email.";
        }

        if (!formValues.userName || formValues.userName.trim() === "") {
            isFormValid = false;
            error.userName = "Please enter the Name.";
        }

        setError(error);
        return isFormValid;
    };

    return (
        <Container fluid>
            <ToastContainer
                autoClose={3000}
                position="top-right"
                hideProgressBar
                closeOnClick={true}
                pauseOnHover={true}
                style={{
                    top: '90px', width: '17%', textAlign: 'center', left: "50%",
                }}
            />
            <div >
                <div className="mb-4">
                    <Card >
                        <h3>User Management</h3>
                    </Card>
                </div>

                <Form className='create-event' onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={12} md={12} className='mb-4'>
                            <Card>
                                <div className='booking-main-head'>
                                    <h3 className=' mb-4'>User</h3>

                                    <Form.Group controlId="roleId" className="mb-3">
                                        <CustomInput
                                            type="dropdown"
                                            label="Role Name"
                                            options={roles}
                                            className="form-control"
                                            name='roleId'
                                            onChange={handleCategoryChange}
                                        />
                                        <p style={{ color: 'red' }}>{error.roleId}</p>
                                    </Form.Group>

                                    <Form.Group controlId="userName" className="mb-3">
                                        <CustomInput
                                            type="text"
                                            label="User Name"
                                            value={formValues.userName}
                                            onChange={handleChange}
                                            name="userName"
                                        />
                                        <p style={{ color: 'red' }}>{error.userName}</p>
                                    </Form.Group>

                                    <Form.Group controlId="email" className="mb-3">
                                        <CustomInput
                                            type="email"
                                            label="Email Id"
                                            value={formValues.email}
                                            onChange={handleChange}
                                            name="email"
                                        />
                                        <p style={{ color: 'red' }}>{error.email}</p>
                                    </Form.Group>
<div className='d-flex justify-content-end'>
<Button type="submit" name="save" />
</div>
                                   
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    );
};

export default User;
