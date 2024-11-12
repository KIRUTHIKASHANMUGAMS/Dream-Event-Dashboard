import React from 'react';

import CustomTable from '../table/customTable';

const TableEvent = ({ data }) => {


  // Flatten the event data for the table
  const flattenedData ={
    eventName: data.eventName,
    eventType: data.eventType,
    eventDate: data.eventDate,
    eventTime: data.eventTime,
    eventDescription: data.eventDescription,
    eventImage: (
      <img 
        src={`http://localhost:8000/${data.imageUrl}`} 
        alt={`${data.eventName} Image`} 
        width="50px" 
        height="50px" 
      />
    ),
    price: data.price,
    location: data.location,
    totalSeats: data.totalSeats,
    eventGuideline: data.eventGuideline,
  };

  // Define headers for the table
  const headers = [
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
  ];

  return (
    <div className='booking-main-head'>
  
        <CustomTable headers={headers} data={[flattenedData]} rowsPerPage={5} />
     
    </div>
  );
};

export default TableEvent;
