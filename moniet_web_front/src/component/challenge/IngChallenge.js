//import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import React, { useState, useEffect } from "react";

const IngChallenge = () => {
  // 목표 금액 설정 (예: 10만원)
  const goalAmount = 100000;

  // 현재 금액 설정 (예: 5만원)
  const currentAmount = 50000;

  // 진행률 계산
  const progress = (currentAmount / goalAmount) * 100;

  return (
    <div className="challenge-content">
      <div className="challenge-detail">진행중인 머니챌린지 리스트</div>
      <div>목표 금액: {goalAmount.toLocaleString()}원</div>
      <div>현재 금액: {currentAmount.toLocaleString()}원</div>
      {/*
      <CircularProgressBar
        colorCircle="#ededed"
        colorSlice="#e54e21"
        percent={progress}
        fontColor="#e54e21"
        round={true}
        fontSize="15px"
        textPosition="1.5rem"
      >
        <div>{`진행률: ${progress.toFixed(2)}%`}</div>
      </CircularProgressBar>
        */}
    </div>
  );
};

export default IngChallenge;
