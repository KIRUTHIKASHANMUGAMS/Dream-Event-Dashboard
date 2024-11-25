import React from 'react';

const CustomTextArea = ({ label, value, onChange, name }) => {
    return (
        <div className="form-group">
            <h4 className='mb-1'> {label && <label>{label}</label>}</h4>
            <textarea
                className="form-control"
                value={value}
                onChange={onChange}
                name={name}
            />
        </div>
    );
};

export default CustomTextArea;
