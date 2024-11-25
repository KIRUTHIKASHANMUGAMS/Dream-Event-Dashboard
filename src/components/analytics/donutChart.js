import React from 'react';

import Card from '../card/card';
import ApexChartComponent from '../chart/chart';
import ChartLabel from '../chart/chartLabel';

const data = {
    series: [14, 23, 21], // Adjust the series data as needed
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
            enabled: false
        },
        legend: {
            show: false, // Disable the legend
        },
        colors: ['rgba(59, 130, 246, 1)', 'rgba(245, 158, 11, 1)', 'rgba(20, 184, 166, 1)'], // Colors matching the image
        labels: ['New Registration', 'New Event', 'Ticket Sold', 'Total Refund'],
        responsive: [
            {
                breakpoint: 1440, // Resize for medium screens
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    },
};

function DonutChart() {
    return (
        <div className="mb-4">
            <Card>
                <h3>Total Event</h3>

                {/* Center the chart */}
                <div className='d-flex justify-content-center'>
                    <ApexChartComponent
                        options={data.options}
                        series={data.series}
                        type="donut"
                        height="230px"
                    />


                </div>

                {/* Chart labels */}
                <div className="mt-4 d-grid justify-content-center">

                    <ChartLabel title="Completed" className={["donut-name-completed", "donut-chart-details"]} />

                    <ChartLabel title="Pending" className={["donut-name-pending", "donut-chart-details"]} />

                    <ChartLabel title="Cancelled" className={["donut-name-cancel", "donut-chart-details"]} />

                </div>
            </Card>
        </div>
    );
}

export default DonutChart;
