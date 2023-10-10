import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button3 } from "../util/Buttons";

//종료된 챌린지
const loadCount = 2;
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
    <div className="challenge-content">
      <div className="challenge-list-wrap1">
        {showChallenge.map((challenge, index) => {
          if (challenge.challengeKind === 1) {
            return (
              <ChallengeItem key={"challenge" + index} challenge={challenge} />
            );
          }
        })}
      </div>
      <div className="challenge-list-wrap2">
        {showChallenge.map((challenge, index) => {
          if (challenge.challengeKind === 2) {
            return (
              <ChallengeItem key={"challenge" + index} challenge={challenge} />
            );
          }
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
      </div>
    </div>
  );
};

export default EndChallenge;
