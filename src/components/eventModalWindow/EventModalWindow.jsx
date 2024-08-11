import React, { useEffect, useState } from 'react';

import './eventModalWindow.scss';
import { useEvents } from '../../hook/useEvents';

const EventModalWindow = ({ eventId, coordinates, closeEventModalWindow }) => {
  const { deleteEvent } = useEvents();
  const [position, setPosition] = useState({ top: 20, left: 20 });

  // useEffect(() => {
  //   const [x, y] = coordinates;
  //   setPosition({ top: y, left: x });
  // }, [coordinates]);

  const handleDeleteButton = () => {
    deleteEvent(eventId);
    closeEventModalWindow();
  };

  const handleCloseModal = (e) => {
    if (e.target.className === 'event-overlay') {
      closeEventModalWindow();
    }
  };

  return (
    <>
      <div className="event-overlay" onClick={handleCloseModal}></div>
      <div className="event-modal" style={position}>
        <button className="delete-button" onClick={handleDeleteButton}>
          Delete
        </button>
      </div>
    </>
  );
};

export default EventModalWindow;
