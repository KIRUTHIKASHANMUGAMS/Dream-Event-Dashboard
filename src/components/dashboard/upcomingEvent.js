import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { upcomingEventList } from "../../redux/dashboardSlice";
import Card from '../card/card';
import ProgressBarComponent from '../progressBar/progressBar';

const UpcomingEvents = ({ calender }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.dashboardSlice.upcomingList) || [];

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(upcomingEventList(calender));
        };

        fetchData();
    }, [dispatch, calender]);
    Card
    return (
        <div className="card-bottom ">
            <h3 >Upcoming Events</h3>
            <div className='event-height '>

                {data.length > 0 ? (
                    <div >
                        {data.map((events) => {
                            const bookedSeatsCount = events.seats.filter(seat => seat.isBooked).length;

                            return (
                                <div className="mb-3">
                                    <Card   >
                                        <div key={events._id}>
                                            <div className="upcoming-container" bordered={false}>
                                                <div className="event-date">
                                                    <h4>{new Date(events.eventDate).getDate()}</h4>
                                                    <p style={{ marginTop: "8px" }}>{new Date(events.eventDate).toLocaleString('en-US', { weekday: 'short' })}</p>
                                                </div>
                                                <div>
                                                    <h4 >{events.eventName}</h4>
                                                    <h5>{events.eventDescription}</h5>
                                                </div>
                                            </div>

                                            <div className='upcoming-container-details'>
                                                <h4>Ticket Sold</h4>
                                                <div className='image-screen-details'>

                                                    {events.speakers.map((speaker, speakerIndex) => (
                                                        speakerIndex < 2 && (
                                                            <img
                                                                key={speakerIndex}
                                                                src={`http://localhost:8000/${speaker.speakerImage}`}
                                                                className="profile-image-event"
                                                                alt="Co-Artist"
                                                            />
                                                        )
                                                    ))}

                                                    {events.speakers.length > 2 && (
                                                        <span className="more-speakers">+{events.speakers.length - 2}</span>
                                                    )}

                                                    <p className="recent-ticketCount mt-3">{bookedSeatsCount}/{events.totalSeats}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <ProgressBarComponent
                                                    data={(bookedSeatsCount / events.totalSeats) * 100}
                                                    variant='warning'
                                                />

                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>

                ) : (
                    <div><p style={{ textAlign: "center", marginTop: "50px" }}>No Events</p></div> // Fixed spelling here
                )}

            </div>
        </div>
    );
};

export default UpcomingEvents;
