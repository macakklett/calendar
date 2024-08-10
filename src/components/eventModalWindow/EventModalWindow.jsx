import React from 'react';

import './eventModalWindow.scss';
import { useEvents } from '../../hook/useEvents';

const EventModalWindow = ({ eventId }) => {
  const { deleteEvent } = useEvents();
  return (
    <div className="event-modal">
      <button className="delete-button" onClick={() => deleteEvent(eventId)}>
        Delete
      </button>
    </div>
  );
};

export default EventModalWindow;
