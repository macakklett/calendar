import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EventModalWindow from '../eventModalWindow/EventModalWindow';

import './event.scss';

const Event = ({ height, marginTop, title, description, time, eventId }) => {
  const [isOpenEventWindow, setIsOpenEventWindow] = useState(false);

  const closeEventModalWindow = () => setIsOpenEventWindow(false);

  const eventStyle = {
    height: `${height}px`,
    marginTop: `${marginTop}px`,
  };

  return (
    <>
      {isOpenEventWindow && (
        <EventModalWindow eventId={eventId} closeEventModalWindow={closeEventModalWindow} />
      )}
      <div
        style={eventStyle}
        className="event"
        data-event={eventId}
        onClick={() => setIsOpenEventWindow(true)}
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        <div className="event__description">{description}</div>
      </div>
    </>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
};

export default Event;
