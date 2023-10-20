import { Link, useNavigate } from "react-router-dom";
import "./default.css";
import { Button2, Button5 } from "../util/Buttons";

const Main = (props) => {
  const isLogin = props.isLogin;
  const navigate = useNavigate();

  return (
    <div className="main-wrapper">
      <div className="header-wrap">
        <div className="header-title">
          <Link to="/">
            <div>
              <img src="./image/M_logo.png" alt="logo" />
            </div>
            <div>
              <span>머니어터</span>
            </div>
          </Link>
        </div>
        <div className="header-title">
          <div>
            <Link to="/login">
              <Button5 text={"로그인"} />
            </Link>
          </div>
          <div>
            <Link to="/join">
              <Button2 text={"회원가입"} />
            </Link>
          </div>
        </div>
      </div>
      <div className="main-contents">
        <div className="main-con">
          <img src="./image/bg1.png" alt="bg" />
        </div>
      </div>
    </div>
  );
};

export default Main;
