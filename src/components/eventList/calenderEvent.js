import { Badge, Calendar, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdOutlineDateRange } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

import map from "../../assets/map.png";
import { eventListDetails } from "../../redux/eventSlice";

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
                        <p className='event-details-heading'>Event Detail</p>
                        <>
                            <div className="calender-event-detail">
                                <div className="calender-event-time">{selectedEvent.date}</div>
                                <div className="calender-event-info">
                                    <div className="calender-event-label">Event</div>
                                    <div className="calender-event-title">{selectedEvent.eventname}</div>
                                </div>
                            </div>
                            <div className='eventlist-loc-container'>
                                <p className='eventlist-location'>
                                    <img src={map} alt="Map" style={{ marginRight: "10px" }} /> {selectedEvent.location}
                                </p>
                                <p><MdOutlineDateRange /> {selectedEvent.date}</p>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <p className='event-details-heading'>Event Description</p>
                                <p className='event-details-content'>{selectedEvent.details}</p>
                            </div>
                            {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                                <div style={{ marginTop: "20px" }}>
                                    <p className='event-details-heading'>Event Speaker</p>
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
                                <p className='event-details-heading'> Event Guidelines and Policies:</p>
                                <ol>
                                    <li className='event-details-content'> {selectedEvent.eventGuideline}</li>
                                </ol>
                            </div>
                            <div>
                                <p className='event-details-button'>Ticket Price : ${selectedEvent.price}</p>
                            </div>
                        </>
                    </div>
                </Sider>
            )}
        </Layout>
    );
};

export default App;
