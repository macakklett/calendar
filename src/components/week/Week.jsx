import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Day from '../day/Day';
import CurrentTime from '../currentTime/CurrentTime';
import Modal from '../modal/Modal';
import { useEvents } from '../../hook/useEvents';
import moment from 'moment';

import './week.scss';

const Week = ({ weekDates, isCurrentWeek }) => {
  const { events } = useEvents();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalWindow = () => setIsModalOpen(false);

  const handleWeek = e => {
    if (
      e.target.closest('.event') ||
      e.target.closest('.event-overlay') ||
      e.target.closest('.event-modal')
    )
      return null;

    const selectedDayFromDOM = parseInt(e.target.closest('.calendar__day').dataset.day, 10);
    const selectedDate = weekDates.find(date => moment(date).date() === selectedDayFromDOM);
    const formattedSelectedDay = moment(selectedDate).format('YYYY-MM-DD');

    const hour = parseInt(e.target.dataset.time, 10);
    const formattedTime = moment().hour(hour).minute(0).format('HH:mm');

    setSelectedDate(formattedSelectedDay);
    setSelectedTime(formattedTime);
    setIsModalOpen(true);
  };

  const getEventDays = event => {
    const eventStartDate = new Date(event.dateFrom);
    const eventEndDate = new Date(event.dateTo);
    return { eventStartDate, eventEndDate };
  };

  return (
    <>
      <Modal
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        isModalOpen={isModalOpen}
        closeModalWindow={closeModalWindow}
      />
      <div className="calendar__week" onClick={handleWeek}>
        {isCurrentWeek && <CurrentTime />}
        {weekDates.map(dayStart => {
          const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

          const dayEvents = events.filter(event => {
            const { eventStartDate, eventEndDate } = getEventDays(event);
            return eventStartDate >= dayStart && eventEndDate < dayEnd;
          });

          return (
            <Day key={dayStart.getDate()} dataDay={dayStart.getDate()} dayEvents={dayEvents} />
          );
        })}
      </div>
    </>
  );
};

Week.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  isCurrentWeek: PropTypes.bool.isRequired,
};

export default Week;
