import { useState } from "react";
import "./findPw.css";
import axios from "axios";
import Swal from "sweetalert2";
const FindPw = () => {
  const [memberId, setMemberId] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [member, setMember] = useState("");

  const memberCheck = () => {
    const member = {
      memberId,
      memberName,
      memberEmail,
    };
    axios
      .post("/member/memberCheck", member)
      .then((res) => {
        console.log(res.data);
        if (res.data == 0) {
          alert("입력하신 정보로 가입 된 회원은 존재하지 않습니다.");
        } else {
          alert("입력하신 메일주소로 \n임시비밀번호가 발급되었습니다.");
          axios
            .post("/member/sendPw", member)
            .then((res) => {
              console.log(res.data);
            })
            .catch((res) => {
              console.log(res);
            });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
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
