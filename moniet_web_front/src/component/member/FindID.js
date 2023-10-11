import { useState } from "react";
import "./findPw.css";
import axios from "axios";
const FindID = () => {
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const searchId = () => {
    const member = {
      memberName,
      memberEmail,
    };
    //console.log(member);
    axios
      .post("/member/searchId", member)
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="find-pw-wrap">
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
  );
};

export default FindID;
