import React from 'react';

const CustomInput = ({ type, label, options, name, value, onChange }) => {
    return (
        <div className="form-group">
           {label ?( <h4 className='mb-1'> {label && <label>{label}</label>}</h4>):(<div></div>)}
            {type === 'dropdown' ? (
                <select value={value} onChange={onChange} name={name} className="form-control">
                    <option value="">All</option>
                    {options.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
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
