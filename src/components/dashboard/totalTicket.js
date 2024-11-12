import 'react-circular-progressbar/dist/styles.css';

import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Col, Form, Row } from 'react-bootstrap';
import { PiTicket } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';

import { totalTicketDashboardList } from '../../redux/dashboardSlice';
import { eventCategoryDetails } from "../../redux/eventSlice";

function TotalTicket() {
    const [selectedCategory, setSelectedCategory] = useState('');

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.eventSlice.eventCategory) || [];
    const totalEvent = useSelector((state) => state.dashboardSlice.totalTicketDashboard) || {};

    useEffect(() => {
        dispatch(eventCategoryDetails());
        dispatch(totalTicketDashboardList(selectedCategory));
    }, [dispatch, selectedCategory]);

    const totalTickets = totalEvent.ticketsSold + totalEvent.ticketsLeft || 0;
    const soldPercentage = totalTickets > 0 ? (totalEvent.ticketsSold / totalTickets) * 100 : 0;
   // const unsoldPercentage = totalTickets > 0 ? (totalEvent.ticketsLeft / totalTickets) * 100 : 0;

    const data = {
        series: [soldPercentage ], // Series for sold and unsold
        options: {
            chart: {
                height: 350,
                offsetY: -10
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    track: {
                        background: 'rgba(246, 176, 39, 1)',
                        strokeWidth: '97%',
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: 76,
                            fontSize: '24px',
                            color: "rgba(0, 0, 0, 1)",
                            lineHeight: "34px",
                            formatter: function (val) {
                                return Math.round(val) + "%"; // Show percentage rounded
                            }
                        }
                    }
                }
            },
            fill: {
                type: 'solid',
                colors: ['rgba(246, 176, 39, 1)', 'rgba(200, 200, 200, 1)'], // Colors for sold and unsold
            },
            stroke: {
                lineCap: 'round',
            },
        },
    };

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
    };

    return (
        <div >
            <div>
                <Row style={{alignItems:"center"}}>
                    <Col>
                        <h1 className='piechat-head'>Total Ticket</h1>
                    </Col>
                    <Col>
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
                    </Col>
                </Row>
            </div>

            {totalEvent ?(
                <div>
                    <div className="progress-circle">
                        <ReactApexChart options={data.options} series={data.series} type="radialBar" height={350} />
                        <div className="ticket-icon"><PiTicket /></div>
                    </div>
                    <div className="ticket-info">
                        <div className="tickets-sold">
                            <div className='tickets-styles'></div>
                            <span className="label">Sold</span>
                            <span className="value">{totalEvent.ticketsSold}</span>
                        </div>
                        <div className="tickets-sold">
                            <div className='tickets-styles-unsold'></div>
                            <span className="label">Unsold</span>
                            <span className="value">{totalEvent.ticketsLeft}</span>
                        </div>
                    </div>
                </div>
            ):(<div>No events</div>)}
        </div>
    );
}

export default TotalTicket;
