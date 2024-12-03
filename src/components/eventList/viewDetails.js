import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MdOutlineDateRange } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import map from "../../assets/map.png";
import LineChart from "../../components/eventList/lineChart";
import { eventByIdList } from "../../redux/eventSlice";
import Button from '../button/button';
import Card from '../card/card';
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
                <div className='mb-4'>
                    <Card>
                        <div>
                            <h3>{data.eventName}</h3>
                        </div>

                    </Card>

                </div>

                <Row>

                    <Col lg="8">
                        <Card>
                            <div className='event-details-colors'>
                                <Row>
                                    <Col lg="5">
                                        <img src={`http://localhost:8000/${data.imageUrl}`} alt="Event" className='event-details-images ' />
                                    </Col>
                                    <Col className='mt-1' lg="7">
                                        <h3 >Event Description</h3>
                                        <h5 className='eventColor'>{data.eventDescription}</h5>

                                        <div className='eventlist-loc-container-details mt-1'>
                                            <h5 className='event-border'>
                                                <MdOutlineDateRange /> {data.eventDate ? data.eventDate.split("T")[0] : "No Date"} - {data.eventTime || "No Time"}
                                            </h5>
                                            <h5 className='eventlist-location event-border'>
                                                <img src={map} alt="Map" style={{ marginRight: "3px" }} /> {data.location}
                                            </h5>
                                        </div>

                                        <div >
                                            <Button style={{ width: "100%" }} type='submit' name={`Ticket Price : ${data.price}`} />

                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <div style={{ marginTop: "24px", marginBottom: "24px" }}>
                                        <h3>Event Speaker:</h3>
                                        <Row>
                                            {data.speakers && data.speakers.length > 0 ? (
                                                data.speakers.map((details, index) => (
                                                    <Col lg="2" key={index}>

                                                        <div className='text-center mt-2'>
                                                            <img
                                                                src={`http://localhost:8000/${details.speakerImage}`}
                                                                alt={`Speaker ${index + 1}`}
                                                                style={{ width: '100%' }}
                                                            />
                                                        </div>

                                                        <div className='p-2 text-center'>
                                                            <h4 className='coArtist-event'>{details.speakerName}</h4>
                                                            <h5 className='coArtist-content'>{details.speakerType}</h5>

                                                        </div>

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
                                        <h3>Event Guidelines and Policies:</h3>
                                        <ol>
                                        <p className='eventColor'><li >{data.eventGuideline}</li></p>
                                        </ol>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col lg="4">
                        <div className='event-details-colors'>
                            <LineChart />
                            <TotalTicket />
                        </div>
                    </Col>


                </Row>

                <Row>
                    <div className='mt-3 mb-3'>
                        <Card>
                            <h3>{data.eventName}</h3>
                        </Card>

                    </div>
                    <Card>

                        <RecentBookingEvent data={data} />
                    </Card>
                </Row>
            </div>
        </Container>
    );
}

export default ViewDetails;
