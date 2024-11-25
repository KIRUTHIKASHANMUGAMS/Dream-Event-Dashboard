import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookingListDetails } from "../../redux/bookingSlice";
import Card from '../card/card';
import CustomTable from '../table/customTable';

const TableEvent = ({ selectedCategory, date }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bookingSlice.bookingList) || [];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(bookingListDetails(selectedCategory, date));
    };
    fetchData();
  }, [dispatch, selectedCategory, date]);

  const flattenedData = data.flatMap((event, index) => ({
    SNo: index + 1,
    eventName: event.eventName,
    customerName: event.customerName,
    location: event.location,
    totalPrice: event.totalPrice,
    bookingDate: event.bookingDate,
    seatsBooked: event.seatsBooked.join(', '),
    status: event.paymentStatus,
  }));

  const headers = [
    'SNo',
    'eventName',
    'customerName',
    'location',
    'totalPrice',
    'bookingDate',
    'seatsBooked',
    'status',
  ];

  // Function to determine the color based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'refund':
        return { backgroundColor: 'rgba(231, 28, 28, 1)', color: 'white' };
      case 'Paid':
        return { backgroundColor: ' rgba(34, 166, 1, 1)', color: 'white' };
      case 'Unpaid':
        return { backgroundColor: 'rgba(249, 185, 49, 1)', color: 'white' };
      default:
        return {};
    }
  };

  // Custom rendering function for the status column
  const renderStatus = (status) => (
    <span style={{ ...getStatusStyle(status), padding: '5px 10px', borderRadius: '5px' }}>
      {status}
    </span>
  );

  return (
    <Card>
      <div className='booking-main-head'>
        {flattenedData.length > 0 ? (
          <CustomTable
            headers={headers}
            data={flattenedData}
            rowsPerPage={5}
            renderCell={(header, value) =>
              header === 'status' ? renderStatus(value) : value
            }
          />
        ) : (
          <div className='no-details NoEventList'>  <p>No events available.</p> </div>
        )}
      </div>
    </Card>
  );
};

export default TableEvent;
