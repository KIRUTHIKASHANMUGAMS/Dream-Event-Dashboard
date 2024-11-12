import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/dashboardSlice';

function TicketSales() {
    const dispatch = useDispatch();
    const totalEvent = useSelector((state) => state.dashboardSlice.dashboardList) || [];

    useEffect(() => {
        dispatch(fetchTransactionList());
    }, [dispatch]);

    return (
        <div className="piechat-container">
            <h1 className='piechart-head'>Ticket Sales</h1>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Popularity</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {totalEvent && totalEvent.trendingEventList && totalEvent.trendingEventList.length > 0 ? (
                        totalEvent.trendingEventList.map((details, index) => {
                            const totalSeats = details.totalSeats;
                            const bookedSeatsCount = details.bookedSeatsCount;
                            const salesPercentage = totalSeats > 0 ? (bookedSeatsCount / totalSeats) * 100 : 0;

                            return (
                                <tr key={index}>
                                    <td className="name">{details.eventName}</td>
                                    <td>
                                        <div className="popularity" style={{ width: `${salesPercentage}%`, backgroundColor: 'green' }}></div>
                                    </td>
                                    <td className="sales">{salesPercentage.toFixed(2)}%</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center' }}>No trending events available.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default TicketSales;
