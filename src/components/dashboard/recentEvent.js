import React, { useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/dashboardSlice';

const RecentEvent = () => {
  const dispatch = useDispatch();
  const totalEvent = useSelector((state) => state.dashboardSlice.dashboardList) || {};

  useEffect(() => {
    dispatch(fetchTransactionList());
  }, [dispatch]);

  // Check if recentEvents exists and is an array
  const recentEvents = Array.isArray(totalEvent.recentEvents) ? totalEvent.recentEvents : [];

  return (
    <div className='recent-containers revenue-container'>
      <div className='event-Containers'>
        <h1 className='piechat-head'>Recent Event</h1>
        <p>View More</p>
      </div>

      <div >
        {recentEvents.map((event) => {
          // Count booked seats
          const bookedSeatsCount = event.seats.filter(seat => seat.isBooked).length;

          return (
            <div className='recent-card' key={event._id}>
              <div className="recent-details">
                < img
                  src={`http://localhost:8000/${event.imageUrl}`}
                  alt="Event"
                  className="recent-image"
                />
                <div>
                  <h2 className="recent-title">{event.eventName}</h2>
                  <p className="recent-location">{event.location}</p>
                  <div className="recent-ticketInfo">
                    <span className="recent-auto">Author: </span>
                    <span className="recent-seller"> {event.speakers.map(speaker => speaker.speakerName).join(', ')} </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="recent-price">${event.price}</p>
                <div className='image-screen'>

                  {event.speakers.map((speaker, speakerIndex) => (
                    <img
                      key={speakerIndex}
                      src={`http://localhost:8000/${speaker.speakerImage}`}
                      className="profile-image-event"
                      alt="Co-Artist"
                    />
                  ))}
                  <span className="recent-ticketCount">{bookedSeatsCount}/{event.totalSeats}</span>
                </div>

                <div className="recent-progressBar">
                  <div className="recent-progressFill">Ticket Sold</div>
                  <ProgressBar
                    now={(bookedSeatsCount / event.totalSeats) * 100}
                    variant='rgba(246, 176, 39, 1)'
                    style={{ flexGrow: 1 }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentEvent;
