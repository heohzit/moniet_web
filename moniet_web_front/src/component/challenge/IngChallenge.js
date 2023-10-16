import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button3 } from "../util/Buttons";

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
        console.log(res.data);
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
    <div className="challenge-content-wrap">
      <div className="challenge-content">
        <ChallengeLevel />
        <div className="challenge-list-wrap1">
          {showChallenge.map((challenge, index) => {
            return (
              <ChallengeItem key={"challenge" + index} challenge={challenge} />
            );
          })}
        </div>
      </div>
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
        challengeKind: challenge.challengeKind,
      },
    });
  };
  //챌린지 성공/실패 이미지
  const ImgDiv = (num) => {
    switch (num) {
      case 0:
        return "";
      case 1:
        return <img src="../image/success.PNG"></img>;
      case 2:
        return <img src="../image/fail.jpg"></img>;
    }
  };
  return (
    <div className="challenge-item" onClick={challengeView}>
      <div className="challenge-item-info">
        <div className="challenge-kind">
          {challenge.challengeKind === 1 ? <div>저축</div> : <div>지출</div>}
          {challenge.categoryTitle}
        </div>
        <div>{challenge.challengeTitle}</div>
        <Dayday challenge={challenge}></Dayday>
        <div className="challenge-result">
          {ImgDiv(challenge.challengeResult)}
        </div>
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
      <p>종료일까지 {dday.days}일 남았습니다.</p>
    </div>
  );
};
//챌린지 레벨 조회
const ChallengeLevel = () => {
  const token = window.localStorage.getItem("token");
  const [challengeLevel, setChallengeLevel] = useState("");
  useEffect(() => {
    axios
      .post("/challenge/challengeLevel", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setChallengeLevel(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);
  return (
    <div>
      <p>나의 챌린지 레벨은 {challengeLevel}입니다.</p>
    </div>
  );
};
export default IngChallenge;
