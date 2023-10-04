import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EndChallenge = () => {
  const [challengeList, setChallengeList] = useState([]);
  useEffect(() => {
    axios
      .get("/challenge/challengeList2")
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
      <div className="challenge-detail">종료된 머니챌린지 리스트</div>
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
        <div>{challenge.challengeAmount}</div>
      </div>
    </div>
  );
};

export default EndChallenge;
