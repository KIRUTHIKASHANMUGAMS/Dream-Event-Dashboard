import React, 
{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { eventStatusList } from "../../redux/eventSlice"; // Assuming this fetches data and sets it in the store
import Card from '../card/card';
import ApexChartComponent from '../chart/chart';
import ChartLabel from '../chart/chartLabel';

function DonutChart() {
    const dispatch = useDispatch();
    const eventStatus = useSelector((state) => state.eventSlice.eventStatus) || {
        totalEvents: 0,
        completedEvents: 0,
        pendingEvents: 0,
        cancelledEvents: 0
    };
    console.log("eventStatus" ,eventStatus)

    useEffect(() => {
        // Fetch event status data when the component mounts
        const fetchEventStatus = async () => {
            try {
                await dispatch(eventStatusList()); // Fetch and set event status data in Redux
            } catch (error) {
                console.error('Error fetching event status:', error);
            }
        };

        fetchEventStatus();
    }, [dispatch]);

    const data = {
        series: [
            eventStatus.completedEvents || 0,
            eventStatus.pendingEvents || 0,
            eventStatus.cancelledEvents || 0
        ],
        options: {
            chart: {
                type: 'donut',
            },
            stroke: {
                colors: ['#fff'],
            },
            fill: {
                opacity: 0.8,
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            colors: [
                'rgba(59, 130, 246, 1)', 
                'rgba(245, 158, 11, 1)', 
                'rgba(20, 184, 166, 1)'],
            labels: ['Completed', 'Pending', 'Cancelled'],
        },
    };
    

    return (
        <div className="mb-4">
            <Card>
                <h3>Total Events</h3>

                {/* Center the chart */}
                <div className="d-flex justify-content-center">
                    <ApexChartComponent
                        options={data.options}
                        series={data.series}
                        type="donut"
                        height="230px"
                    />
                </div>

                {/* Chart labels */}
                <div className="mt-4 d-grid justify-content-center">
                    <ChartLabel
                        title="Completed"
                        value={eventStatus.completedEvents}
                        className={["donut-name-completed", "donut-chart-details"]}
                    />
                    <ChartLabel
                        title="Pending"
                        value={eventStatus.pendingEvents}
                        className={["donut-name-pending", "donut-chart-details"]}
                    />
                    <ChartLabel
                        title="Cancelled"
                        value={eventStatus.cancelledEvents}
                        className={["donut-name-cancel", "donut-chart-details"]}
                    />
                </div>
            </Card>
        </div>
    );
}

export default DonutChart;
