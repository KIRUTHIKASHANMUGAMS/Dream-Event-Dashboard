import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Autocomplete from "react-google-autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useParams  } from 'react-router-dom';
import { toast,ToastContainer  } from 'react-toastify';

import { CreateEventById, editcreateEventDetails, eventCategoryDetails } from "../../redux/eventSlice";
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
        speakerImage:'' ,
    };
    const navigate=useNavigate()
    const [formValues, setFormValues] = useState(initialFormValues);
    const [speakers, setSpeakers] = useState([]); // Step 1: Initialize speakers array
    const [currentSpeaker, setCurrentSpeaker] = useState(initialSpeakerValues);
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.eventSlice.eventCategory) || [];
    const createEventById = useSelector((state) => state.eventSlice.createEventById) || [];
    //const editEvent = useSelector((state) => state.eventSlice.editEvent) || [];

    const { id } = useParams();
    const fileInputRef = useRef(null);


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));

        // Preview the new uploaded image
        if (name === "imageUrl" && type === "file" && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = () => {
                setFormValues((prev) => ({
                    ...prev,
                    imageUrlPreview: reader.result, // Add preview URL for the image
                }));
            };

            reader.readAsDataURL(file); // Read the file and create a data URL for preview
        }
    };

    const handleSpeakerChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'speakerImage') {
            setCurrentSpeaker(prev => ({ ...prev, speakerImage: files[0] }));
        } else {
            setCurrentSpeaker(prev => ({ ...prev, [name]: value }));
        }
    };




    useEffect(() => {
        dispatch(eventCategoryDetails());
        if (id) {
            dispatch(CreateEventById(id));
        }
    }, [dispatch, id]);


    useEffect(() => {
        if (createEventById && createEventById._id) {
            setFormValues({
                eventId: createEventById.eventId || '',
                eventName: createEventById.eventName || '',
                eventDescription: createEventById.eventDescription || '',
                location: createEventById.location || '',
                eventTime: createEventById.eventTime || '',
                eventDate: createEventById.eventDate ? createEventById.eventDate.split('T')[0] : '',
                price: createEventById.price || '',
                lat: createEventById.lat || '',
                long: createEventById.long || '',
                eventType: createEventById.eventType || '',
                totalSeats: createEventById.totalSeats || '',
                eventGuideline: createEventById.eventGuideline || '',
                imageUrl: createEventById.imageUrl || ''
            });
            const newSpeakers = createEventById.speakers.map(event => ({
                speakerName: event.speakerName || '',
                speakerType: event.speakerType || '',
                speakerImage: event.speakerImage || null,
            }));
    
          
    
            if (newSpeakers.length > 0) {
           
                setSpeakers(newSpeakers)
            }
        
        }
    }, [createEventById]);


    const addSpeaker = () => {
        if (currentSpeaker.speakerName && currentSpeaker.speakerType && currentSpeaker.speakerImage) {
            // Clear the speakers data before adding new one (if you want to reset every time)
            setSpeakers([currentSpeaker]); // This clears existing data and adds the new speaker
            setCurrentSpeaker(initialSpeakerValues); // Reset the speaker input fields
            if (fileInputRef.current) {
                fileInputRef.current.value = null; // Clear the file input field
            }
        } else {
            alert("Please fill in all fields, including the speaker image.");
        }
    };







    useEffect(() => {
        dispatch(eventCategoryDetails());
        if (id) {
            dispatch(CreateEventById(id));
        }
    }, [dispatch, id]);



    
    const handleSubmit =async (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            Object.keys(formValues).forEach(key => {
                formData.append(key, formValues[key]);
            });
            speakers.forEach((speaker, index) => {
                formData.append(`speakers[${index}][speakerName]`, speaker.speakerName);
                formData.append(`speakers[${index}][speakerType]`, speaker.speakerType);
                if (speaker.speakerImage) {
                    formData.append(`speakers[${index}][speakerImage]`, speaker.speakerImage);
                } 
           

            });
            console.log("Speakers Dataerhuyeuyrry: ", speakers);
            const data = {
                id: id,
                formData: formData
            }

          
            try{
                const response = await   dispatch(editcreateEventDetails(data)).unwrap();
                toast.success("Event updated successfully!", {
                    display: 'flex',
                    toastId: 'user-action',
                    autoClose: 2000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    toastClassName: 'custom-toast',
                    bodyClassName: 'custom-toast',
                });

                if (response && response.status === 200) {
                    setTimeout(()=>{
                        navigate('/eventList'); // Navigate on success
                    },2000)
                 
                }
            
            }catch(err){
                console.log(err)
                toast.success(err.message, {
                    display: 'flex',
                    toastId: 'user-action',
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
        dispatch(CreateEventById(id))
    }, [dispatch, id]);





    const validate = () => {
        const error = {};
        let isFormValid = true;


        if (!formValues.eventId || formValues.eventId === "") {
            isFormValid = false;
            error.eventId = "Please enter the event category.";
        }

        if (!formValues.eventName || formValues.eventName === "") {
            isFormValid = false;
            error.eventName = "Please enter the event name.";
        }
        if (!formValues.eventDescription || formValues.eventDescription === "") {
            isFormValid = false;
            error.eventDescription = "Please enter the event description.";
        }


        if (!formValues.location || formValues.location === "") {
            isFormValid = false;
            error.location = "Please enter the location.";
        }
        if (!formValues.eventDate || formValues.eventDate === "") {
            isFormValid = false;
            error.eventDate = "Please enter the event date.";
        }
        if (!formValues.eventTime || formValues.eventTime === "") {
            isFormValid = false;
            error.eventTime = "Please enter the event date.";
        }
        if (!formValues.price || formValues.price === "") {
            isFormValid = false;
            error.price = "Please enter the event price.";
        }






        if (!formValues.eventType || formValues.eventType === "") {
            isFormValid = false;
            error.eventType = "Please enter the event type.";
        }

        if (!formValues.totalSeats || formValues.totalSeats === "") {
            isFormValid = false;
            error.totalSeats = "Please enter the total seats.";
        }

        if (!formValues.eventGuideline || formValues.eventGuideline === "") {
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
                                                    value={formValues.location}
                                                    onPlaceSelected={(place) => {
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
                                        {formValues.imageUrlPreview ? (
                                            <img
                                                src={formValues.imageUrlPreview}
                                                alt="Preview"
                                                style={{ width: '40%', height: 'auto', marginTop: "10px" }}
                                            />
                                        ) : formValues.imageUrl ? (
                                            <img
                                                src={`http://localhost:8000/${formValues.imageUrl}`}
                                                alt="Event"
                                                style={{ width: '40%', height: 'auto', marginTop: "10px" }}
                                            />
                                        ) : (
                                            <div>No image available</div>
                                        )}

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
                                            onChange={handleSpeakerChange}
                                            name="speakerName"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="speakerDescription" className="mb-3">
                                        <CustomTextArea
                                            label="Speaker Type"
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
                                            onClick={handleSubmit}
                                            type="button"
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

