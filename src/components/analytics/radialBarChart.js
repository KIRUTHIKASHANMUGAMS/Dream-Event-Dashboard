import { DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { totalEventDashboardList } from '../../redux/dashboardSlice';
import { eventCategoryDetails } from "../../redux/eventSlice";

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
        <div className='piechat-container'>
            <div className='event-Containers'>
                <h1 className='piechart-head'>Best Selling</h1>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formGridState">
                                <Form.Control
                                    as="select"
                                    className='form-event-control'
                                    onChange={handleCategoryChange}
                                    name='eventcategory'
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Space direction="vertical">
                                <DatePicker className='form-event-control' onChange={onChange} picker="month" />
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className='event-Containers mt-5'>
                <div>
                    <h1 className='radialbar-head'>Ticket Sold</h1>
                    <ReactApexChart options={dataSold.options} series={dataSold.series} type="radialBar" height={350} />
                </div>
                <div>
                    <h1 className='radialbar-head'>Tickets Left</h1>
                    <ReactApexChart options={dataLeft.options} series={dataLeft.series} type="radialBar" height={350} />
                </div>
                <div>
                    <h1 className='radialbar-head'>Events Held</h1>
                    <ReactApexChart options={dataHeld.options} series={dataHeld.series} type="radialBar" height={350} />
                </div>
            </div>
        </div>
    );
}

export default RadialbarChart;
