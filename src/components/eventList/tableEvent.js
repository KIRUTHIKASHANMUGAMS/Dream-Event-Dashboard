import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { deleteEventSliceDetails, eventListDetails } from "../../redux/eventSlice";
import Button from '../button/button';
import Card from '../card/card';
import CustomModal from '../modal/Modal';
import CustomTable from '../table/customTable';

const TableEvent = ({ selectedCategory, calender }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.eventSlice.eventList) || [];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(eventListDetails(selectedCategory, calender));
    };

    fetchData();
  }, [dispatch, selectedCategory, calender]);

  const flattenedData = data.flatMap((event, index) => ({
    SNo: index + 1,
    id: event._id,
    'Event Name': event.eventName,
  
    'Event Date': new Date(event.eventDate).toLocaleDateString(), // Format date
    'Event Time': event.eventTime,

    'Event Image': <img src={`http://localhost:8000/${event.imageUrl}`} width="50px" height="50px" alt={event.eventName} />,
    'Price': event.price,
    "Location": event.location,
    'Total Seats': event.totalSeats,
    canEdit: true,
    canDelete: true,
  }));

  const onEdit = (row) => {
    navigate(`/createEvent/${row.id}`);
  };

  const onDelete = (row) => {
    setSelectedEventId(row.id);
    setShowModal(true); // Show the modal
  };

  const headers = [
    'SNo',
    'Event Name',
    'Event Date',
    'Event Time',

    'Price',
    'Location',
    'Event Image',
    'Total Seats',
    "Actions"
  ];

  const confirmDelete = async () => {
    if (selectedEventId) {
      await dispatch(deleteEventSliceDetails(selectedEventId)); // Wait for deletion to complete
      await dispatch(eventListDetails(selectedCategory, calender)); // Fetch updated list
      setShowModal(false); // Close the modal
      setSelectedEventId(null); // Reset selected ID
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedEventId(null); // Reset selected ID
  };

  return (
    <div className='mb-4'>
      <Card>
      <ToastContainer
                    autoClose={3000}
                    position="top-right"
                    hideProgressBar
                    closeOnClick
                    pauseOnHover
                    style={{ top: '90px', width: '17%', textAlign: 'center', left: '50%' }}
                />
        {flattenedData.length > 0 ? (
          <CustomTable
            headers={headers}
            data={flattenedData}
            rowsPerPage={5}
            featureName="Event"
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : (
          <p>No events available.</p>
        )}

        {/* Custom Modal for Confirmation */}
        <CustomModal
          show={showModal}
          handleClose={handleClose}
          handleConfirm={confirmDelete}
          body={
            <div>
              <h3 className='mb-3'>Delete</h3>
              <h5>Are you sure you want to delete this event?</h5>
              <div className='d-flex justify-content-end gap-2 mt-3'>
                <Button name="Cancel" style={{ backgroundColor: "#6c757d", color: "white" }} onClick={handleClose} />
                <Button style={{ backgroundColor: "rgb(231, 28, 28)", color: "white" }} name="Delete" onClick={confirmDelete} />
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default TableEvent;
