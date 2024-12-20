import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import DonutChart from '../components/analytics/donutChart';
import LineChart from '../components/analytics/lineChart';
import PolarChart from "../components/analytics/polarChat";
import RadialbarChart from '../components/analytics/radialBarChart';
import TicketSales from '../components/analytics/ticketSales';
import TrendingEvent from '../components/analytics/trendingEvent';


function analytics() {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xxl={4} xl={5} lg={5} >
                        <PolarChart />
                    </Col>
                    <Col xxl={8} xl={7} lg={7}>

                        <LineChart />


                    </Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <RadialbarChart />
                    </Col>

                    <Col lg={4}>
                        <DonutChart />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <TrendingEvent />

                    </Col>
                    <Col lg={6}>
                        <TicketSales />
                    </Col>
                </Row>


            </Container>


        </div>
    )
}

export default analytics
