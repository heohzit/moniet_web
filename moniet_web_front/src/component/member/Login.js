import { useState } from "react";
import "./login.css";
import Input from "./InputFrm";
import { Link } from "react-router-dom";


const Login = () => {
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");

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
        <Link to="#">아이디찾기</Link>
        <span> ㅣ </span>
        <Link to="#">비밀번호찾기</Link>
      </div>
      <div className="login-button-wrap">
        <button>로그인</button>
      </div>
    </div>
  );
};
export default Login;
