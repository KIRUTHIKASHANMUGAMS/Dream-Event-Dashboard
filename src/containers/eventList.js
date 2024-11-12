import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Calender from "../components/eventList/calender";
import CalenderEvent from "../components/eventList/calenderEvent"
import EventDetails from '../components/eventList/eventDetails';
import EventHead from '../components/eventList/eventHead';
import TableEvent from '../components/eventList/tableEvent';

function EventList() {
  const [view, setView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [calender, setCalender] =useState('')


  return (
    <div>
      <Container fluid>
      <EventHead view={view} setView={setView} setSelectedCategory={setSelectedCategory} />
              {view === 'dashboard' &&
          <Row>

            <Col lg={8} md={12}>

              <EventDetails   selectedCategory={selectedCategory} calender={calender} />

            </Col>
            <Col lg={4} md={12}>
              <Calender  setCalender={setCalender} />
            </Col>
          </Row>
        }

        {view === 'grid' &&
        <Container fluid>
          <Row>

            <Col lg="9" md={12}>

            <TableEvent selectedCategory={selectedCategory} calender={calender} />

            </Col>
            <Col lg="3" md={12}>
              <Calender   setCalender={setCalender}/>
            </Col>
          </Row>
          </Container>
          }
          {view === 'calendar' && 
          <Row>
            <Col>
            <CalenderEvent/>
            </Col>
          </Row>


          }

      </Container>
    </div>
  );
}

export default EventList;
