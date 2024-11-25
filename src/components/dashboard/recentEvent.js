import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/dashboardSlice';
import Card from '../card/card';
import ProgressBarComponent from '../progressBar/progressBar';

const RecentEvent = () => {
  const dispatch = useDispatch();
  const totalEvent = useSelector((state) => state.dashboardSlice.dashboardList) || {};

  useEffect(() => {
    dispatch(fetchTransactionList());
  }, [dispatch]);

  // Check if recentEvents exists and is an array
  const recentEvents = Array.isArray(totalEvent.recentEvents) ? totalEvent.recentEvents : [];

  return (
    <div className='mb-4'>
      <Card>
        <div  >
          <div className='event-Containers'>
            <h3>Recent Event</h3>
            <p>View More</p>
          </div>

          <div className="event-height">

            {recentEvents.map((event) => {
              // Count booked seats
              const bookedSeatsCount = event.seats.filter(seat => seat.isBooked).length;

              return (

                <div className='mb-3' key={event._id}>
                  <Card >
                    <div className='d-flex justify-content-between'>
                      <div className="recent-details">
                        <img
                          src={`http://localhost:8000/${event.imageUrl}`}
                          alt={event.eventName}
                          width="60px"
                          height="60px"
                          style={{ borderRadius: "12px" }}
                        />
                        <div>
                          <h4>{event.eventName}</h4>
                          <h5 >{event.location}</h5>
                          <div className="d-flex gap-2">
                            <h4 >Author: </h4>
                            <h4> {event.speakers.map(speaker => speaker.speakerName).join(', ')} </h4>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p>${event.price}</p>
                      </div>
                    </div>
                    <div className='upcoming-container-details'>
                      <h4>Ticket Sold</h4>
                      <div className='image-screen-details'>

                        {event.speakers.map((speaker, speakerIndex) => (
                          speakerIndex < 2 && (
                            <img
                              key={speakerIndex}
                              src={`http://localhost:8000/${speaker.speakerImage}`}
                              className="profile-image-event"
                              alt="Co-Artist"
                            />
                          )
                        ))}

                        {event.speakers.length > 2 && (
                          <span className="more-speakers">+{event.speakers.length - 2}</span>
                        )}

                        <p className="recent-ticketCount mt-3">{bookedSeatsCount}/{event.totalSeats}</p>
                      </div>
                    </div>

                    <div >
                      <ProgressBarComponent
                        data={(bookedSeatsCount / event.totalSeats) * 100}
                        variant='warning'
                      />

                    </div>

                  </Card>
                </div>

              );
            })}
          </div>
        </div >
      </Card >
    </div>
  );
};

export default RecentEvent;
