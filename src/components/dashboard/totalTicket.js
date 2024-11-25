import 'react-circular-progressbar/dist/styles.css';

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { PiTicket } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';

import ApexChartComponent from "../../components/chart/chart";
import { totalTicketDashboardList } from '../../redux/dashboardSlice';
import { eventCategoryDetails } from "../../redux/eventSlice";
import Card from '../card/card';
import ChartLabel from '../chart/chartLabel';
import CustomInput from '../customInput/customInput';

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

    const data = {
        series: [soldPercentage],
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
        <div  className='mb-4'>
            <Card>
                <div className="event-height-piechart">


                    <div >
                        <Row style={{ alignItems: "center", marginBottom: "30px" }}>
                            <Col>
                                <h3 className='piechat-head'>Total Ticket</h3>
                            </Col>
                            <Col>
                                <CustomInput
                                    type="dropdown"
                                    options={categories}
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                />

                            </Col>
                        </Row>
                    </div>

                    {totalEvent ? (
                        <div>
                            <div className="progress-circle">
                                <ApexChartComponent
                                    type="radialBar"
                                    series={data.series}
                                    options={data.options}
                                    height={350}
                                />

                                <div className="ticket-icon"><PiTicket /></div>
                            </div>
                            <div className='d-flex justify-content-around mb-4'>
                                <ChartLabel title="Sold" className={["tickets-styles", "tickets-sold"]} value={totalEvent.ticketsSold} />

                                <ChartLabel title="Unsold" className={["tickets-styles-unsold", "tickets-sold"]} value={totalEvent.ticketsLeft} />

                            </div>

                        </div>
                    ) : (<div className='NoEventList'>No events</div>)}
                </div>
            </Card>
        </div>
    );
}

export default TotalTicket;
