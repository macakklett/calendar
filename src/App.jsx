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
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);

  useEffect(() => {
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
    setIsCurrentWeek(isTodayInWeekDates(weekDates));
  }, [weekStartDate]);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header />
      <Calendar weekDates={weekDates} isCurrentWeek={isCurrentWeek} />
      {/* {error && <div className="error-message">{error}</div>} */}
    </>
  );
};

export default App;
