import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/transactionSlice';

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
        <div className="total-ticket-container revenue-container">
            <div className='event-Containers'>
                <h1 className='piechat-head'>Sales Revenue</h1>
                <p>View More</p>
            </div>

            <div className="event-list">
                {events.map((event, index) => (
                    <div key={index} className={`event-Containers event-item ${event.isNegative ? 'negative' : 'positive'}`}>
                        <div className='event-Containers'>
                            <div className="event-icon" style={{
                                backgroundColor: event.status === 'succeeded' ? 'green' : (event.hasRefund ? 'blue' : 'rgba(231, 28, 28, 1)'),
                            }}>
                                <span className={`arrow ${event.hasRefund ? 'down' : 'up'}`}></span>
                            </div>
                            <div className="event-details">
                                <div className="event-name">{event.name}</div>
                                <div className="event-description">{event.event}</div>
                            </div>
                        </div>
                        <div>
                            <div className="event-time">{event.time}</div>
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
    );
};

export default EventList;
