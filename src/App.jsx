import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';
import {
  getWeekStartDate,
  generateWeekRange,
  isTodayInWeekDates,
} from '../src/utils/dateUtils';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(null);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);

  useEffect(() => {
    setWeekStartDate(getWeekStartDate(new Date()));
  }, []);

  useEffect(() => {
    const weekDates = generateWeekRange(weekStartDate);
    setIsCurrentWeek(isTodayInWeekDates(weekDates));
  }, [weekStartDate]);

  const changeWeek = (direction) => {
    setWeekStartDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + direction * 7);
      return getWeekStartDate(newDate);
    });
  };

  const setCurrentWeek = () => setWeekStartDate(getWeekStartDate(new Date()));

  const weekDates = generateWeekRange(weekStartDate);
  console.log(weekStartDate);

  return (
    <>
      <Header
        weekDates={weekDates}
        changeWeek={changeWeek}
        setCurrentWeek={setCurrentWeek}
      />
      <Calendar weekDates={weekDates} isCurrentWeek={isCurrentWeek} />
      {/* {error && <div className="error-message">{error}</div>} */}
    </>
  );
};

export default App;
// https://calendar-like-google-calendar.netlify.app
