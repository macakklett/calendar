import React, { useState } from 'react';

import './eventModalWindow.scss';
import PropTypes from 'prop-types';
import { useEvents } from '../../hook/useEvents';

const EventModalWindow = ({ eventId, closeEventModalWindow }) => {
  const { deleteEvent } = useEvents();
  const [position, setPosition] = useState({ top: 20, left: 20 });

  const handleDeleteButton = () => {
    deleteEvent(eventId);
    closeEventModalWindow();
  };

  const handleCloseModal = e => {
    if (e.target.className === 'event-overlay') {
      closeEventModalWindow();
    }
  };

  return (
    <>
      <div className="event-overlay" onClick={handleCloseModal}></div>
      <div className="event-modal" style={position}>
        <i class="fas fa-trash-alt"></i>
        <button className="delete-button" onClick={handleDeleteButton}>
          Delete
        </button>
      </div>
    </>
  );
};

EventModalWindow.propTypes = {
  eventId: PropTypes.string.isRequired,
  closeEventModalWindow: PropTypes.func.isRequired,
};

export default EventModalWindow;
