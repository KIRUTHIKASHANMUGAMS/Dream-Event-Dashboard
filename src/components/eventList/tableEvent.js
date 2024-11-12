import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { eventListDetails } from "../../redux/eventSlice";
import CustomTable from '../table/customTable';

const TableEvent = ({selectedCategory ,calender}) => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.eventSlice.eventList) || [];

  useEffect(() => {
    const fetchData = async () => {
  
      await dispatch(eventListDetails(selectedCategory ,calender));
    };

    fetchData();
  }, [dispatch ,selectedCategory ,calender]);




  const flattenedData = data.flatMap((event, index)  => ({
   // event.speakers.map(speaker => ({
    SNo:index+1,
      eventName: event.eventName,
      eventType: event.eventType,
      eventDate: event.eventDate,
      eventTime: event.eventTime,
      
      eventDescription: event.eventDescription,
      eventImage: <img src={`http://localhost:8000/${event.imageUrl}`} width="50px"  height="50px" />,
      price: event.price,
      location: event.location,
      totalSeats: event.totalSeats,
      eventGuideline: event.eventGuideline,
      // speakerName: speaker.speakerName,
      // speakerType: speaker.speakerType,
      // speakerImage:<img src={`http://localhost:8000/${speaker.speakerImage}`}  width="50px"  height="50px" />

//}))
}));

  const headers = [
    'SNo',
    'eventName',
    'eventType',
    'eventDate',
    'eventTime',
    'eventDescription',
    'price',
    'location',
    'eventImage',
    'totalSeats',
    'eventGuideline',
    // 'speakerName',
    // 'speakerType',
    // 'speakerImage'
  ];

  return (
    <div className='booking-main-head'>
      {flattenedData.length > 0 ? (
        <CustomTable headers={headers} data={flattenedData} rowsPerPage={5} />
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default TableEvent;
