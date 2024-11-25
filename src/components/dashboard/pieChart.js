// import { DatePicker, Space } from 'antd';
// import React, { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import { Col, Form, Row } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';

// import { totalEventDashboardList } from '../../redux/dashboardSlice';
// import { eventCategoryDetails } from "../../redux/eventSlice";

// function PieChart() {
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [date, setDate] = useState(null); // Initialize as null for better handling

//     const dispatch = useDispatch();
//     const categories = useSelector((state) => state.eventSlice.eventCategory) || [];
//     const totalEvent = useSelector((state) => state.dashboardSlice.totalEventDashboard) || {};

//     useEffect(() => {
//         dispatch(eventCategoryDetails());
//         dispatch(totalEventDashboardList(selectedCategory, date));
//     }, [dispatch, selectedCategory, date]);

//     const onChange = (date, dateString) => {
//         setDate(dateString); // Store the date string
//     };

//     const handleCategoryChange = (event) => {
//         const categoryId = event.target.value;
//         setSelectedCategory(categoryId);
//     };

//     const data = {
//         series: [totalEvent.ticketsSold || 0, totalEvent.eventHeld || 0, totalEvent.ticketsLeft || 0],
//         options: {
//             chart: {
//                 width: 380,
//                 type: 'donut',
//             },
//             colors: ['rgba(216, 33, 72, 1)', 'rgba(1, 200, 151, 1)', 'rgba(0, 30, 108, 1)'],
//             dataLabels: {
//                 enabled: true,
//                 style: {
//                     fontSize: '14px',
//                     fontWeight: 'bold',
//                     colors: ['#fff'],
//                 },

//             },
//             legend: {
//                 show: false,
//             },

//             responsive: [{
//                 breakpoint: 480,
//                 options: {
//                     chart: {
//                         width: 200,
//                     },
//                     legend: {
//                         position: 'bottom',
//                     },
//                 },
//             }],
//         },
//     };

//     const hasEvents = totalEvent.ticketsSold > 0 || totalEvent.eventHeld > 0;

//     return (
//         <div className='piechat-container event-height'>
//             <div className='event-Containers'>
//                 <h1 className='piechat-head'>Total Event</h1>
//                 <Form>
//                     <Row>
//                         <Col>
//                             <Form.Group controlId="formGridState">
//                                 <Form.Control
//                                     as="select"
//                                     className='form-event-control'
//                                     onChange={handleCategoryChange}
//                                     name='eventcategory'
//                                 >
//                                     <option value="">Select category</option>
//                                     {categories.map((category) => (
//                                         <option key={category._id} value={category._id}>
//                                             {category.name}
//                                         </option>
//                                     ))}
//                                 </Form.Control>
//                             </Form.Group>
//                         </Col>
//                         <Col>
//                             <Space direction="vertical">
//                                 <DatePicker className='form-event-control' onChange={onChange} picker="month" />
//                             </Space>
//                         </Col>
//                     </Row>
//                 </Form>
//             </div>

//             <div >
//                 {hasEvents ? (
//                     <div className='event-Containers-piechart'>
//                         <ReactApexChart options={data.options} series={data.series} type="donut" />
//                         <div style={{ marginTop: '52px' }}>
//                             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
//                                 <div style={{ backgroundColor: '', width: '20px', height: '20px', marginRight: '20px' }}></div>
//                                 <span  className='piechart-name'>Ticket Sold</span>
//                                 <span className='piechart-price'>{totalEvent.ticketsSold}</span>
//                             </div>
//                             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
//                            rgba(216,33,72,1)     <div style={{ backgroundColor: 'rgba(1, 200, 151, 1)', width: '20px', height: '20px', marginRight: '20px' }}></div>
//                                 <span  className='piechart-name'>Event Held</span>
//                                 <span  className='piechart-price'>{totalEvent.eventHeld}</span>
//                             </div>
//                             <div style={{ display: 'flex', alignItems: 'center' }}>
//                                 <div style={{ backgroundColor: 'rgba(0, 30, 108, 1)', width: '20px', height: '20px', marginRight: '20px' }}></div>
//                                 <span  className='piechart-name'>Ticket Left</span>
//                                 <span  className='piechart-price'>{totalEvent.ticketsLeft}</span>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <div style={{ textAlign: "center", padding:"20px" }}>No events available.</div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default PieChart;




import { DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ApexChartComponent from '../../components/chart/chart';
import ChartLabel from '../../components/chart/chartLabel';
import CustomInput from "../../components/customInput/customInput"
import { totalEventDashboardList } from '../../redux/dashboardSlice';
import { eventCategoryDetails } from "../../redux/eventSlice";
import Card from '../card/card';

function PieChart() {
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
        setDate(dateString);
    };

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);
    };

    const chartData = {
        series: [totalEvent.ticketsSold || 0, totalEvent.eventHeld || 0, totalEvent.ticketsLeft || 0],
        options: {
            chart: {
                width: 380,
                type: 'donut',
            },
            colors: ['rgba(216, 33, 72, 1)', 'rgba(1, 200, 151, 1)', 'rgba(0, 30, 108, 1)'],
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    colors: ['#fff'],
                },
            },
            legend: {
                show: false,
            },
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

    const hasEvents = totalEvent.ticketsSold > 0 || totalEvent.eventHeld > 0;

    return (
        <div className='mb-4'>

    
        <Card>
            <div className='event-height-piechart'>
                <div className='event-Containers'>
                    <h3>Total Event</h3>
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
                                    <DatePicker className="form-control" onChange={onChange} picker="month" />
                                </Space>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <div>
                    {hasEvents ? (
                        <div className='event-Containers-piechart d-flex justify-content-around align-items-center'>
                          <div className='chat-resize'>
                            <ApexChartComponent
                                type="donut"
                                series={chartData.series}
                                options={chartData.options}
                                height={350}
                            />
                            </div>
                            <div>
                                <div className='d-flex justify-content-between'>


                                </div>
                                <ChartLabel title="Ticket Sold" className={["piechart-name-sold", "piechart-details"]} value={totalEvent.ticketsSold} />
                                <ChartLabel title="Event Held" className={["piechart-name-held", "piechart-details"]} value={totalEvent.eventHeld} />
                                <ChartLabel title="Ticket Left" className={["piechart-name-left", "piechart-details"]} value={totalEvent.ticketsLeft} />
                            </div>
                        </div>
                    ) : (
                        <div className='NoEventList'>No events available.</div>
                    )}
                </div>
            </div>
        </Card>
        </div>
    );
}

export default PieChart;

