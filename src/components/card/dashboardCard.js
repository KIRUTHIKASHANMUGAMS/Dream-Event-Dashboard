import React from 'react';

const DashboardCard = ({ title, value, icon,className, style, onClick }) => {
  return (
    <div
      className="badge-container d-flex align-items-center"
      style={style}
      onClick={onClick}
    >
      <div className={`${className}`} >
        <img src={icon}  className="icon-image"  alt="icon" />
      </div>
      <div className="text-container">
        <h3 className="title mb-0">{title}</h3>
        <h1 className="count mb-0">{value}</h1>
      </div>
    </div>
  );
};

export default DashboardCard;
