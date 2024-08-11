import React, { useState } from 'react';
import EventModalWindow from '../eventModalWindow/EventModalWindow';

import './event.scss';

const Event = ({ height, marginTop, title, time, eventId }) => {
  const [isOpenEventWindow, setIsOpenEventWindow] = useState(false);
  const [coordinatesOfClickMouse, setCoordinatesOfClickMouse] = useState(null);

  const closeEventModalWindow = () => setIsOpenEventWindow(false);

  const eventStyle = {
    height,
    marginTop: marginTop + '3px',
  };

  const handleOptionsEvent = (e) => {
    setCoordinatesOfClickMouse([e.clientX, e.clientY]);
    setIsOpenEventWindow(true);
  };

  return (
    <>
      {isOpenEventWindow && (
        <EventModalWindow
          eventId={eventId}
          closeEventModalWindow={closeEventModalWindow}
          coordinates={coordinatesOfClickMouse}
        />
      )}
      <div
        style={eventStyle}
        className="event"
        data-event={eventId}
        onClick={handleOptionsEvent}
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
    </>
  );
};

export default Event;
