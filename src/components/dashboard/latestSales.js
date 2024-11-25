import React ,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactionList } from '../../redux/dashboardSlice';
import Card from '../card/card';


function LatestSales() {

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

      
        <Card>

            <div className='event-height'>
                <h3>Latest Sales</h3>

                {data && data.latestSales && data.latestSales.length > 0 ? (
                    data.latestSales.map((event, index) => (
                        <div className='mb-3'>
                        <Card className="mt-2">
                        <div key={index} className='latest-details '>
                            <div className='latest-image'>
                                <img
                                    src={`http://localhost:8000/${event.eventImage}`}
                                    alt={event.eventName}
                                    width="60px"
                                    height="60px"
                                    style={{ borderRadius: "12px" }}
                                />
                                <div>
                                    <h4>{event.eventName}</h4>
                                    <h5>{event.location}</h5>
                                </div>
                            </div>
                            <h6 className='latestSales-sec'>{new Date(event.eventDate).toLocaleDateString()}</h6>
                        </div>
                        </Card>
                        </div>
                    ))
                ) : (
                    <p>No recent sales available.</p> // Add a fallback message
                )}
            </div>
        </Card>
          </div>

    );
}

export default LatestSales;
