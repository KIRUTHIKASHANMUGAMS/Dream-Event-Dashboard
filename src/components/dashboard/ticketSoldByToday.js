import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import analysize from "../../assets/analysize.png"
import { fetchTransactionList } from '../../redux/dashboardSlice';
import ProgressBar from '../progressBar/progressBar';

function ticketSoldByToday() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.dashboardSlice.dashboardList) || [];


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchTransactionList());
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className='ticket-details'>
            <h3 >Ticket Sold By </h3>
            <h3 >Today</h3>
            <h1 >{data.ticketSoldByToday}</h1>
            <ProgressBar
                data={data.ticketSoldByToday}
                variant='rgba(159, 105, 0, 1)' />
            <div className='comparison'>

                <p>Comparing Last Day</p>

                <div ><img src={analysize} /> +15%</div>
            </div>
        </div>

    )
}

export default ticketSoldByToday
