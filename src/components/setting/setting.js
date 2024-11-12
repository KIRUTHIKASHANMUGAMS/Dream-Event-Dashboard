import React from 'react';
import { Col,Container, Form, Row } from 'react-bootstrap';

import Background from "../../assets/backgroundImage.png";

function setting() {
  return (
    <div>
      <Container fluid>

   
      <Row >
        <Col >
          <div className='booking-main-head'>
          <img src={Background}  width="795px"/>
            <Form className='mt-5'>
              <Row>
                <Col>
                  <Form.Group controlId="eventTitle" className="mb-5">
                    <Form.Label className='form-event'> Name <span className='span-star'>*</span></Form.Label>
                    <Form.Control className='form-event-control' type="text" placeholder="Minato Namikaze" />
                  </Form.Group>

                </Col>
                <Col>
                  <Form.Group controlId="eventDescription" className="mb-5">
                    <Form.Label className='form-event'>Email <span className='span-star'>*</span></Form.Label>
                    <Form.Control className='form-event-control' type="text" />

                  </Form.Group>
                </Col>
              </Row>



              <Row>
                <Col>
                  <Form.Group controlId="themeColor" className="mb-5">
                    <Form.Label className='form-event'>Business Hours  <span className='span-star'>*</span></Form.Label>
                    <Form.Control className='form-event-control' type="datetime-local" placeholder="Enter theme/color" />
                  </Form.Group>

                </Col>
                <Col>
                  <Form.Group controlId="dateTime" className="mb-5">
                    <Form.Label className='form-event'>Country <span className='span-star'>*</span></Form.Label>
                    <Form.Control className='form-event-control' type="del" />
                  </Form.Group>
                </Col>

              </Row>


              <Row>
                <Col>

                  <Form.Group controlId="dateTime" className="mb-5">
                    <Form.Label className='form-event'> City  <span className='span-star'>*</span></Form.Label>
                    <Form.Control className='form-event-control' type="del" />
                  </Form.Group>
                </Col>
                <Col>

                  <Form.Group controlId="dateTime" className="mb-5">
                    <Form.Label className='form-event'> Phone Number  <span className='span-star'>*</span></Form.Label>
                    <Form.Control className='form-event-control' type="del" />
                  </Form.Group>
                </Col>


              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="dateTime" className="mb-5">
                    <Form.Label className='form-event'> Address  <span className='span-star'>*</span></Form.Label>

                    <Form.Control className='form-event-description' as="textarea" rows={5} placeholder="minatonamikaze@gmail.com" />

                  </Form.Group>

                </Col>
              </Row>

              <Row>
                <Col className='d-flex justify-content-end'>
                <button className='buton-save'> Save </button>
                </Col>
              </Row>

            </Form>
          </div>
        </Col>

        <Col>
          <div className='booking-main-head'>
            <p className='event-main-heading mb-2'>Delete Account</p>

            <div className='delete-border' >
              <p className='delete-main' >Are you sure you want to delete your account?</p>
              <p className='delete-content'>Once you delete your account, there is no going back. Please be certain.</p>
            </div>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="I confirm my account deactivation" />
            </Form.Group>

            <div className='mt-3'>
              <button className='delete-button'>
                Delete Account
              </button>

            </div>




          </div>
        </Col>
      </Row>
      </Container>
    </div>
  )
}

export default setting
