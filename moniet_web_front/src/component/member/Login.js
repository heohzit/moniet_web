import { useState } from "react";
import "./login.css";
import Input from "./InputFrm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const setIsLogin = props.setIsLogin;
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const member = { memberId, memberPw };
    axios
      .post("/member/login", member)
      .then((res) => {
        console.log(res);
        if (res.data === "실패") {
          alert("아이디 또는 비밀번호를 확인하세요");
        } else {
          window.localStorage.setItem("token", res.data);
          setIsLogin(true);
          navigate("/");
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="login-wrap">
      <div className="login-title">LOGIN</div>
      <div className="input-wrap">
        <label htmlFor="memberId">아이디</label>
        <Input
          type="text"
          data={memberId}
          setData={setMemberId}
          content="memberId"
        />
      </div>
      <div className="input-wrap">
        <label htmlFor="memberPw">비밀번호</label>
        <Input
          type="password"
          data={memberPw}
          setData={setMemberPw}
          content="memberPw"
        />
      </div>
      <div className="search-wrap">
        <Link to="/findId">아이디찾기</Link>
        <span> ㅣ </span>
        <Link to="/findPw">비밀번호찾기</Link>
      </div>
      <div className="login-button-wrap">
        <button onClick={login}>로그인</button>
      </div>
    </div>
  );
};
export default Login;
