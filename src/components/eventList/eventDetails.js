import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import map from "../../assets/map.png";
import { eventListDetails } from "../../redux/eventSlice";
import Button from '../button/button';
import Card from '../card/card';
import ProgressBarComponent from '../progressBar/progressBar';



function EventDetails({ selectedCategory, calender }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.eventSlice.eventList) || [];

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(eventListDetails(selectedCategory, calender));
        };
        fetchData();
    }, [dispatch, selectedCategory, calender]);

    const ViewDetails = (name) => {

        navigate(`/viewDetails/${name}`);
    };

    return (
        <div className='event-details'>
            <Row>
                {data.map((details, index) => {
                    const bookedSeatsCount = details.seats.filter(seat => seat.isBooked).length;
                    return (


                        <Col className='mb-4' key={index} lg={6} md={12} xs={12}>
                            <Card >
                                <img
                                    src={`http://localhost:8000/${details.imageUrl}`}
                                    alt="Event"
                                    className="event-card-image"
                                />

                                <div className='mt-2'>
                                    <div className='eventlist-loc-container'>
                                        <h3>{details.eventName}</h3>
                                        <p className="eventColor">{details.eventTime}</p>
                                    </div>
                                    <div className='eventlist-loc-container'>
                                        <p className='eventColor'>
                                            <img src={map} alt="Map Icon" style={{ marginRight: "10px" }} />
                                            {details.location}
                                        </p>
                                        <h4>${details.price}</h4>
                                    </div>
                                    <h5 className='eventColor'>{details.eventDescription}</h5>
                                    <div className='d-flex'>
                                        <h4>Co-Artist : </h4>
                                        {details.speakers.map((speaker, speakerIndex) => (
                                            <img
                                                key={speakerIndex}
                                                src={`http://localhost:8000/${speaker.speakerImage}`}
                                                className="profile-image"
                                                alt="Co-Artist"
                                            />
                                        ))}
                                    </div>
                                    <div className='eventlist-loc-container'>

                                        <h4 className='eventlist-ticketSold'>Ticket Sold:</h4>
                                        <div style={{ width: "35%" }}>
                                            <ProgressBarComponent
                                                data={(bookedSeatsCount / details.totalSeats) * 100}

                                                variant='warning'
                                            />
                                        </div>




                                        <p>{bookedSeatsCount}/{details.totalSeats}</p>
                                        <Button type="button" featureName="Event" // Example feature name
                                            permissionName="View" name="View Detail" onClick={() => ViewDetails(details._id)} />

                                    </div>
                                </div>

                            </Card>
                        </Col>

                    );
                })}
            </Row>
        </div>
    );
}

export default EventDetails;
