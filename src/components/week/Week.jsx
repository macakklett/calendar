import React, { useState, useEffect } from 'react';
import Day from '../day/Day';
import CurrentTime from '../currentTime/CurrentTime';
import Modal from '../modal/Modal';
// import EventModalWindow from '../eventModalWindow/EventModalWindow';
import { useEvents } from '../../hook/useEvents';
import moment from 'moment';

import './week.scss';

const Week = ({ weekDates, isCurrentWeek }) => {
  const { events } = useEvents();

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalWindow = () => setIsModalOpen(false);
  const closeEventModalWindow = () => setIsOpenEventWindow(false);

  const handleWeek = (e) => {
    console.log(e.target);
    if (
      e.target.closest('.event') ||
      e.target.closest('.event-overlay') ||
      e.target.closest('.event-modal')
    )
      return null;

    if (e.target.closest('.calendar__time-slot')) {
      const selectedDayFromDOM = parseInt(
        e.target.closest('.calendar__day').dataset.day,
        10
      );
      const selectedDate = weekDates.find(
        (date) => moment(date).date() === selectedDayFromDOM
      );
      const formattedSelectedDay = moment(selectedDate).format('YYYY-MM-DD');

      const hour = parseInt(e.target.dataset.time, 10);
      const formattedTime = moment().hour(hour).minute(0).format('HH:mm');

      setSelectedDate(formattedSelectedDay);
      setSelectedTime(formattedTime);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Modal
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        isModalOpen={isModalOpen}
        closeModalWindow={closeModalWindow}
      />
      {/* {isOpenEventWindow && (
        <EventModalWindow
          eventId={eventId}
          coordinates={coordinatesOfClickMouse}
          closeEventModalWindow={closeEventModalWindow}
        />
      )} */}
      <div className="calendar__week" onClick={handleWeek}>
        {isCurrentWeek && <CurrentTime />}
        {weekDates.map((dayStart) => {
          const dayEnd = new Date(dayStart.getTime()).setHours(
            dayStart.getHours() + 24
          );

          //getting all events from the day we will render
          const dayEvents = events.filter(
            (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
          );

          return (
            <Day
              key={dayStart.getDate()}
              dataDay={dayStart.getDate()}
              dayEvents={dayEvents}
            />
          );
        })}
      </div>
    </>
  );
};

export default Week;
