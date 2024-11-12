import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { MdOutlineDateRange } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import map from "../../assets/map.png";
import LineChart from "../../components/eventList/lineChart";
import { eventByIdList } from "../../redux/eventSlice";
import TotalTicket from '../dashboard/totalTicket';
import RecentBookingEvent from "./recentBookingTable";

function ViewDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.eventSlice.eventById) || {};

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(eventByIdList(id));
        };
        fetchData();
    }, [dispatch, id]);

    return (
        <Container fluid>
            <div>
                <div className='event-main-container'>
                    <p className='event-main-heading'>{data.eventName}</p>
                </div>

                <Row>
                    <Col lg="8">
                        <div className='event-details-colors'>
                            <Row>
                                <Col lg="4">
                                    <img src={`http://localhost:8000/${data.imageUrl}`} alt="Event" className='event-details-images ' />
                                </Col>
                                <Col lg="8">
                                    <p className='event-details-heading'>Event Description</p>
                                    <p className='event-details-content'>{data.eventDescription}</p>

                                    <div className='eventlist-loc-container'>
                                        <p className='event-border'>
                                            <MdOutlineDateRange /> {data.eventDate ? data.eventDate.split("T")[0] : "No Date"} - {data.eventTime || "No Time"}
                                        </p>
                                        <p className='eventlist-location event-border'>
                                            <img src={map} alt="Map" style={{ marginRight: "10px" }} /> {data.location}
                                        </p>
                                    </div>

                                    <div>
                                        <p className='event-details-button'>Ticket Price : ${data.price}</p>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <div style={{ marginTop: "24px", marginBottom: "24px" }}>
                                    <p className='event-details-heading'>Event Speaker:</p>
                                    <Row>
                                        {data.speakers && data.speakers.length > 0 ? (
                                            data.speakers.map((details, index) => (
                                                <Col lg="2" key={index}>
                                                    <Card className='details-image'>
                                                        <img src={`http://localhost:8000/${details.speakerImage}`} alt={`Speaker ${index + 1}`} />
                                                        <Card.Body>
                                                            <p className='coArtist-event'>{details.speakerName}</p>
                                                            <p className='coArtist-content'>{details.speakerType}</p>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))
                                        ) : (
                                            <p>No speakers available.</p>
                                        )}
                                    </Row>
                                </div>
                            </Row>

                            <Row>
                                <Col>
                                    <p className='event-details-heading'>Event Guidelines and Policies:</p>
                                    <ol>
                                        <li className='event-details-content'>{data.eventGuideline}</li>
                                    </ol>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col lg="4">
                        <div className='event-details-colors'>
                            <LineChart />
                            <TotalTicket />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <div className='event-main-container'>
                        <p className='event-main-heading'>{data.eventName}</p>
                    </div>
                    <RecentBookingEvent data={data} />
                </Row>
            </div>
        </Container>
    );
}

export default ViewDetails;
