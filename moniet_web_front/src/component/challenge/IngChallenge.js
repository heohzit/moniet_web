import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//진행중인 챌린지
const IngChallenge = () => {
  const [challengeList, setChallengeList] = useState([]);
  useEffect(() => {
    axios
      .get("/challenge/challengeList1")
      .then((res) => {
        console.log(res.data);
        setChallengeList(res.data.challengeList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div className="challenge-content">
      <div className="challenge-detail">진행중인 머니챌린지 리스트</div>
      <div className="challenge-list-wrap">
        {challengeList.map((challenge, index) => {
          return (
            <ChallengeItem key={"challenge" + index} challenge={challenge} />
          );
        })}
      </div>
    </div>
  );
};

//챌린지 목록
const ChallengeItem = (props) => {
  const challenge = props.challenge;
  const navigate = useNavigate();
  const challengeView = () => {
    navigate("/challenge/view", {
      state: { challengeNo: challenge.challengeNo },
    });
  };
  return (
    <div className="challenge-item" onClick={challengeView}>
      <div className="challenge-item-info">
        <div>{challenge.challengeTitle}</div>
        <div>{challenge.challengeAmount.toLocaleString()}원</div>
        <Dayday challenge={challenge}></Dayday>
      </div>
    </div>
  );
};

//챌린지 남은 날짜
const Dayday = (props) => {
  const challengeEnd = props.challenge.challengeEnd;
  const [targetDate, setTargetDate] = useState(new Date(challengeEnd));
  const calculateDday = () => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;
    // D-day 계산
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24) + 1);
    return { days };
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
      <p>{dday.days}일 남았다</p>
    </div>
  );
};

export default IngChallenge;
