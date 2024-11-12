import React from 'react';
import { Table } from 'react-bootstrap';

const CustomTable = ({ headers, data }) => {
  // Convert object to array if necessary
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
            <tr key={index}>
              <td>{speaker.speakerName}</td>
              <td>{speaker.speakerType}</td>
              <td>
                {speaker.speakerImage ? (
                  <img
                    src={URL.createObjectURL(speaker.speakerImage)}
                    alt="Speaker"
                    style={{ width: '50px', height: '50px' }}
                  />
                ) : (
                  'No image uploaded'
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
