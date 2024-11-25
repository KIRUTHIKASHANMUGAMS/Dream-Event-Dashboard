import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

import Background from "../../assets/backgroundImage.png";
import Button from '../button/button';
import Card from '../card/card';
import CustomInput from '../customInput/customInput';


function setting() {
  const handleInputChange = (e) => {
    // Handle input changes here
    console.log(e.target.name, e.target.value);
  };
  return (
    <div>
      <Container fluid>


        <Row >
          <Col lg={6} md={6} xs={12} className='mb-4'>

            <div className='booking-main-head'>
              <Card>
              <img src={Background} width="100%" />
              <Form className='mt-5'>
                <Row>
                  <Col>
                    <Form.Group controlId="eventTitle" className="mb-3">

                      <CustomInput
                        type="text"
                        label="Name"
                        name="eventTitle"
                        value=""
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                  </Col>
                  <Col>
                    <Form.Group controlId="eventDescription" className="mb-3">
                      <CustomInput
                        type="email"
                        label="Email"
                        name="eventDescription"
                        value=""
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>



                <Row>
                  <Col>
                    <Form.Group controlId="themeColor" className="mb-3">
                      <CustomInput
                        type="datetime-local"
                        label="Business Hours"
                        name="themeColor"
                        value=""
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                  </Col>
                  <Col>
                    <Form.Group controlId="dateTime" className="mb-3">
                      <CustomInput
                        type="text"
                        label="Country"
                        name="country"
                        value=""
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                </Row>


                <Row>
                  <Col>

                    <Form.Group controlId="dateTime" className="mb-3">
                      <CustomInput
                        type="text"
                        label="City"
                        name="city"
                        value=""
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>

                    <Form.Group controlId="dateTime" className="mb-3">
                      <CustomInput
                        type="del"
                        label="Phone Number "
                        name="Phone Number"
                        value=""
                        onChange={handleInputChange}
                      />

                    </Form.Group>
                  </Col>


                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="dateTime" className="mb-3">
                      <CustomInput
                        type="textarea"
                        label="Address"
                        name="address"
                        value=""
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                  </Col>
                </Row>

                <Row>
                  <Col className='d-flex justify-content-end'>
                    <Button
                      name="Save"
                    />
                  </Col>
                </Row>

              </Form>
              </Card>
            </div>
          </Col>

          <Col lg={6} md={6} xs={12}>

            <div className='booking-main-head'>
              <Card>
              <h3 className=' mb-2'>Delete Account</h3>

              <div className='delete-border' >
                <h5>Are you sure you want to delete your account?</h5>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
              </div>

              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="I confirm my account deactivation" />
              </Form.Group>

              <div className='mt-3'>
                <button className='delete-button'>
                  Delete Account
                </button>

              </div>


              </Card>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default setting
