import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button3 } from "../util/Buttons";
import "./challenge.css";

//진행중인 챌린지
const loadCount = 4;
const IngChallenge = () => {
  const [challengeList, setChallengeList] = useState([]);
  const [showChallenge, setShowChallenge] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [backPage, setBackPage] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/challenge/challengeList1", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setChallengeList(res.data.challengeList);
        const allChallenge = res.data.challengeList;
        const oneChallenge = allChallenge.slice(0, loadCount);
        setShowChallenge(oneChallenge);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  //더보기 버튼
  const moreChallengeBtn = () => {
    const nextPage = currentPage + 1;
    const endIndex = nextPage * loadCount;
    const nextChallenge = challengeList.slice(0, endIndex);
    setShowChallenge(nextChallenge);
    setCurrentPage(nextPage);
    if (nextPage * loadCount >= challengeList.length) {
      setBackPage(true);
    }
  };
  const GoBackBtn = () => {
    const firstChallenge = challengeList.slice(0, loadCount);
    setShowChallenge(firstChallenge);
    setCurrentPage(1);
    setBackPage(false);
  };
  return (
    <div className="challenge-content">
      <div className="challenge-list-wrap">
        {showChallenge.map((challenge, index) => {
          return (
            <ChallengeItem key={"challenge" + index} challenge={challenge} />
          );
        })}
      </div>
      <div className="challenge-more-btn">
        {backPage ? (
          <div className="challenge-more">
            <Button3 text="돌아가기" clickEvent={GoBackBtn} />
          </div>
        ) : (
          <div className="challenge-more">
            <Button3 text="더보기" clickEvent={moreChallengeBtn} />
          </div>
        )}
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
      state: {
        challengeNo: challenge.challengeNo,
        categoryNo: challenge.categoryNo,
      },
    });
  };
  return (
    <div className="challenge-item" onClick={challengeView}>
      <div className="challenge-item-info">
        <div className="challenge-kind">
          {challenge.challengeKind === 1 ? <div>저축</div> : <div>지출</div>}
        </div>
        <div className="category-kind">
          {challenge.categoryTitle === null ? (
            <></>
          ) : (
            <div>{challenge.categoryTitle}</div>
          )}
        </div>
      </div>
      <div className="challengeTitle">
        <h2>{challenge.challengeTitle}</h2>
      </div>
      <div className="challengeDay">
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
    <div className="challenge-content-day">
      <p>
        종료일까지 <strong className="day-strong">{dday.days}</strong>일
        남았습니다.
      </p>
    </div>
  );
};
export default IngChallenge;
