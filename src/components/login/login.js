import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

import google from "../../assets/google.png";
import logo from "../../assets/logo.png";
import { dashboardLoginListDetails } from '../../redux/dashboardLoginSlice';

function Login() {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state.dashboardLoginSlice.dashboardLoginList) || {};
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.email || !formValues.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const details = {
      email: formValues.email,
      password: formValues.password
    };

    try {
      await dispatch(dashboardLoginListDetails(details));
      if (data.status === 200) {
        console.log("Login successful");
        navigate('/dashboard');
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-background">
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
      <Container className="login-container">
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="login-box">
            <div className="text-center event-logo mb-4">
              <img src={logo} alt="logo" width="40" height="40" />
              <h2 className="logo-login">Dream Event</h2>
            </div>
            <h4 className="text-center login-account">Log in to your account</h4>
            <p className="text-center details-welcome">Welcome back! Please enter your details.</p>
            <Form style={{ marginTop: '30px' }} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className='form-login'>Email <span className='span-star'>*</span></Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  onChange={handleChange} 
                  className='form-event-control' 
                  placeholder="user@example.com" 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label className='form-login'>Password <span className='span-star'>*</span></Form.Label>
                <Form.Control 
                  type="password" 
                  name="password" 
                  onChange={handleChange} 
                  className='form-event-control' 
                  placeholder="Password" 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCheckbox">
                <Form.Check type="checkbox" label="Remember for 30 days" />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="warning" type="submit" className="sign-in-btn" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
                <Button variant="outline-danger" type="button" className="google-btn"> 
                  <img src={google} width="24px" height="24px" alt='google-icon' /> Sign in with Google
                </Button>
              </div>
              <p className="text-center account-event mt-3">
                Don't have an account? <a className='sign-up' href="/signup">Sign up</a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;