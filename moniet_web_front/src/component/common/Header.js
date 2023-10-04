import { Link } from "react-router-dom";
import "./default.css";

const Header = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <header className="header-wrap">
      <div className="header-title">
        <Link to="/">머니어터</Link>
      </div>
      <HeaderLink isLogin={isLogin} setIsLogin={setIsLogin} />
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

const HeaderLink = (props)=> {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;

  const logout = ()=>{
    setIsLogin(false);
  };
  return (
    <div className="header-link">
      {isLogin? (
        <>
      <Link to="/member/mypage">
        <span className="material-icons icon">face</span>
      </Link>
      <Link to="#" onClick={logout}>
      <span className="material-icons">logout</span>
      </Link>
        </>
      ):(
      <>
      <Link to="/login">
        <span className="material-icons icon">login</span>
      </Link>
      <Link to="/join">
      <span className="material-icons">person_add_alt</span>
      </Link>
      </>
      )}
    </div>
  );
};
export default Header;
