import { Link } from "react-router-dom";
import "./default.css";
const Header = () => {
  return (
    <header className="header-wrap">
      <div className="header-title">
        <Link to="/">머니어터</Link>
      </div>
      <HeaderLink/>
      <NaviSide></NaviSide>
    </header>
  );
};
const NaviSide = () => {
  return (
    <div className="nav-side">
      <ul>
        <li>
          <Link to="/dashboard">대시보드</Link>
        </li>
        <li>
          <Link to="/cashbook">내역</Link>
        </li>
        <li>
          <Link to="#">달력</Link>
        </li>
        <li>
          <Link to="challenge">머니챌린지</Link>
        </li>
        <li>
          <Link to="#">커뮤니티</Link>
        </li>
      </ul>
    </div>
  );
};

const HeaderLink = ()=> {
  return (
    <div className="header-link">
      <Link to="/join">회원가입(임시)</Link>
    </div>
  )
}
export default Header;
