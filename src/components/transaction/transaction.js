import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/transactionSlice';
import CustomTable from '../table/customTable';

const TableEvent = ({ selectedCategory, date }) => {
  const dispatch = useDispatch();
  const transactionList = useSelector((state) => state.transactionSlice.transactionList) || [];
  console.log("transactionList" , transactionList)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTransactionList(selectedCategory, date));
    };
    fetchData();
  }, [dispatch, selectedCategory, date]);
  const flattenedData = transactionList.flatMap((event, index) => {
    const metadata = event.paymentIntent.metadata || {};
    const hasRefunds = event.refunds && event.refunds.length > 0;
    const status = hasRefunds ? 'refunded' : event.paymentIntent.status; // Set status to 'refunded' if there are refunds
  
    return {
      SNo: index + 1,
      eventName: metadata.eventName,
      customerName: metadata.userName,
      totalAmount: event.paymentIntent.amount,
      seatBooked: JSON.parse(metadata.seats_booked || '[]'),
      PaymentMethod: event.paymentIntent.payment_method_types,
      status: status, // Use updated status
    };
  });
  
  console.log("flattenedData" ,flattenedData)

  const headers = [
    'SNo',
    'eventName',
    'customerName',
    'totalAmount',
    'seatBooked',
    'PaymentMethod',
    'status',
  ];

  // Function to determine the color based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'refunded':
        return { backgroundColor: 'rgba(231, 28, 28, 1)', color: 'white' };
      case 'succeeded':
        return { backgroundColor: 'rgba(34, 166, 1, 1)', color: 'white' };
      case 'canceled':
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
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default TableEvent;
