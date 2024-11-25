import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/transactionSlice';
import Card from '../card/card';

const EventList = ({ selectedCategory, date }) => {
    const dispatch = useDispatch();
    const transactionList = useSelector((state) => state.transactionSlice.transactionList) || [];

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTransactionList(selectedCategory, date));
        };
        fetchData();
    }, [dispatch, selectedCategory, date]);

    // Map API response to events
    const events = transactionList.map(transaction => {
        const paymentIntent = transaction.paymentIntent;
        const refunds = transaction.refunds;

        return {
            name: paymentIntent.metadata.userName,
            event: paymentIntent.metadata.eventName,
            time: new Date(paymentIntent.created * 1000).toLocaleTimeString(), // Convert timestamp to time
            amount: `$${(paymentIntent.amount / 100).toFixed(2)}`, // Convert cents to dollars
            isNegative: refunds.length > 0, // If there are refunds, consider it negative
            status: paymentIntent.status,
            hasRefund: refunds.length > 0, // Check if there are any refunds
            refundAmount: refunds.length > 0 ? `$${(refunds[0].amount / 100).toFixed(2)}` : null, // Get refund amount if exists
        };
    });

    return (
        <div className='mb-4'>

       
        <Card>
            <div className="card-bottom event-height " style={{overflowY:"scroll"}}>
                <div className='event-Containers' >
                    <h3>Sales Revenue</h3>
                    <p>View More</p>
                </div>

                <div className="event-list">
                    {events.map((event, index) => (
                        <div key={index} className={`event-Containers-list event-item ${event.isNegative ? 'negative' : 'positive'}`}>
                            <div className='d-flex justify-content-between'>
                                <div className="event-icon" style={{
                                    backgroundColor: event.status === 'succeeded' ? 'green' : (event.hasRefund ? 'blue' : 'rgba(231, 28, 28, 1)'),
                                }}>
                                    <span className={`arrow ${event.hasRefund ? 'down' : 'up'}`}></span>
                                </div>
                                <div className="event-details">
                                    <h4>{event.name}</h4>
                                    <h5>{event.event}</h5>
                                </div>
                            </div>
                            <div>
                                <p className="event-time">{event.time}</p>
                                <div className='event-amount' style={{
                                    color: event.status === 'succeeded' ? 'green' : (event.hasRefund ? 'blue' : 'rgba(231, 28, 28, 1)'),
                                }}>{event.amount}</div>
                                {event.hasRefund && (
                                    <div className='event-refund' style={{ color: 'rgba(231, 28, 28, 1)' }}>
                                        {event.refundAmount}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
        </div>
    );
};

export default EventList;
