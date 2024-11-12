import React from 'react';
import ReactApexChart from 'react-apexcharts';

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
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
    },
};

function donutChart() {
    return (
        <div className='donut-container'>
            <div className='event-container'>
                <h1 className='piechart-head'> Total Event </h1>
            </div>
            <div className='event-container'>
                <ReactApexChart options={data.options} series={data.series} type="donut" height="207px" />
                <div style={{ marginTop: '52px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
                        <div style={{ backgroundColor: 'rgba(59, 130, 246, 1)', width: '20px', height: '20px', marginRight: '10px' , borderRadius: "50%" }}></div>
                        <span style={{ fontWeight: '600' }}>Completed</span>
                        <span style={{ marginLeft: '55px', fontWeight: 'bold' }}>28</span>
                        <span style={{ marginLeft: '55px', fontWeight: 'bold' }}>62.5%</span>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
                        <div style={{ backgroundColor: 'rgba(245, 158, 11, 1)', width: '20px', height: '20px', marginRight: '10px', borderRadius: "50%"  }}></div>
                        <span style={{ fontWeight: '600' }}>Pending</span>
                        <span style={{ marginLeft: '75px', fontWeight: 'bold' }}>12</span>
                        <span style={{ marginLeft: '75px', fontWeight: 'bold' }}>25%</span>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ backgroundColor: 'rgba(20, 184, 166, 1)', width: '20px', height: '20px', marginRight: '10px', borderRadius: "50%"  }}></div>
                        <span style={{ fontWeight: '600' }}>Cancelled</span>
                        <span style={{ marginLeft: '65px', fontWeight: 'bold' }}>6</span>
                        <span style={{ marginLeft: '65px', fontWeight: 'bold' }}>12.5%</span>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default donutChart;
