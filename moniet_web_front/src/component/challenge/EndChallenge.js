import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button3 } from "../util/Buttons";
import "./challenge.css";
//종료된 챌린지
const loadCount = 4;
const EndChallenge = () => {
  const [challengeList, setChallengeList] = useState([]);
  const [showChallenge, setShowChallenge] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [backPage, setBackPage] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/challenge/challengeList2", null, {
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

//종료된 챌린지 목록
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
        </div>
        <div className="category-kind">
          {challenge.categoryTitle === null ? (
            <></>
          ) : (
            <div>{challenge.categoryTitle}</div>
          )}
        </div>
        <div className="challengeTitle">
          <h2>{challenge.challengeTitle}</h2>
        </div>
        <div className="challenge-result">
          {ImgDiv(challenge.challengeResult)}
        </div>
      </div>
    </div>
  );
};

export default EndChallenge;
