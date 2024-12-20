import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Autocomplete from "react-google-autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { createEventDetails, eventCategoryDetails } from "../../redux/eventSlice";
import Button from '../button/button';
import Card from '../card/card';
import CustomInput from '../customInput/customInput';
import CustomTextArea from '../customInput/customTextArea';
import CustomTable from '../table/speakerEventTable';
const headers = ['Speaker Name', 'Speaker Type', 'speaker Image'];

const CreateEvent = () => {
    const initialFormValues = {
        eventId: '',
        eventName: '',
        eventDescription: '',
        location: '',
        eventTime: '',
        eventDate: '',
        price: '',
        lat: '',
        long: '',
        eventType: '',
        totalSeats: '',
        eventGuideline: '',
        imageUrl: null,

    };
    const initialSpeakerValues = {
        speakerName: '',
        speakerType: '',
        speakerImage: null,
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [speakers, setSpeakers] = useState([]); // Step 1: Initialize speakers array
    const [currentSpeaker, setCurrentSpeaker] = useState(initialSpeakerValues);
    const [error, setError] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.eventSlice.eventCategory) || [];
    const fileInputRef = useRef(null);
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'file' ? files[0] : value,
        });
    };
    const handleSpeakerChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'speakerImage') {
            setCurrentSpeaker(prev => ({ ...prev, speakerImage: files[0] }));
        } else {
            setCurrentSpeaker(prev => ({ ...prev, [name]: value }));
        }
    };


    const addSpeaker = () => {
        if (currentSpeaker.speakerName && currentSpeaker.speakerType && currentSpeaker.speakerImage) {
            setSpeakers(prevSpeakers => [...prevSpeakers, currentSpeaker]);
            setCurrentSpeaker(initialSpeakerValues);
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        } else {
            alert("Please fill in all speaker fields.");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            Object.keys(formValues).forEach(key => {
                formData.append(key, formValues[key]);
            });
            speakers.forEach((speaker, index) => {
                formData.append(`speakers[${index}][speakerName]`, speaker.speakerName);
                formData.append(`speakers[${index}][speakerType]`, speaker.speakerType);
                formData.append(`speakers[${index}][speakerImage]`, speaker.speakerImage);
            });
            try {
                const response = await dispatch(createEventDetails(formData)).unwrap();
                toast.success("Event created successfully!", {
                    display: 'flex',
                    toastId: 'user-action',
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    toastClassName: 'custom-toast',
                    bodyClassName: 'custom-toast',
                });
                console.log("eeeeeeee", response)
                if (response && response.status === 200) {
                    setTimeout(() => {
                        navigate('/eventList'); // Navigate on success
                    }, 2000)

                }

            } catch (err) {
                console.log(err)
                toast.error(err.message, {
                    display: 'flex',
                    toastId: 'error-action',
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    toastClassName: 'custom-toast',
                    bodyClassName: 'custom-toast',
                });

            }



        }
    };


    useEffect(() => {
        dispatch(eventCategoryDetails());

    }, [dispatch]);









    const validate = () => {
        const error = {};
        let isFormValid = true;


        if (!formValues.eventId || formValues.eventId.trim() === "") {
            isFormValid = false;
            error.eventId = "Please enter the event category.";
        }

        if (!formValues.eventName || formValues.eventName.trim() === "") {
            isFormValid = false;
            error.eventName = "Please enter the event name.";
        }
        if (!formValues.eventDescription || formValues.eventDescription.trim() === "") {
            isFormValid = false;
            error.eventDescription = "Please enter the event description.";
        }


        if (!formValues.location || formValues.location.trim() === "") {
            isFormValid = false;
            error.location = "Please enter the location.";
        }
        if (!formValues.eventDate || formValues.eventDate.trim() === "") {
            isFormValid = false;
            error.eventDate = "Please enter the event date.";
        }
        if (!formValues.eventTime || formValues.eventTime.trim() === "") {
            isFormValid = false;
            error.eventTime = "Please enter the event date.";
        }
        if (!formValues.price || formValues.price.trim() === "") {
            isFormValid = false;
            error.price = "Please enter the event price.";
        }






        if (!formValues.eventType || formValues.eventType.trim() === "") {
            isFormValid = false;
            error.eventType = "Please enter the event type.";
        }

        if (!formValues.totalSeats || formValues.totalSeats.trim() === "") {
            isFormValid = false;
            error.totalSeats = "Please enter the total seats.";
        }

        if (!formValues.eventGuideline || formValues.eventGuideline.trim() === "") {
            isFormValid = false;
            error.eventGuideline = "Please enter the event guideline.";
        }

        if (!formValues.imageUrl) {
            isFormValid = false;
            error.imageUrl = "Please choose the image.";
        }

        setError(error);

        return isFormValid;

    }


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
                        <h3>Create Event</h3>
                    </Card>
                </div>


                <Form className='create-event' onSubmit={handleSubmit}>

                    <Row>

                        <Col lg={6} md={12} className='mb-4'>
                            <Card>
                                <div className='booking-main-head'>
                                    <h3 className=' mb-4'>Event Details</h3>


                                    <Form.Group controlId="eventId" className="mb-3">
                                        <CustomInput
                                            type="dropdown"
                                            label="Event Category"
                                            options={categories}
                                            value={formValues.eventId}
                                            onChange={handleChange}
                                            name="eventId"
                                        />

                                        <p style={{ color: 'red' }}>{error.eventId}</p>

                                    </Form.Group>

                                    <Form.Group controlId="eventName" className="mb-3">
                                        <CustomInput
                                            type="text"
                                            label="Event Name"
                                            value={formValues.eventName}
                                            onChange={handleChange}
                                            name="eventName"
                                        />
                                        <p style={{ color: 'red' }}>{error.eventName}</p>
                                    </Form.Group>

                                    <Form.Group controlId="eventDescription" className="mb-3">
                                        <CustomTextArea
                                            label="Event Description"
                                            value={formValues.eventDescription}
                                            onChange={handleChange}
                                            name="eventDescription"
                                        />

                                        <p style={{ color: 'red' }}>{error.eventDescription}</p>
                                    </Form.Group>

                                    <Form.Group controlId="eventDate" className="mb-3">
                                        <CustomInput
                                            type="date"
                                            label="Event Date"
                                            value={formValues.eventDate}
                                            onChange={handleChange}
                                            name="eventDate"
                                        />
                                        <p style={{ color: 'red' }}>{error.eventDate}</p>

                                    </Form.Group>

                                    <Form.Group controlId="eventDate" className="mb-3">
                                        <CustomInput
                                            type="time"
                                            label="Event Time"
                                            value={formValues.eventTime}
                                            onChange={handleChange}
                                            name="eventTime"
                                        />
                                        <p style={{ color: 'red' }}>{error.eventTime}</p>

                                    </Form.Group>




                                    <Form.Group controlId="price" className="mb-3">
                                        <CustomInput
                                            type="text"
                                            label="Event Price"
                                            value={formValues.price}
                                            onChange={handleChange}
                                            name="price"
                                        />
                                        <p style={{ color: 'red' }}>{error.price}</p>

                                    </Form.Group>


                                    <Row>
                                        <Col>
                                            <Form.Group controlId="address" className="mb-3">
                                                <Form.Label className='form-event'>Location <span className='span-star'>*</span></Form.Label>

                                                <Autocomplete
                                                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                                    className='form-event-control form-control'
                                                    name="location"

                                                    onPlaceSelected={(place) => {
                                                        console.log(place);
                                                        const lat = place.geometry.location.lat(); // Get latitude
                                                        const long = place.geometry.location.lng(); // Get longitude

                                                        setFormValues((prevValues) => ({
                                                            ...prevValues,
                                                            location: place.formatted_address,
                                                            lat: lat,
                                                            long: long
                                                        }));
                                                    }}
                                                />
                                            </Form.Group>


                                        </Col>





                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group controlId="eventType" className="mb-3">
                                                <CustomInput
                                                    type="text"
                                                    label="Event Type"
                                                    value={formValues.eventType}
                                                    onChange={handleChange}
                                                    name="eventType"
                                                />
                                                <p style={{ color: 'red' }}>{error.eventType}</p>

                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Form.Group controlId="seats" className="mb-3">
                                                <CustomInput
                                                    type="text"
                                                    label="Total Seats"
                                                    value={formValues.totalSeats}
                                                    onChange={handleChange}
                                                    name="totalSeats"
                                                />
                                                <p style={{ color: 'red' }}>{error.totalSeats}</p>

                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group controlId="eventGuidelines" className="mb-3">
                                        <CustomTextArea
                                            label="Event Guidelines"
                                            value={formValues.eventGuideline}
                                            onChange={handleChange}
                                            name="eventGuideline"
                                        />

                                        <p style={{ color: 'red' }}>{error.eventGuideline}</p>

                                    </Form.Group>

                                    <Form.Group controlId="image" className="mb-3">
                                        <CustomInput
                                            type="file"
                                            label="Event Image"
                                            onChange={handleChange}
                                            name="imageUrl"
                                        />

                                        <p style={{ color: 'red' }}>{error.imageUrl}</p>

                                    </Form.Group>


                                </div>
                            </Card>
                        </Col>

                        <Col lg={6} md={12} >
                            <Card>
                                <div >
                                    <div className='d-flex justify-content-between mb-2'>

                                        <h3 className=' mb-3'>Event Speaker</h3>
                                        <Button
                                            type="button"
                                            name=" + Add More Speaker"
                                            onClick={addSpeaker}
                                        />


                                    </div>
                                    <Form.Group controlId="speakerName" className="mb-3">
                                        <CustomInput
                                            type="text"
                                            label="Speaker Name"
                                            value={currentSpeaker.speakerName}
                                            onChange={handleSpeakerChange}
                                            name="speakerName"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="speakerDescription" className="mb-3">
                                        <CustomTextArea
                                            label="Speaker Type"
                                            value={currentSpeaker.speakerType}
                                            onChange={handleSpeakerChange}
                                            name="speakerType"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="speakerImage" className="mb-3">
                                        <Form.Label className="form-event">
                                            Speaker Image <span className="span-star">*</span>
                                        </Form.Label>
                                        <div className="custom-file-input-wrapper">
                                            <CustomInput ref={fileInputRef} className="form-event-control custom-file-input" type="file" onChange={handleSpeakerChange} name="speakerImage" />
                                        </div>
                                    </Form.Group>

                                    <div className="mt-4">
                                        <h3 className=' mb-4'> Speaker:</h3>

                                        <div >

                                            {speakers.length > 0 ? (
                                                <CustomTable headers={headers} data={speakers} />
                                            ) : (
                                                <p className='noSpeaker-yet'>No speakers added yet.</p>
                                            )}

                                        </div>

                                    </div>
                                    <div className='event-button'>
                                        <Button
                                            type="Submit"
                                            onClick={handleSubmit}
                                            name=" Add Event"
                                        />


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

export default CreateEvent;