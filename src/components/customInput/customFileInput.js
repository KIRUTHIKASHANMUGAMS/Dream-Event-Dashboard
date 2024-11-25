import React from 'react';

const CustomFileInput = ({ label, onChange, name }) => {
    return (
        <div className="form-group">
            <h4 className='mb-1'> {label && <label>{label}</label>}</h4>

            <div>
                <input
                    type="file"
                    className="form-event-control custom-file-input"
                    onChange={onChange}
                    name={name}
                />
            </div>

        </div>
    );
};

export default CustomFileInput;
