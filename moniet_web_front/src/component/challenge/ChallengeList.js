import { Button3 } from "../util/Buttons";
import React from "react";
import { useNavigate } from "react-router-dom";
import IngChallenge from "./IngChallenge";
import EndChallenge from "./EndChallenge";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

const ChallengeList = () => {
  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };
  return (
    <div>
      <ChallengeMenu></ChallengeMenu>
      <div className="board-write-btn">
        <Button3 text="머니챌린지 만들기" clickEvent={write}></Button3>
      </div>
      <Routes>
        <Route path="*" element={<IngChallenge></IngChallenge>}></Route>
        <Route path="end" element={<EndChallenge></EndChallenge>}></Route>
      </Routes>
    </div>
  );
};

const ChallengeMenu = () => {
  return (
    <div className="challengeMenu-tab">
      <ul>
        <Link to="ing">
          <li>진행중인 머니챌린지</li>
        </Link>
        <Link to="end">
          <li>종료된 머니챌린지</li>
        </Link>
      </ul>
    </div>
  );
};

export default ChallengeList;
