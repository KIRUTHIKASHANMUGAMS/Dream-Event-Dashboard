import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ProgressBarComponent({ data, variant }) {
  return (
    <div >
      <ProgressBar  now={data} variant={variant} />
    </div>
  );
}

export default ProgressBarComponent;
