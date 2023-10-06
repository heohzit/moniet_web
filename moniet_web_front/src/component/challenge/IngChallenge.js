import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button3 } from "../util/Buttons";

//진행중인 챌린지
const loadCount = 3;
const IngChallenge = () => {
  const [challengeList, setChallengeList] = useState([]);

  const [showChallenges, setShowChallenges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showGoBack, setShowGoBack] = useState(false);

  useEffect(() => {
    axios
      .get("/challenge/challengeList1")
      .then((res) => {
        console.log(res.data);
        setChallengeList(res.data.challengeList);

        const allChallenge = res.data.challengeList;
        const oneChallenge = allChallenge.slice(0, loadCount);
        setShowChallenges(oneChallenge);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const endIndex = nextPage * loadCount;
    const nextChallenges = challengeList.slice(0, endIndex);
    setShowChallenges(nextChallenges);
    setCurrentPage(nextPage);
    if (nextPage * loadCount >= challengeList.length) {
      setShowGoBack(true);
    }
  };
  const handleGoBack = () => {
    const initialChallenges = challengeList.slice(0, loadCount);
    setShowChallenges(initialChallenges);
    setCurrentPage(1);
    setShowGoBack(false);
  };

  return (
    <div className="challenge-content">
      <div className="challenge-detail">진행중인 머니챌린지 리스트</div>
      <div className="challenge-list-wrap1">
        {showChallenges.map((challenge, index) => {
          if (challenge.challengeKind === 1) {
            return (
              <ChallengeItem key={"challenge" + index} challenge={challenge} />
            );
          }
        })}
      </div>
      <div className="challenge-list-wrap2">
        {showChallenges.map((challenge, index) => {
          if (challenge.challengeKind === 2) {
            return (
              <ChallengeItem key={"challenge" + index} challenge={challenge} />
            );
          }
        })}
      </div>
      {showGoBack ? (
        <div className="challenge-more">
          <Button3 text="돌아가기" clickEvent={handleGoBack} />
        </div>
      ) : (
        <div className="challenge-more">
          <Button3 text="더보기" clickEvent={handleLoadMore} />
        </div>
      )}
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
        <div className="challenge-kind">
          {challenge.challengeKind === 1 ? <div>저축</div> : <div>지출</div>}
        </div>
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
