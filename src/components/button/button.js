import React from 'react'


function Button({ name, onClick, type = "button" , style}) {
    return (
      <div>
        <button
          type={type}
          className={`event-speaker-button`}
          style={style}
          onClick={onClick}
        >
          {name}
        </button>
      </div>
    );
  }
  

export default Button
