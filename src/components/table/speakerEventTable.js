import React from 'react';
import { Table } from 'react-bootstrap';

const CustomTable = ({ headers, data }) => {
  const speakersArray = Array.isArray(data) ? data : data ? [data] : [];

  if (speakersArray.length === 0) {
    return <div>No data available</div>;
  }
  
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {speakersArray.map((speaker, index) => (
            <tr key={speaker._id || index}>
              <td>{speaker.speakerName}</td>
              <td>{speaker.speakerType}</td>
              <td>
                {speaker.speakerImage ? (
                  <img
                 
                    src={typeof speaker.speakerImage === 'string' ? `http://localhost:8000/${speaker.speakerImage}` : URL.createObjectURL(speaker.speakerImage)}
                    alt={`${speaker.speakerName} Image`}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                ) : (
                  "no image"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomTable;
