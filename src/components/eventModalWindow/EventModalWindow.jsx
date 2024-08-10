import React from 'react';

import './eventModalWindow.scss';
import { useEvents } from '../../hook/useEvents';

const EventModalWindow = ({ eventId, coordinates, closeEventModalWindow }) => {
  const { deleteEvent } = useEvents();
  const [x, y] = coordinates;
  const style = {
    top: `calc(${y}px)`,
    left: `calc(${x}px)`,
  };

  const handlerDeleteButton = () => {
    deleteEvent(eventId);
    closeEventModalWindow();
  };

  return (
    <div className="event-modal" style={style}>
      <button className="delete-button" onClick={handlerDeleteButton}>
        Delete
      </button>
    </div>
  );
};

export default EventModalWindow;
