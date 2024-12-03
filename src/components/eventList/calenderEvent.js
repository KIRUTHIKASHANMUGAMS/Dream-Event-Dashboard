import { Badge, Calendar, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdOutlineDateRange } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

import map from "../../assets/map.png";
import { eventListDetails } from "../../redux/eventSlice";
import Button from '../button/button';

const { Sider, Content } = Layout;

const getListData = (value, events) => {
    const selectedDate = value.format("YYYY-MM-DD");
    return events
        .filter(event => event.eventDate.split("T")[0] === selectedDate)
        .map(event => ({
            type: 'success', // Customize the badge type if needed
            content: `${event.eventName}`,
            date: event.eventTime,
            eventname: event.eventName,
            location: event.location,
            details: event.eventDescription,
            eventGuideline:event.eventGuideline,
            price: event.price,
            speakers: event.speakers || [] // Include speakers data here
        }));
};

const App = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventSlice.eventList) || [];

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(eventListDetails());
        };
        fetchData();
    }, [dispatch]);

    const dateCellRender = (value) => {
        const listData = getListData(value, events);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index} className={`event ${item.type}`} onClick={() => setSelectedEvent(item)}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Layout>
                <Content style={{ padding: '24px', background: '#fff' }}>
                    <Calendar cellRender={cellRender} />
                </Content>
            </Layout>
            {selectedEvent && (
                <Sider width={400} className='calenderEvent-container'>
                    <div style={{ padding: '10px' }}>
                        <h3 >Event Detail</h3>
                        <>
                            <div className="calender-event-detail">
                                <div className="calender-event-time">{selectedEvent.date}</div>
                                <div className="calender-event-info">
                                    <h3 className="calender-event-label">Event</h3>
                                    <h3 className="calender-event-title">{selectedEvent.eventname}</h3>
                                </div>
                            </div>
                            <div className='eventlist-loc-container'>
                                <p className='eventlist-location'>
                                    <img src={map} alt="Map" style={{ marginRight: "5px" }} /> {selectedEvent.location}
                                </p>
                                <p className='d-flex gap-2 align-items-center'><MdOutlineDateRange /> {selectedEvent.date}</p>
                            </div>
                            <div className='mt-3'>
                                <h3>Event Description</h3>
                                <h5 className='eventColor'>{selectedEvent.details}</h5>
                            </div>
                            {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                                <div className='mt-3'>
                                    <h3 className='eventColor'> Speakers</h3>
                                    <div className='eventlist-coArtist'>
                                        {selectedEvent.speakers.map((speaker, speakerIndex) => (
                                            <img 
                                                key={speakerIndex} 
                                                src={`http://localhost:8000/${speaker.speakerImage}`} 
                                                className="profile-image" 
                                                alt="Co-Artist" 
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div style={{ marginTop: "20px" }}>
                                <h3 className='event-details-heading'> Event Guidelines and Policies:</h3>
                                <ol>
                                    <li className='eventColor'> {selectedEvent.eventGuideline}</li>
                                </ol>
                            </div>
                            <div>
                                <Button type="Submit" style={{width:"100%"}} name={`Ticket Price : ${selectedEvent.price}`} />
                            </div>
                        </>
                    </div>
                </Sider>
            )}
        </Layout>
    );
};

export default App;
