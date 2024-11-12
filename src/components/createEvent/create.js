import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Autocomplete from "react-google-autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { createEventDetails, eventCategoryDetails } from "../../redux/eventSlice";
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


    const handleSubmit = (e) => {
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
            dispatch(createEventDetails(formData));
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
            <div className="event-container-form mb-4">
                <div className='event-main-container'>
                    <p className='event-main-heading'>Create Event</p>
                </div>


                <Form className='create-event' onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={6} md={12}>
                            <div className='booking-main-head'>
                                <p className='event-main-heading mb-5'>Event Details</p>


                                <Form.Group controlId="eventId" className="mb-5">
                                    <Form.Label className='form-event'>Event Category <span className='span-star'>*</span></Form.Label>

                                    <Form.Control
                                        className='form-event-control'
                                        as="select"
                                        name='eventId'
                                        value={formValues.eventId || ""}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p style={{ color: 'red' }}>{error.eventId}</p>

                                </Form.Group>

                                <Form.Group controlId="eventName" className="mb-5">
                                    <Form.Label className='form-event'>Event Name <span className='span-star'>*</span></Form.Label>
                                    <Form.Control className='form-event-control' type="text" name='eventName' placeholder="Enter event title" value={formValues.eventName} onChange={handleChange} />
                                    <p style={{ color: 'red' }}>{error.eventName}</p>
                                </Form.Group>

                                <Form.Group controlId="eventDescription" className="mb-5">
                                    <Form.Label className='form-event'>Event Description <span className='span-star'>*</span></Form.Label>
                                    <Form.Control className='form-event-description' name='eventDescription' as="textarea" rows={5} placeholder="Enter event description" value={formValues.eventDescription} onChange={handleChange} />
                                    <p style={{ color: 'red' }}>{error.eventDescription}</p>
                                </Form.Group>

                                <Form.Group controlId="eventDate" className="mb-5">
                                    <Form.Label className='form-event'>Event Date <span className='span-star'>*</span></Form.Label>
                                    <Form.Control className='form-event-control' name="eventDate" type="date" value={formValues.eventDate} onChange={handleChange} />
                                    <p style={{ color: 'red' }}>{error.eventDate}</p>

                                </Form.Group>

                                <Form.Group controlId="eventDate" className="mb-5">
                                    <Form.Label className='form-event'>Event Time <span className='span-star'>*</span></Form.Label>
                                    <Form.Control className='form-event-control' name="eventTime" type="time" value={formValues.eventTime} onChange={handleChange} />
                                    <p style={{ color: 'red' }}>{error.eventTime}</p>

                                </Form.Group>




                                <Form.Group controlId="price" className="mb-5">
                                    <Form.Label className='form-event'>Event Price <span className='span-star'>*</span></Form.Label>
                                    <Form.Control className='form-event-control' name="price" type="text" placeholder="Enter price" value={formValues.price} onChange={handleChange} />
                                    <p style={{ color: 'red' }}>{error.price}</p>

                                </Form.Group>


                                <Row>
                                    <Col>
                                        <Form.Group controlId="address" className="mb-5">
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
                                        <Form.Group controlId="eventType" className="mb-5">
                                            <Form.Label className='form-event'>Event Type <span className='span-star'>*</span></Form.Label>
                                            <Form.Control className='form-event-control' name='eventType' type="text" placeholder="Enter type" value={formValues.eventType} onChange={handleChange} />
                                            <p style={{ color: 'red' }}>{error.eventType}</p>

                                        </Form.Group>
                                    </Col>

                                    <Col>
                                        <Form.Group controlId="seats" className="mb-5">
                                            <Form.Label className='form-event'>Total Seats <span className='span-star'>*</span></Form.Label>
                                            <Form.Control className='form-event-control' name="totalSeats" type="text" placeholder="Total Seats" value={formValues.totalSeats} onChange={handleChange} />
                                            <p style={{ color: 'red' }}>{error.totalSeats}</p>

                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="eventGuidelines" className="mb-5">
                                    <Form.Label className='form-event'>Event Guidelines <span className='span-star'>*</span></Form.Label>
                                    <Form.Control className='form-event-control' as="textarea" rows={5} name="eventGuideline" placeholder="Enter guidelines" value={formValues.eventGuideline} onChange={handleChange} />
                                    <p style={{ color: 'red' }}>{error.eventGuideline}</p>

                                </Form.Group>

                                <Form.Group controlId="image" className="mb-5">
                                    <Form.Label className='form-event'>Event Image <span className='span-star'>*</span></Form.Label>
                                    <Form.Control className='form-event-control' type="file" name="imageUrl" onChange={handleChange} />
                                    <p style={{ color: 'red' }}>{error.imageUrl}</p>

                                </Form.Group>


                            </div>
                        </Col>

                        <Col lg={6} md={12}>
                            <div className='booking-main-head'>
                                <div className='speaker-main-container mb-5'>

                                    <p className='event-main-heading '>Event Speaker</p>
                                    <button type="button" onClick={addSpeaker} className="event-speaker-button mt-2">+ Add More Speaker</button>

                                </div>
                                <Form.Group controlId="speakerName" className="mb-5">
                                    <Form.Label className='form-event'>Speaker Name <span className='span-star'>*</span></Form.Label>
                                    <Form.Control className='form-event-control' type="text" name="speakerName" onChange={handleSpeakerChange} placeholder="Enter speaker name" value={currentSpeaker.speakerName} />
                                </Form.Group>

                                <Form.Group controlId="speakerDescription" className="mb-5">
                                    <Form.Label className='form-event'> Speaker Type <span className='span-star'>*</span></Form.Label>
                                    <Form.Control className='form-event-control' as="textarea" rows={3} onChange={handleSpeakerChange} name="speakerType" placeholder="Enter speaker description" value={currentSpeaker.speakerType} />
                                </Form.Group>

                                <Form.Group controlId="speakerImage" className="mb-5">
                                    <Form.Label className="form-event">
                                        Speaker Image <span className="span-star">*</span>
                                    </Form.Label>
                                    <div className="custom-file-input-wrapper">
                                        <Form.Control ref={fileInputRef} className="form-event-control custom-file-input" type="file" onChange={handleSpeakerChange} name="speakerImage" />
                                    </div>
                                </Form.Group>

                                <div className="mt-4">
                                    <h5 className='event-main-heading mb-4'> Speaker:</h5>

                                    <div >

                                        {speakers.length > 0 ? (
                                            <CustomTable headers={headers} data={speakers} />
                                        ) : (
                                            <p className='noSpeaker-yet'>No speakers added yet.</p>
                                        )}

                                    </div>

                                </div>
                                <div className='event-button'>

                                    <button type="submit" variant="secondary" className="event-speaker-button mt-4">Add Event</button>

                                </div>

                            </div>

                        </Col>


                    </Row>
                </Form>

            </div>
        </Container>
    );
};

export default CreateEvent;
