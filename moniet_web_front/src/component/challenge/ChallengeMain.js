import "./challenge.css";
import { Route, Routes } from "react-router-dom";
import ChallengeWrite from "./ChallengeWrite";
import ChallengeView from "./ChallengeView";
import ChallengeList from "./ChallengeList";
import IngChallenge from "./IngChallenge";
import EndChallenge from "./EndChallenge";

const ChallengeMain = (props) => {
  const isLogin = props.isLogin;
  return (
    <div className="challenge-main-wrap">
      <div className="challenge-title">MONEY CHALLENGE</div>
      <div className="challengeMenu-detail"></div>
      <Routes>
        <Route path="view" element={<ChallengeView></ChallengeView>}></Route>
        <Route path="write" element={<ChallengeWrite></ChallengeWrite>}></Route>
        <Route path="*" element={<ChallengeList></ChallengeList>}></Route>
      </Routes>
    </div>
  );
};
export default ChallengeMain;
