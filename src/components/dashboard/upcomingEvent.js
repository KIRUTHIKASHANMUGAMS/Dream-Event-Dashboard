import React, { useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';

import { upcomingEventList } from "../../redux/dashboardSlice";

const UpcomingEvents = ({ calender }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.dashboardSlice.upcomingList) || [];

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(upcomingEventList(calender));
        };

        fetchData();
    }, [dispatch, calender]);

    return (
        <div className="upcoming-events-container revenue-container">
            <h1 className='piechat-head'>Upcoming Events</h1>
            {data.length > 0 ? ( // Corrected condition here
                <div>
                    {data.map((events) => {
                        const bookedSeatsCount = events.seats.filter(seat => seat.isBooked).length;

                        return (
                            <div className="event-card" key={events._id}>
                                <div className="upcoming-container" bordered={false}>
                                    <div className="event-date">
                                        <span>{new Date(events.eventDate).getDate()}</span>
                                        <p style={{ marginTop: "8px" }}>{new Date(events.eventDate).toLocaleString('en-US', { weekday: 'short' })}</p>
                                    </div>
                                    <div>
                                        <p className="event-title">{events.eventName}</p>
                                        <p className="upcoming-event-description">{events.eventDescription}</p>
                                    </div>
                                </div>

                                <div className='upcoming-container'>
                                    <div className="recent-progressFill">Ticket Sold</div>
                                    <div className='image-screen-details'>
                                        {events.speakers.map((speaker, speakerIndex) => (
                                            <img
                                                key={speakerIndex}
                                                src={`http://localhost:8000/${speaker.speakerImage}`}
                                                className="profile-image-event"
                                                alt="Co-Artist"
                                            />
                                        ))}
                                        <span className="recent-ticketCount">{bookedSeatsCount}/{events.totalSeats}</span>
                                    </div>
                                </div>

                                <div>
                                    <ProgressBar now={(bookedSeatsCount / events.totalSeats) * 100} variant='warning' /> {/* Use a valid variant */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div><p style={{textAlign:"center" , marginTop:"50px"}}>No Events</p></div> // Fixed spelling here
            )}
        </div>
    );
};

export default UpcomingEvents;
