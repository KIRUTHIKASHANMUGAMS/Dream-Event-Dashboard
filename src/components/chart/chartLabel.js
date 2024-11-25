import React from 'react';

function ChartLabel({ title, className, value }) {
    return (
        <div className={`${className[1]}`}>
            <span className={`${className[0]}`}></span>
            <h4 className='lableTitle'>{title}</h4>
            <h3>{value}</h3>
        </div>
    );
}

export default ChartLabel;