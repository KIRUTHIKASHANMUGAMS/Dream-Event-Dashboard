import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList, totalTicketDashboardList } from '../../redux/dashboardSlice';

function PolarChart() {
    const dispatch = useDispatch();
    
    const datas = useSelector((state) => state.dashboardSlice.dashboardList) || {};
    const totalEvent = useSelector((state) => state.dashboardSlice.totalTicketDashboard) || {};

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTransactionList());
            dispatch(totalTicketDashboardList());
        };
        fetchData();
    }, [dispatch]);


    const data = {
        series: [
            datas.totalUsers || 0,
            datas.totalEvents || 0,
            totalEvent.totalTickets || 0,
            totalEvent.ticketsLeft || 0 
        ],
        options: {
            chart: {
                type: 'polarArea',
            },
            stroke: {
                colors: ['#fff'],
            },
            fill: {
                opacity: 0.8,
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            colors: [
                'rgba(36, 90, 224, 1)', 
                'rgba(216, 33, 72, 1)', 
                'rgba(1, 200, 151, 1)', 
                'rgba(0, 30, 108, 1)'
            ],
            labels: ['New Registration', 'New Event', 'Ticket Sold', 'Total Unsold'],
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

    return (
        <div className='polar-container'>
            <div className='event-container'>
                <h1 className='piechart-head'>Overview</h1>
            </div>
            <div className='event-container'>
                <ReactApexChart options={data.options} series={data.series} type="polarArea" height="357px" />
                <div style={{ marginTop: '52px' }}>
                    <Row>
                        <Col lg="6">
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ backgroundColor: '#003DA5', width: '20px', height: '20px', marginRight: '10px', borderRadius: "50%" }}></div>
                                <span style={{ fontWeight: '600' }}>User Registration</span>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ backgroundColor: '#00E396', width: '20px', height: '20px', marginRight: '10px', borderRadius: "50%" }}></div>
                                <span style={{ fontWeight: '600' }}>Total Event</span>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ backgroundColor: '#FF4560', width: '20px', height: '20px', marginRight: '10px', borderRadius: "50%" }}></div>
                                <span style={{ fontWeight: '600' }}>Ticket Sold</span>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ backgroundColor: '#000000', width: '20px', height: '20px', marginRight: '10px', borderRadius: "50%" }}></div>
                                <span style={{ fontWeight: '600' }}>Total Unsold</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default PolarChart;
