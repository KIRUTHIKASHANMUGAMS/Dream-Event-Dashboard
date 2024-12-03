import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/transactionSlice';
import Card from '../card/card';
import CustomTable from '../table/customTable';

const TableEvent = ({ selectedCategory, date }) => {
  const dispatch = useDispatch();
  const transactionList = useSelector((state) => state.transactionSlice.transactionList) || [];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTransactionList(selectedCategory, date));
    };
    fetchData();
  }, [dispatch, selectedCategory, date]);

  const flattenedData = transactionList.map((event, index) => {
    console.log("flattenedData" ,event)

    return {
      SNo: index + 1,
      "Event Name": event.eventName,
      'Customer Name': event.customerName,
      'Total Amount': event.totalPrice, // Use totalPrice from API response
      'Seat Booked': event.seatsBooked.join(', '), // Join seat numbers into a string
      'Payment Method': event.paymentIntentId, // Assuming payment method is linked to paymentIntentId
      'Status': event.paymentStatus, // Use paymentStatus from API response
    };  
  });

  const headers = [
    'SNo',
    'Event Name',
    'Customer Name',
    'Total Amount',
    'Seat Booked',
    'Payment Method',
    'Status',
  ];

  // Function to determine the color based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Cancelled':
        return { backgroundColor: 'rgba(249, 185, 49, 1)', color: 'white' };
      case 'Paid':
        return { backgroundColor: 'rgba(34, 166, 1, 1)', color: 'white' };
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
              header === 'Status' ? renderStatus(value) : value
            }
          />
        ) : (
          <div className='no-details NoEventList'><p>No transactions available.</p></div>
        )}
      </div>
    </Card>
  );
};

export default TableEvent;
