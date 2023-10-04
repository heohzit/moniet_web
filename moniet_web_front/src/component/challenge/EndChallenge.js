import React, { useState, useEffect } from "react";

const EndChallenge = () => {
  const [targetDate, setTargetDate] = useState(new Date("2023-12-31")); // 원하는 날짜로 설정

  const calculateDday = () => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    // D-day 계산
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [dday, setDday] = useState(calculateDday());

  useEffect(() => {
    const interval = setInterval(() => {
      const ddayData = calculateDday();
      setDday(ddayData);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="challenge-content">
      <h1>디데이 카운트다운</h1>
      <p>
        {dday.days}일 {dday.hours}시간 {dday.minutes}분 {dday.seconds}초 남음
      </p>
    </div>
  );
};

export default EndChallenge;
