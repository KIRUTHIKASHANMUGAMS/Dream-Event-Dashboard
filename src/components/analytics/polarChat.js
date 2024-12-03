import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ApexChartComponent from "../../components/chart/chart";
import { fetchTransactionList, totalTicketDashboardList } from '../../redux/dashboardSlice';
import Card from '../card/card';
import ChartLabel from '../chart/chartLabel';



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
        <div className='mb-4'>

      
        <Card>
            <div >

                <h3 >Overview</h3>

                <div className='event-container'>
                    <ApexChartComponent options={data.options} series={data.series} type="polarArea" height="260px" />
                    <div>
                        <Row>
                            <Col lg="6" md="6">
                    
                                <ChartLabel title="User Registration" className={["polar-name-register", "polar-chart-details"]}  />
                                    
                
                            </Col>
                            <Col lg="6" md="6">
                               
                                <ChartLabel title="Total Event" className={["polar-name-event", "polar-chart-details"]}  />

                           
                            </Col>
                            <Col lg="6" md="6">
                     
                                <ChartLabel title="Total Sold" className={["polar-name-sold", "polar-chart-details"]}  />

             
                              
                            </Col>
                            <Col lg="6" md="6">
                              
                                <ChartLabel title="Total Unsold" className={["polar-name-unsold", "polar-chart-details"]}  />

              
                              
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Card>
        </div>
    );
}

export default PolarChart;
