import { useState } from "react";
import "./findPw.css";
const FindPw = () => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const memberCheck = () => {};

  return (
    <div className="find-pw-wrap">
      <div className="find-pw-title">FIND P/W</div>
      <div className="find-pw-subTitle">
        비밀번호 찾기를 위해 정보를 입력해주세요.
      </div>
      <div className="find-pw-content">
        <input
          type="text"
          value={memberId}
          placeholder="아이디"
          onChange={(e) => setMemberId(e.target.value)}
        />
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
        <button onClick={memberCheck}>확인</button>
      </div>
    </div>
  );
};

export default FindPw;
