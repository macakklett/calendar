import React, { useState } from 'react';
import EventModalWindow from '../eventModalWindow/EventModalWindow';

import './event.scss';

const Event = ({ height, marginTop, title, time, eventId }) => {
  const [isOpetEventWindow, setIsOpetEventWindow] = useState(false);
  const eventStyle = {
    height,
    marginTop,
  };

  const handleEvent = (e) => {
    console.log(e.target.closest('.event').dataset.event);
    setIsOpetEventWindow(true);
  };

  return (
    <div
      style={eventStyle}
      className="event"
      data-event={eventId}
      onClick={handleEvent}
    >
      {isOpetEventWindow && <EventModalWindow eventId={eventId} />}
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;
