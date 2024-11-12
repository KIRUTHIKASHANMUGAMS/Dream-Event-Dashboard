import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import map from "../../assets/map.png";
import { eventListDetails } from "../../redux/eventSlice";

const now = 10;

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
        <div className='event-details-colors'>
            <Row>
                {data.map((details, index) => (
                    <Col key={index} lg={6} md={6} xs={12}>
                        <Card style={{ marginBottom: "20px" }}>
                            <Card.Img 
                                variant="top" 
                                src={`http://localhost:8000/${details.imageUrl}`} 
                                className='card-event-image' 
                            />
                            <Card.Body>
                                <div>
                                    <div className='eventlist-loc-container'>
                                        <p className="eventlist-name">{details.eventName}</p>
                                        <p className='eventlist-time'>{details.eventTime}</p>
                                    </div>
                                    <div className='eventlist-loc-container'>
                                        <p className='eventlist-location'>
                                            <img src={map} alt="Map Icon" style={{ marginRight: "10px" }} />
                                            {details.location}
                                        </p>
                                        <p className='eventlist-price'>{details.price}</p>
                                    </div>
                                    <p className='eventlist-content'>{details.eventDescription}</p>
                                    <div className='eventlist-coArtist'>
                                        <p>Co-Artist : </p>
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
                                        <div className='sold-price-container'>
                                            <p className='eventlist-ticketSold'>Ticket Sold:</p>
                                            <ProgressBar now={now} variant="warning" style={{ flexGrow: 1 }} />
                                        </div>
                                        <div className='sold-price-container'>
                                            <p className='eventlist-sold-price'>560/1000</p>
                                            <button onClick={()=>ViewDetails(details._id)} className='eventlist-button'>View Detail</button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default EventDetails;
