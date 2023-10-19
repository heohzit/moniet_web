import { Link } from "react-router-dom";
import "./default.css";

const Main = () => {
  return (
    <div className="header-link">
      <div className="header-title">
        <Link to="/">머니어터</Link>
      </div>
      안녕하세요 메인입니다 로그인하세요
      <img src="./image/IMG_0608.jpg"></img>
      <Link to="/login">
        <span className="material-icons icon">login</span>
      </Link>
      <Link to="/join">
        <span className="material-icons">person_add_alt</span>
      </Link>
    </div>
  );
};

export default Main;
