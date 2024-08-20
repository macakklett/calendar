import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import moment from 'moment';

import './header.scss';

const Header = ({ weekDates, changeWeek, setCurrentWeek }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateEvent = () => setIsModalOpen(true);

  const closeModalWindow = () => setIsModalOpen(false);

  const firstMonthName = moment(weekDates[0]).format('MMMM');
  const lastMonthName = moment(weekDates[weekDates.length - 1]).format('MMMM');

  return (
    <>
      {isModalOpen && <Modal isModalOpen={isModalOpen} closeModalWindow={closeModalWindow} />}
      <header className="header">
        <button className="button create-event-btn" onClick={handleCreateEvent}>
          <i className="fas fa-plus create-event-btn__icon"></i>Create
        </button>
        <div className="navigation">
          <button className="navigation__today-btn button" onClick={setCurrentWeek}>
            Today
          </button>
          <button className="icon-button navigation__nav-icon" onClick={() => changeWeek(-1)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="icon-button navigation__nav-icon" onClick={() => changeWeek(1)}>
            <i className="fas fa-chevron-right"></i>
          </button>
          <div className="navigation__displayed-month">
            <span className="navigation__displayed-month_name">{firstMonthName}</span>
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

Header.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  changeWeek: PropTypes.func.isRequired,
  setCurrentWeek: PropTypes.func.isRequired,
};

export default Header;
