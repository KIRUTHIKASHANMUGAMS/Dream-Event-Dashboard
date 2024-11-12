import { DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

import { salesRevenueList } from '../../redux/dashboardSlice';

const CandlestickChart = () => {
    const dispatch = useDispatch();
    const totalEvent = useSelector((state) => state.dashboardSlice.salesRevenue) || [];
    const [series, setSeries] = useState([]);
    const [date, setDate] = useState([])

    useEffect(() => {
        dispatch(salesRevenueList(date));
    }, [dispatch, date]);

    useEffect(() => {
        if (!Array.isArray(totalEvent)) {
            console.error('Expected totalEvent to be an array:', totalEvent);
            return;
        }

  

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthData = Array(12).fill(0);

        totalEvent.forEach(item => {
            if (item.month && item.totalPrice !== undefined) {
                const monthIndex = item.month - 1;
                monthData[monthIndex] = item.totalPrice;
            } else {
                console.warn('Invalid item structure:', item);
            }
        });
        const transformedData = months.map((month, index) => ({
            x: month,
            y: [monthData[index] || 0, monthData[index] || 0, monthData[index] || 0, monthData[index] || 0] // Ensure fallback is 0
        }));


        setSeries([{ data: transformedData }]);
    }, [totalEvent]);



    const onChange = (date, dateString) => {

        setDate(dateString)
    };

    const options = {
        chart: {
            type: 'candlestick',
            height: 350,
            toolbar: { show: false },
        },
        title: {
            text: 'Sales Revenue',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Static month labels
            labels: {
                rotate: -45,
            },
        },
        yaxis: {
            title: { text: 'Sales Revenue (in K)' },
            tooltip: { enabled: true },
        },
        tooltip: {
            shared: true,
            intersect: false,
            style: { fontSize: '12px' },
            x: {
                formatter: (val) => val,
            },
            y: { formatter: (val) => `${val} K` },
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#FFD700',
                    downward: '#FF4500',
                },
            },
        },
        grid: {
            borderColor: '#e0e0e0',
            strokeDashArray: 4,
        },
    };

    return (
        <div>
            <div className="total-ticket-container">
                <div className='event-Containers'>
                    <h1 className='piechat-head'>Sales Revenue</h1>
                    <Space direction="vertical">
                        <DatePicker className='form-event-control' onChange={onChange} picker="year" />
                    </Space>
                </div>
                {series[0]?.data?.length > 0 ? (
                    <Chart options={options} series={series} type="candlestick" height={350} />
                ) : (
                    <p>No event</p>
                )}



            </div>
        </div>
    );
};

export default CandlestickChart;
