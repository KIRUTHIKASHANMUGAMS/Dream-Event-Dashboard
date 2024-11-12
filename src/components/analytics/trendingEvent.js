import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/dashboardSlice';

function TrendingEvent() {
    const dispatch = useDispatch();
    const totalEvent = useSelector((state) => state.dashboardSlice.dashboardList) || [];
    console.log("trending" ,totalEvent )

    useEffect(() => {
        dispatch(fetchTransactionList());
    }, [dispatch]);

    return (
        <div className="piechat-container">
            <h1 className='piechart-head'>Trending Events</h1>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Event</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {totalEvent && totalEvent.trendingEventList && totalEvent.trendingEventList.length > 0 ? (
                        totalEvent.trendingEventList.map((details , index) => (
                            <tr key={details.id}>
                                <td className="trendingevent-number">{index+1}</td>
                                <td className="trendingevent-name">{details.eventName}</td>
                                <td>
                                    <div >
                                        <div>
                                            <span className={`trendingevent-sales ${details.trend}`}>{details.bookedSeatsCount} </span><br />
                                            <p>Sales</p>
                                        </div>
                                        {details.trend && (
                                            <span className={`trendingevent-trend ${details.trend}`}>
                                                {details.trend === "up" ? "▲" : "▼"}
                                            </span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
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

export default TrendingEvent;
