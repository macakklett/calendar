import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';
import { getWeekStartDate, generateWeekRange, isTodayInWeekDates } from '../src/utils/dateUtils';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);

  useEffect(() => {
    const weekDates = generateWeekRange(weekStartDate);
    setIsCurrentWeek(isTodayInWeekDates(weekDates));
  }, [weekStartDate]);

  const changeWeek = direction => {
    setWeekStartDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + direction * 7);
      return getWeekStartDate(newDate);
    });
  };

  const setCurrentWeek = () => setWeekStartDate(getWeekStartDate(new Date()));

  const weekDates = generateWeekRange(weekStartDate);

  return (
    <>
      <Header weekDates={weekDates} changeWeek={changeWeek} setCurrentWeek={setCurrentWeek} />
      <Calendar weekDates={weekDates} isCurrentWeek={isCurrentWeek} />
    </>
  );
};

export default App;
