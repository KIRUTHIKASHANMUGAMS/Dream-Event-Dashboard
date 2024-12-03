import React, { useEffect, useState } from 'react';
import { CiGrid2H } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { eventCategoryDetails } from "../../redux/eventSlice";
import Button from '../button/button';
import Card from '../card/card';
import CustomInput from '../customInput/customInput';



function EventHead({ setView, setSelectedCategory }) {
    const [activeIcon, setActiveIcon] = useState('dashboard');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const categories = useSelector((state) => state.eventSlice.eventCategory) || [];

    const handleIconClick = (newView) => {
        setView(newView);
        setActiveIcon(newView);
    };
    useEffect(() => {
        dispatch(eventCategoryDetails());
    }, [dispatch]);

    const handleClick = () => {
        navigate("/createEvent")
    }

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId); // Pass selected category to parent
    };


    return (
        <div className='mb-4'>
            <Card>
                <div className='event-main-container'>
                    <h3>All Events</h3>

                    <div className='event-flex-page'>

                        <CustomInput
                            type="dropdown"
                            options={categories}
                            className="form-control"
                            name='eventcategory'

                            onChange={handleCategoryChange}
                        />



                        <div
                            className='event-image-border'
                            onClick={() => handleIconClick('dashboard')}
                            style={{ color: activeIcon === 'dashboard' ? ' rgba(246, 176, 39, 1)' : 'black' }} // Change color based on active icon
                        >
                            <RxDashboard width={24} height={24} />
                        </div>
                        <div
                            className='event-image-border'
                            onClick={() => handleIconClick('grid')}
                            style={{ color: activeIcon === 'grid' ? ' rgba(246, 176, 39, 1)' : 'black' }}

                        >

                            <CiGrid2H />
                        </div>
                        <div
                            className='event-image-border'
                            onClick={() => handleIconClick('calendar')}
                            style={{ color: activeIcon === 'calendar' ? ' rgba(246, 176, 39, 1)' : 'black' }} // Change color based on active icon
                        >
                            <MdOutlineDateRange />
                        </div>
                        <div>
                            < Button
                                name="Create Event"
                                featureName="Event"
                                permissionName="Create"
                                onClick={handleClick} /></div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default EventHead;
