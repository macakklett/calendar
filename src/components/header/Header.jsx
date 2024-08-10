import React, { useState } from 'react';
import Modal from '../modal/Modal';
import moment from 'moment';

import './header.scss';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateEvent = () => setIsModalOpen(true);

  const closeModalWindow = () => setIsModalOpen(false);

  const formattedSelectedDay = moment(new Date()).format('YYYY-MM-DD');
  const hour = new Date().getHours() + 1;
  const formattedTime = moment().hour(hour).minute(0).format('HH:mm');

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
          <button className="navigation__today-btn button">Today</button>
          <button className="icon-button navigation__nav-icon">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="icon-button navigation__nav-icon">
            <i className="fas fa-chevron-right"></i>
          </button>
          <span className="navigation__displayed-month"></span>
        </div>
      </header>
    </>
  );
};

export default Header;
