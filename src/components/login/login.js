import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from "universal-cookie";

//import google from "../../assets/google.png";
import logo from "../../assets/logo.png";
import { UserContext } from "../context/userContext";
import { loginResponse } from "../server/login";

function Login() {

  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
    const cookies = new Cookies(null, { path: "/" });




  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form input
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
      const response = await loginResponse(details);
      setUser(response.data);
      
      // Extract tokens and user information
      const token = response.data.accessToken;
      const name=response.data.user.name;
      const refreshToken = response.data.refreshToken;
      const userId = response.data.user._id;
      const rolePermissions = response.data.user?.rolePermission;
      var json_str = JSON.stringify(rolePermissions);
      cookies.set("user", userId);
      cookies.set("token", token);
      cookies.set("refreshToken", refreshToken);
      cookies.set("roles", json_str, { path: "/", secure: true, sameSite: "Strict" });
      cookies.set("name" ,name)

    
    
      
  
      toast.success("Login Successfully");
  
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
  
    } catch (error) {
      toast.error(error.message);
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
                {/* <Button variant="outline-danger" type="button" className="google-btn">
                  <img src={google} width="24px" height="24px" alt='google-icon' /> Sign in with Google
                </Button> */}
              </div>
              {/* <p className="text-center account-event mt-3">
                Don't have an account? <a className='sign-up' href="/signup">Sign up</a>
              </p> */}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
