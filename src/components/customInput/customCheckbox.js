import React from 'react';
const Toggle = ({ label, isChecked = false, onToggle }) => {
  const handleToggle = () => {
    if (onToggle) onToggle(!isChecked); // Pass the new state to the parent
  };

  return (
    <div className="toggle-container" onClick={handleToggle}>
      {label && <span className="toggle-label">{label}</span>}
      <div className={`toggle-switch ${isChecked ? 'on' : 'off'}`}>
        <div className="toggle-thumb"></div>
      </div>
    </div>
  );
};

export default Toggle;
