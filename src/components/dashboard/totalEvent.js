// import React, { useEffect } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import { useDispatch, useSelector } from 'react-redux';

// import analysize from "../../assets/analysize.png"
// import map from "../../assets/Bitmap-icon.png"
// import dashboard from "../../assets/dashboard-icon.png";
// import person from "../../assets/person-icon.png";
// import ticket from "../../assets/ticket-icon.png";
// import { fetchTransactionList } from '../../redux/dashboardSlice';
// import Calender from "./calender"
// import CandlestickChart from './candleStick';
// import PieChart from './pieChart';
// import RecentEvent from './recentEvent';
// import Totalticket from "./totalTicket";
// import Transaction from "./transaction";





// function TotalEvent() {

//     const dispatch = useDispatch();
//     const data = useSelector((state) => state.dashboardSlice.dashboardList) || [];


//     useEffect(() => {
//         const fetchData = async () => {
//             await dispatch(fetchTransactionList());
//         };
//         fetchData();
//     }, [dispatch]);




//     return (
//         <div>
//             <Container fluid>
//                 <Row>
//                     <Col lg={9} md={12}>

//                         <Row>
//                             <Col lg={9} md={9} >
//                                 <Row>


//                                     <Col lg={6} md={6}>
//                                         <div className="badge-container">
//                                             <div className="icon-container">
//                                                 <img src={dashboard}   width="30px" height="30px" alt='icon'/>
//                                             </div>
//                                             <div className="text-container">
//                                                 <h4 className="title">Total Events</h4>
//                                                 <p className="count">{data.totalEvents}</p>
//                                             </div>
//                                         </div>
//                                     </Col>

//                                     {/* User Registration */}
//                                     <Col lg={6} md={6}>
//                                         <div className="badge-container">
//                                             <div className="icon-container-register">
//                                             <img src={person}   width="30px" height="30px" alt='icon'/>
//                                             </div>
//                                             <div className="text-container">
//                                                 <h4 className="title">User Registration</h4>
//                                                 <p className="count">{data.totalUsers}</p>
//                                             </div>
//                                         </div>
//                                     </Col>



//                                     {/* Ticket Sold */}
//                                     <Col lg={6} md={6}>
//                                         <div className="badge-container">
//                                             <div className="icon-container-sold">
//                                             <img src={ticket}   width="30px" height="30px" alt='icon'/>
//                                             </div>
//                                             <div className="text-container">
//                                                 <h4 className="title">Ticket Sold</h4>
//                                                 <p className="count">{data.totalTickets}</p>
//                                             </div>
//                                         </div>
//                                     </Col>

//                                     {/* Total Revenue */}
//                                     <Col lg={6} md={6}>
//                                         <div className="badge-container">
//                                             <div className="icon-container-revenue">
//                                             <img src={map}   width="30px" height="30px" alt='icon'/>
//                                             </div>
//                                             <div className="text-container">
//                                                 <h4 className="title">Total Revenue</h4>
//                                                 <p className="count">$ {data.totalRevenue}</p>
//                                             </div>
//                                         </div>
//                                     </Col>
//                                 </Row>
//                             </Col>

//                             <Col lg={3} md={3} className='ticket-details'>
//                                 <div  >
//                                     <h4 className="title-sold">Ticket Sold By </h4>
//                                     <h4 className="title-sold">Today</h4>
//                                     <p className="count-event">{data.ticketSoldByToday}</p>
//                                     <ProgressBar now={data.ticketSoldByToday} variant='rgba(159, 105, 0, 1)' />
//                                     <div className='comparison'>

//                                         <p className='comparing-details'>Comparing Last Day</p>

//                                         <div><img src={analysize} />+15%</div>
//                                     </div>
//                                 </div>

//                             </Col>

//                         </Row>



//                         <Row>
//                             <Col lg="8" >
//                                 <PieChart />
//                             </Col>
//                             <Col lg="4" className="total-ticket-container">
//                                 <Totalticket />
//                             </Col>

//                         </Row>

//                         <Row>
//                             <Col >
//                                 <CandlestickChart />
//                             </Col>
//                         </Row>


//                         <Row>
//                             <Col lg="4" md="6" >
//                                 <Transaction />

//                             </Col>
//                             <Col lg="8" md="6" >

//                                 <RecentEvent />
//                             </Col>
//                         </Row>
//                     </Col>




//                     <Col lg={3} md={12}>

//                             <div className='latestCotainer  container-height'>
//                                 <h1 className='latestSales-container'>Latest Sales</h1>

//                                 {data && data.latestSales && data.latestSales.length > 0 ? (
//                                     data.latestSales.map((event, index) => (
//                                         <div key={index} >
//                                             <div className='latest-details latestCotainer'>
//                                                 <div className='latest-image'>
//                                                     <img src={`http://localhost:8000/${event.eventImage}`} alt={event.eventName} width="42px" height="42px" style={{borderRadius:"12px"}} />
//                                                     <div>
//                                                         <p className='latestSales-head'>{event.eventName}</p>
//                                                         <p className='latestSales-content'>{event.location}</p>
//                                                     </div>
//                                                 </div>
//                                                 <p className='latestSales-sec'>{new Date(event.eventDate).toLocaleDateString()}</p>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No latest sales available.</p>
//                                 )}
//                             </div>



//                             <Row>
//                                 <Col>
//                                     <Calender />


//                                 </Col>
//                             </Row>

//                     </Col>




//                 </Row>




//             </Container>
//         </div>
//     );
// }

// export default TotalEvent;





import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import map from "../../assets/Bitmap-icon.png"
import dashboard from "../../assets/dashboard-icon.png";
import person from "../../assets/person-icon.png";
import ticket from "../../assets/ticket-icon.png";
import { fetchTransactionList } from '../../redux/dashboardSlice';
import DashboardCard from '../card/dashboardCard';





function TotalEvent() {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.dashboardSlice.dashboardList) || [];


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTransactionList());
        };
        fetchData();
    }, [dispatch]);




    return (
        <div>
            <Container fluid>
                <div className="">
                    <Row>
                        <Col lg={6} md={6} xs={12}>
                            <DashboardCard
                                title="New Events"
                                value={data.totalEvents}
                                icon={dashboard}
                                className="text-white icon-container "
                                onClick={() => console.log('New Events clicked')}
                            />
                        </Col>
                        <Col lg={6} md={6} xs={12}>
                            <DashboardCard
                                title="User Registration"
                                value={data.totalUsers}
                                icon={person}
                                className="text-white  icon-container-register"
                                onClick={() => console.log('User Registration clicked')}
                            />
                        </Col>
                        <Col lg={6} md={6} xs={12}>
                            <DashboardCard
                                title="Ticket Sold"
                                value={data.totalTickets}
                                icon={ticket}
                                className=" text-white icon-container-sold"
                                onClick={() => console.log('Ticket Sold clicked')}
                            />
                        </Col>
                    
                        <Col lg={6} md={6} xs={12}>
                            <DashboardCard
                                title="Total Revenue"
                                value={data.totalRevenue}
                                icon={map}
                                className="text-white icon-container-revenue"
                                onClick={() => console.log('Total Revenue clicked')}
                            />
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default TotalEvent;

