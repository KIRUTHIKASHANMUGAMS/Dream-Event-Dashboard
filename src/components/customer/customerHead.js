import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { eventCategoryDetails } from "../../redux/eventSlice";

function customerHead({ setSelectedCategory, setDate }) {
    const [size] = useState('large');
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.eventSlice.eventCategory) || [];
    
    useEffect(() => {
        dispatch(eventCategoryDetails());
    }, [dispatch]);

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId); // Pass selected category to parent
    };

    const onChange = (date, dateString) => {
        console.log(dateString);
        setDate(dateString); // Set the date string in the parent
    };

    const dateFormat = 'YYYY-MM-DD';

    return (
        <div className='event-main-container'>
            <p className='event-main-heading'>Customer</p>
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


                <DatePicker 
                   className='form-event-control' 
                    size={size} 
                    onChange={onChange} 
                    format={dateFormat} // Ensure the format is consistent
                />
            </div>
        </div>
    );
}

export default customerHead;
