//import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChallengeView = (props) => {
  const location = useLocation();
  const challengeNo = location.state.challengeNo;
  const [challenge, setChallenge] = useState([]);
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/challenge/view/" + challengeNo)
      .then((res) => {
        console.log(res.data);
        setChallenge(res.data);
      })
      .catch((res) => {
        console.log(res.data);
      });
  }, []);

  // 목표 금액 설정
  const goalAmount = 100000;
  // 현재 금액 설정
  const currentAmount = 50000;
  // 진행률 계산
  const progress = (currentAmount / goalAmount) * 100;

  return (
    <div className="challenge-content">
      <div className="challenge-detail">머니챌린지 상세보기</div>
      {/*
      <div>목표 금액: {goalAmount.toLocaleString()}원</div>
      //<div>현재 금액: {currentAmount.toLocaleString()}원</div>
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
      <div className="challenge-view-title">{challenge.challengeTitle}</div>
      <div className="challenge-view-info">
        <div>{challenge.challengeStart}</div>
        <div>{challenge.challengeEnd}</div>
      </div>
    </div>
  );
};

export default ChallengeView;
