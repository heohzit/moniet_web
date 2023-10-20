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
        <div className="main-bg">
          <img src="./image/bg1.png" alt="bg" />
          <div className="main-text">
            <div className="main-text-title">꼼꼼한 내 돈 관리</div>
            <div className="main-text-title text-margin">
              나랑 같이{" "}
              <span>
                <u>머니어트</u>
              </span>
              할래?
            </div>
            <div className="main-text-content">
              얼마를 버는가보다 어떻게 관리하는가가 중요합니다.
            </div>
            <div className="main-text-content  text-margin">
              나의 지출 내역과 자산을 한 눈에 볼 수 있는 가계부!
            </div>
            <div className="main-btn-zone">
              <div>
                <Link to="/login">
                  <Button2 text={"로그인"} />
                </Link>
              </div>
              <div>
                <Link to="/join">
                  <Button5
                    text={"회원가입 >"}
                    className={"main-btn-color-chg"}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
