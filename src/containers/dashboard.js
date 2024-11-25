import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import Calender from "../components/calender/calender";
import CandlestickChart from "../components/dashboard/candleStick";
import LatestSales from "../components/dashboard/latestSales";
import PieChart from "../components/dashboard/pieChart";
import RecentEvent from "../components/dashboard/recentEvent";
import TicketSoldByToday from "../components/dashboard/ticketSoldByToday";
import TotalEvent from "../components/dashboard/totalEvent";
import TotalTicket from "../components/dashboard/totalTicket";
import Transaction from "../components/dashboard/transaction";

const Dashboard = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col xxl={9} xl={8} lg={8} md={12} xs={12}>
            <Row>
              <Col xl={8} lg={12} md={9}>
                <TotalEvent />
              </Col>

              <Col xl={4} lg={12} md={3}>
                <TicketSoldByToday />
              </Col>

            </Row>

            <Row>
              <Col xxl={8} xl={12} lg={12} md={12} xs={12}>
                <PieChart />
              </Col>

              <Col xxl={4} xl={12} lg={12} md={12} xs={12}>
                <TotalTicket />
              </Col>

            </Row>

            <Row>
              <Col lg={12}>
                <CandlestickChart />
              </Col>

            </Row>

            <Row>
              <Col lg={6}>
                <Transaction />
              </Col>
              <Col lg={6}>
                <RecentEvent />
              </Col>
            </Row>
          </Col>



          <Col xxl={3} xl={4} lg={4} md={12} xs={12}>
            <Row>
              <Col>
                <LatestSales />
              </Col>

            </Row>
            <Row>
              <Calender />
            </Row>
          </Col>
        </Row>


      </Container>
    </div>
  )
};

export default Dashboard;
