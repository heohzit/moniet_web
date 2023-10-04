import "./challenge.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import ChallengeWrite from "./ChallengeWrite";
import ChallengeMenu from "./ChallengeMenu";
import EndChallenge from "./EndChallenge";
import IngChallenge from "./IngChallenge";
import { Button3 } from "../util/Buttons";
import ChallengeView from "./ChallengeView";

const ChallengeMain = () => {
  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };
  return (
    <div className="challenge-main-wrap">
      <div className="challenge-title">MONEY CHALLENGE</div>
      <div className="challengeMenu-detail">
        <ChallengeMenu></ChallengeMenu>
        <div className="board-write-btn">
          <Button3 text="글쓰기" clickEvent={write}></Button3>
        </div>
      </div>
      <Routes>
        <Route path="view" element={<ChallengeView></ChallengeView>}></Route>
        <Route path="write" element={<ChallengeWrite></ChallengeWrite>}></Route>
        <Route path="end" element={<EndChallenge></EndChallenge>}></Route>
        <Route path="*" element={<IngChallenge></IngChallenge>}></Route>
      </Routes>
    </div>
  );
};
export default ChallengeMain;
