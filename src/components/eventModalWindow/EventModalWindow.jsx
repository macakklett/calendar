import React from 'react';
import PropTypes from 'prop-types';
import { useEvents } from '../../hook/useEvents';

import './eventModalWindow.scss';

const EventModalWindow = ({ eventId, closeEventModalWindow }) => {
  const { deleteEvent } = useEvents();

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
      <div className="event-modal">
        <i className="fas fa-trash-alt" />
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
