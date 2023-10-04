import { Link } from "react-router-dom";
import "./challenge.css";

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
export default ChallengeMenu;
