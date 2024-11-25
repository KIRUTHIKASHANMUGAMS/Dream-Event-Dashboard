import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/dashboardSlice';
import Card from '../card/card';
import BootstrapCustomTable from '../table/customTable'; // Adjust the path as necessary

function TicketSales() {
    const dispatch = useDispatch();
    const totalEvent = useSelector((state) => state.dashboardSlice.dashboardList) || [];

    useEffect(() => {
        dispatch(fetchTransactionList());
    }, [dispatch]);

    const headers = ['Name', 'Popularity', 'Sales'];

    const data = totalEvent.trendingEventList ? totalEvent.trendingEventList.map((details) => {
        const totalSeats = details.totalSeats;
        const bookedSeatsCount = details.bookedSeatsCount;
        const salesPercentage = totalSeats > 0 ? (bookedSeatsCount / totalSeats) * 100 : 0;

        return {
            'Name': details.eventName,
            'Popularity': (
                <div className="popularity" style={{ width: `${salesPercentage}%`, backgroundColor: 'green' }}></div>
            ),
            'Sales': `${salesPercentage.toFixed(2)}%`
        };
    }) : [];

    return (
        <div className="mb-4">
            <Card>
                <div className='event-height'>
                <h3 className='piechart-head'>Ticket Sales</h3>
                {data.length > 0 ? (
                    <BootstrapCustomTable
                        headers={headers}
                        data={data}
                        rowsPerPage={5}
                    />
                ) : (
                    <div style={{ textAlign: 'center' }}>No trending events available.</div>
                )}
                </div>
            </Card>
        </div>

    );
}

export default TicketSales;
