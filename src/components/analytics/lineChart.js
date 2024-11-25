import { DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { salesRevenueList } from '../../redux/dashboardSlice';
import Card from '../card/card';
import ApexChartComponent from '../chart/chart';

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
            type: 'line',
            height: 350,
            toolbar: { show: false },
        },
        title: {
            text: 'Sales Revenue',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#e0e0e0',
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
            line: {
                colors: 'rgba(246, 176, 39, 1)', // Set the desired color here
            },
        },
        grid: {
            borderColor: 'rgba(246, 176, 39, 1)',
            strokeDashArray: 4,
        },
    };

    return (
        <div className='mb-4'>


            <div className="event-height">
                <Card>
                    <div >
                        <div className='event-Containers'>
                            <h3>Sales Revenue</h3>
                            <Space direction="vertical">
                                <DatePicker className='form-event-control' onChange={onChange} picker="year" />
                            </Space>
                        </div>
                        {series[0]?.data?.length > 0 ? (
                            <ApexChartComponent
                                type="line"
                                series={series}
                                options={options}
                                height={270}
                            />

                        ) : (
                            <div className='NoEventList'>No Revenue available.</div>
                        )}



                    </div>
                </Card>
            </div>  </div>

    );
};

export default CandlestickChart;
