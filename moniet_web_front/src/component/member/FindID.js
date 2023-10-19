import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./findPw.css";
import axios from "axios";
const FindID = () => {
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [member, setMember] = useState("");
  const navigate = useNavigate();

  const loginPage = () => {
    navigate("/login");
  };

  const searchId = () => {
    const first = document.querySelector(".find-pw-wrap-first");
    const next = document.querySelector(".find-pw-wrap-next");
    const member = {
      memberName,
      memberEmail,
    };
    //console.log(member);
    axios
      .post("/member/searchId", member)
      .then((res) => {
        //받는값이 null 일때
        if (res.data === "") {
          alert("입력하신 정보로 가입 된 회원은 존재하지 않습니다.");
        } else {
          console.log(res.data);
          setMember(res.data);
          first.classList.add("display");
          next.classList.remove("display");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="find-pw-wrap">
      <div className="find-pw-wrap-first">
        <div className="find-pw-title">FIND ID</div>
        <div className="find-pw-subTitle">
          아이디 찾기를 위해 정보를 입력해주세요.
        </div>
        <div className="find-pw-content">
          <input
            type="text"
            value={memberName}
            placeholder="이름"
            onChange={(e) => setMemberName(e.target.value)}
          />
          <input
            type="text"
            value={memberEmail}
            placeholder="이메일"
            onChange={(e) => setMemberEmail(e.target.value)}
          />
        </div>
        <div className="find-pw-button-wrap">
          <button onClick={searchId}>확인</button>
        </div>
      </div>
      <div className="find-pw-wrap-next display">
        <div className="id-result-title">아이디찾기 결과</div>
        <div className="id-result-cotent">
          회원님의 아이디는 <span>{member.memberId}</span> 입니다.
        </div>
        <div className="id-find-pw">
          <div>
            비밀번호가 기억나지 않으세요? <Link to="/findPw">비밀번호찾기</Link>
          </div>
        </div>
        <div className="find-id-login-button-wrap">
          <button onClick={loginPage}>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default FindID;
