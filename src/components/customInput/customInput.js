import React from 'react';

const CustomInput = ({ type, label, options = [], name, value, onChange }) => {
    return (
        <div className="form-group">
            {label && <label htmlFor={name} className='mb-1'>{label}</label>}
            {type === 'dropdown' ? (
                <select value={value} onChange={onChange} name={name} className="form-control">
                    <option value="">Select an option</option>
                    {options.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name || category.roleName}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    name={name}
                    className="form-control"
                />
            )}
        </div>
    );
};

export default CustomInput;
