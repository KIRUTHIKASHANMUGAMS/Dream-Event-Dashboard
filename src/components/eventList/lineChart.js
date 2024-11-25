import React from 'react';

import Card from '../card/card';
import ApexChartComponent from '../chart/chart';


// Sample data structure
const series = {
    monthDataSeries1: {
        prices: [30, 40, 35, 50, 49, 60, 70, 91, 125], 
        dates: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07', '2023-01-08', '2023-01-09']
    }
};

const data = {
    series: [{
        name: "STOCK ABC",
        data: series.monthDataSeries1.prices 
    }],
    options: {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth' // Changed to 'smooth' for better visualization
        },
        title: {
            text: 'Event Revenue',
            align: 'left',

            style: {
                fontSize: ' 16px',
                fontWeight: 400,
                lineHeight: '26px',
                textAlign: 'left',
                color:"rgba(117, 117, 117, 1)"


            }
        },
        subtitle: {
            text: '$3,650',
            align: 'left',

            style: {
                FontFamily:"Lato",
                fontSize: ' 34px',
                fontWeight: 800,
                lineHeight: '44px',
                textAlign: 'left',
                color:"rgba(0,0,0, 1)"


            }
        },
        colors: ['rgba(246, 176, 39, 1)'],
        xaxis: {
            categories: series.monthDataSeries1.dates, // Use categories for x-axis
            type: 'datetime',
        },
        yaxis: {
            opposite: true
        },
        legend: {
            horizontalAlign: 'left'
        }
    }
};

function AreaChart() { // Renamed to reflect the chart type
    return (
        <div>
            <div className='mb-4'>
                <Card>
                <ApexChartComponent options={data.options} series={data.series} type="area"    height={350} />
                </Card>
           
            </div>
        </div>
    );
}

export default AreaChart; // Exporting the renamed component
