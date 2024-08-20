import React from 'react';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour';

import './day.scss';

const Day = ({ dataDay, dayEvents }) => {
  const hours = Array(24)
    .fill()
    .map((_, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);

        return <Hour key={dataDay + hour} dataHour={hour} hourEvents={hourEvents} />;
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.instanceOf(Date).isRequired,
      dateTo: PropTypes.instanceOf(Date).isRequired,
      description: PropTypes.string,
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

export default Day;
