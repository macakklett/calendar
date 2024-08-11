import React, { useState } from 'react';
import Modal from '../modal/Modal';
import moment from 'moment';

import './header.scss';

const Header = ({ weekDates, changeWeek, setCurrentWeek }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateEvent = () => setIsModalOpen(true);

  const closeModalWindow = () => setIsModalOpen(false);

  const formattedSelectedDay = moment(new Date()).format('YYYY-MM-DD');
  const hour = new Date().getHours() + 1;
  const formattedTime = moment().hour(hour).minute(0).format('HH:mm');

  const firstMonthName = moment(weekDates[0]).format('MMMM'); // Назва місяця
  const lastMonthName = moment(weekDates[weekDates.length - 1]).format('MMMM'); // format('M'); // Порядковий номер місяця

  return (
    <>
      {isModalOpen && (
        <Modal
          selectedDate={formattedSelectedDay}
          selectedTime={formattedTime}
          isModalOpen={isModalOpen}
          closeModalWindow={closeModalWindow}
        />
      )}
      <header className="header">
        <button className="button create-event-btn" onClick={handleCreateEvent}>
          <i className="fas fa-plus create-event-btn__icon"></i>Create
        </button>
        <div className="navigation">
          <button
            className="navigation__today-btn button"
            onClick={setCurrentWeek}
          >
            Today
          </button>
          <button
            className="icon-button navigation__nav-icon"
            onClick={() => changeWeek(-1)}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="icon-button navigation__nav-icon"
            onClick={() => changeWeek(1)}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <div className="navigation__displayed-month">
            <span className="navigation__displayed-month_name">
              {firstMonthName}
            </span>
            {firstMonthName !== lastMonthName && (
              <span className="navigation__displayed-month_name">
                <span className="navigation__displayed-month_separator"></span>
                {lastMonthName}
              </span>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
