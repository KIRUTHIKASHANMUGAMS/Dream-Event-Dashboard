import React, { useEffect,useState } from 'react';
import { Form } from 'react-bootstrap';
import { CiGrid2H } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';

import { eventCategoryDetails } from "../../redux/eventSlice";



function EventHead({ setView , setSelectedCategory  }) {
    const [activeIcon, setActiveIcon] = useState('dashboard');
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.eventSlice.eventCategory) || [];

    const handleIconClick = (newView) => {
        setView(newView);
        setActiveIcon(newView); 
    };
    useEffect(() => {
        dispatch(eventCategoryDetails());
    }, [dispatch]);

    
   
    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId); // Pass selected category to parent
    };


    return (
        <div className='event-main-container'>
            <p className='event-main-heading'>All Events</p>

            <div className='event-flex-page'>
                <Form.Control
                    as="select"
                    className='form-event-control'
                    onChange={handleCategoryChange}
                    name='eventcategory'
                >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </Form.Control>

       
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
            </div>
        </div>
    );
}

export default EventHead;
