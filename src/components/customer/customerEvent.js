import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { customerListDetails } from '../../redux/customerSlice';
import CustomTable from '../table/customTable';

const TableEvent = ({ selectedCategory ,date}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customerSlice.customerList) || [];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(customerListDetails(selectedCategory ,date));
    };
    fetchData();
  }, [dispatch, selectedCategory , date]);

  const flattenedData = data.flatMap((event, index) => ({
    SNo:index+1,
    customerName: event.customerName,
    customerEmail: event.customerEmail,
    eventName: event.eventName,
    location: event.location,
    totalPrice: event.totalPrice,
    bookingDate: event.bookingDate,
    seatsBooked: event.seatsBooked.join(', '),
  }));

  const headers = [
    'SNo',
    'customerName',
    'customerEmail', 
    'eventName',
    'location',
    'totalPrice',
    'bookingDate',
    'seatsBooked',
  ];



  return (
    <div className='booking-main-head'>
      {flattenedData.length > 0 ? (
        <CustomTable
          headers={headers}
          data={flattenedData}
          rowsPerPage={5}
        
        />
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default TableEvent;
