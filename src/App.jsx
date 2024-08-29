import React, { useState } from 'react';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const weekDates = generateWeekRange(weekStartDate);

  const setCurrentWeek = () => setWeekStartDate(getWeekStartDate(new Date()));

  return (
    <>
      <Header weekDates={weekDates} setWeekStartDate={setWeekStartDate} setCurrentWeek={setCurrentWeek} />
      <Calendar weekDates={weekDates} />
    </>
  );
};

export default App;
