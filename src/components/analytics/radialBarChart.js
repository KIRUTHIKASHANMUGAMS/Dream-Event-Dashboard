import { DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { totalEventDashboardList } from '../../redux/dashboardSlice';
import { eventCategoryDetails } from "../../redux/eventSlice";
import Card from '../card/card';
import ApexChartComponent from '../chart/chart';
import CustomInput from '../customInput/customInput';

function RadialbarChart() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [date, setDate] = useState(null);

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.eventSlice.eventCategory) || [];
    const totalEvent = useSelector((state) => state.dashboardSlice.totalEventDashboard) || {};

    useEffect(() => {
        dispatch(eventCategoryDetails());
        dispatch(totalEventDashboardList(selectedCategory, date));
    }, [dispatch, selectedCategory, date]);

    const onChange = (date, dateString) => {
        setDate(dateString); // Store the date string
    };

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
    };

    // Prepare data for radial charts
    const ticketsSold = totalEvent.ticketsSold || 0;
    const ticketsLeft = totalEvent.ticketsLeft || 0;
    const eventHeld = totalEvent.eventHeld || 0;

    const dataSold = {
        series: [ticketsSold],
        options: {
            chart: {

                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            labels: ['Tickets Sold'],
            colors: ['rgba(246, 176, 39, 1)'],
        },
    };

    const dataLeft = {
        series: [ticketsLeft],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            labels: ['Tickets Left'],
            colors: ['rgba(76, 175, 80, 1)'], // Change color if needed
        },
    };

    const dataHeld = {
        series: [eventHeld],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            labels: ['Events Held'],
            colors: ['rgba(33, 150, 243, 1)'], // Change color if needed
        },
    };

    return (
        <div className='mb-4'>
            <Card>
                <div className='event-Containers'>

                    <h3>Best Selling</h3>
                    <Form>
                        <Row>
                            <Col>
                            <CustomInput
                                    type="dropdown"
                                    options={categories}
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                />
                            
                           
                            </Col>
                            <Col>
                                <Space direction="vertical">
                                    <DatePicker className="form-control"  onChange={onChange} picker="month" />
                                </Space>
                            </Col>
                        </Row>
                    </Form>

                </div>
                <div className='event-Containers mt-5'>
                    <div className='radialChart'>
                        <h3 className='text-center'>Ticket Sold</h3>

                        <ApexChartComponent options={dataSold.options} series={dataSold.series} type="radialBar" height={350} />
                    </div>
                    <div  className='radialChart'>
                    <h3 className='text-center'>Tickets Left</h3>

                        <ApexChartComponent options={dataLeft.options} series={dataLeft.series} type="radialBar" height={350} />
                    </div>
                    <div  className='radialChart'>
                        <h3 className='text-center'>Events Held</h3>
                        <ApexChartComponent options={dataHeld.options} series={dataHeld.series} type="radialBar" height={350} />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default RadialbarChart;
