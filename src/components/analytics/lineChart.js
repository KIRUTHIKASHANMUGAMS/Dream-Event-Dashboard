import { DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { salesRevenueList } from '../../redux/dashboardSlice';

function LineChart() {
    const dispatch = useDispatch();
    const totalEvent = useSelector((state) => state.dashboardSlice.salesRevenue) || [];
    const [series, setSeries] = useState([]);
    const [date, setDate] = useState('');

    useEffect(() => {
        dispatch(salesRevenueList(date));
    }, [dispatch, date]);

    const onChange = (date, dateString) => {
        setDate(dateString);
    };

    useEffect(() => {

        const prices = totalEvent.map(event => event.totalPrice);
        const dates = totalEvent.map(event => `${event.year}-${String(event.month).padStart(2, '0')}-01`);

        setSeries([{
            name: "Sales Revenue",
            data: prices
        }]);

        // Update the options for the chart
        setData(prevData => ({
            ...prevData,
            options: {
                ...prevData.options,
                xaxis: {
                    categories: dates,
                    type: 'datetime',
                }
            }
        }));

    }, [totalEvent]);

    const [data, setData] = useState({
        series: [],
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
                curve: 'smooth'
            },
            colors: ['rgba(246, 176, 39, 1)'],
            xaxis: {
                categories: [],
                type: 'datetime',
            },
            yaxis: {
                opposite: true
            },
            legend: {
                horizontalAlign: 'left'
            }
        }
    });

    return (
        <div className='linechart-container ' style={{height:"560px"}}>
            <div className='event-Containers'>
                <h1 className='piechart-head'>Sales Revenue</h1>
                <Form>
                    <Row>
                        <Col>
                            <Space direction="vertical">
                                <DatePicker className='form-event-control' onChange={onChange} picker="year" />
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className='event-containers'>
                {totalEvent.length > 0 ? (
                    <ReactApexChart options={data.options} series={series} type="area" height="480px" />
                ) : (
                    <div style={{textAlign:"center", padding:'30px'}}>No Revenue</div>
                )}

            </div>
        </div>
    );
}

export default LineChart;
