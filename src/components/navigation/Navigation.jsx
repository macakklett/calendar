import React from 'react';
import { getIsToday } from '../../utils/dateUtils.js';

import { days } from '../../utils/dateUtils.js';

import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const isToday = getIsToday(dayDate);

        return (
          <div key={dayDate.getDay()} className="calendar__day-label day-label">
            <span
              className={`day-label__day-name ${
                isToday ? 'day-label__day-name_current' : ''
              }`}
            >
              {days[dayDate.getDay()]}
            </span>
            <span
              className={`day-label__day-number ${
                isToday ? 'day-label__day-number_current' : ''
              }`}
            >
              {dayDate.getDate()}
            </span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
