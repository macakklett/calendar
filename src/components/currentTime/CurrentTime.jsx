import React, { useState, useEffect } from 'react';
import {
  getUkrainianDayNumberOfWeek,
  getMinutesPassedTodayPx,
} from '../../utils/dateUtils';

import './currentTime.scss';

const AROUND_ONE_MINUTE = 60100;

const CurrentTime = () => {
  const [topPx, setTopPx] = useState(getMinutesPassedTodayPx());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTopPx((prevValue) => prevValue + 1);
    }, AROUND_ONE_MINUTE);

    return () => clearInterval(intervalId);
  }, []);

  const dayNumber = getUkrainianDayNumberOfWeek();

  const style = {
    top: `calc(${topPx}px - 5px)`,
    left: `calc((100% / 7) * ${dayNumber - 1} - 5px)`,
  };

  return (
    <div style={style} className="line-container">
      <div className="line-container_circle"></div>
      <div className="line-container_line"></div>
    </div>
  );
};

export default CurrentTime;
