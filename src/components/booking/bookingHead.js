import { DatePicker, Space } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { eventCategoryDetails } from "../../redux/eventSlice";
import Card from '../card/card';
import CustomInput from '../customInput/customInput';

function EventHead({ setSelectedCategory, setDate }) {
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
        <div className='mb-3'>
            <Card>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3>Booking</h3>
                    <div className='d-flex justify-content-between gap-2'>

                        <CustomInput
                            type="dropdown"
                            options={categories}
                            className="form-control"
                            name='eventcategory'

                            onChange={handleCategoryChange}
                        />
                        <Space direction="vertical" >

                            <DatePicker
                                className="form-control"
                                onChange={onChange}
                                format={dateFormat} // Ensure the format is consistent
                            />
                        </Space>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default EventHead;
