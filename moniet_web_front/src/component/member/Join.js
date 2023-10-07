import { useState } from "react";
import Input from "./InputFrm";
import "./join.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AgreeBox from "./AgreeBox";

const Join = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const [checkNameMsg, setCheckNameMsg] = useState("");
  const [checkPhoneMsg, setCheckPhoneMsg] = useState("");
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const navigate = useNavigate();

  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{4,8}$/;
    if (!idReg.test(memberId)) {
      setCheckIdMsg("아이디는 영어 대/소문자/숫자로 4~8글자를 입력해주세요.");
    } else {
      axios
        .get("/member/checkId/", { params: { memberId: memberId } })
        .then((res) => {
          console.log(res.data);
          if (res.data == 0) {
            setCheckIdMsg("");
          } else {
            setCheckIdMsg("이미 사용중인 아이디 입니다.");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  const pwCheck = () => {
    if (memberPw !== memberPwRe) {
      setCheckPwMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPwMsg("");
    }
  };
  const nameCheck = () => {
    const nameReg = /^[가-힣]{2,4}$/;
    if (!nameReg.test(memberName)) {
      setCheckNameMsg("이름은 한글로 2~4글자를 입력해주세요.");
    } else {
      setCheckNameMsg("");
    }
  };
  const phoneCheck = () => {
    const phoneReg = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneReg.test(memberPhone)) {
      setCheckPhoneMsg("'-'을 포함하여 올바른 형식으로 입력해주세요.");
    } else {
      setCheckPhoneMsg("");
    }
  };
  const emailCheck = () => {
    const emailReg = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-za-z0-9\\-]+/;
    if (!emailReg.test(memberEmail)) {
      setCheckEmailMsg("'@'를 포함하여 올바른 형식으로 입력해주세요.");
    } else {
      setCheckEmailMsg("");
    }
  };
  //회원가입
  const join = () => {
    if (
      checkIdMsg === "" &&
      checkPwMsg === "" &&
      checkNameMsg === "" &&
      checkPhoneMsg === "" &&
      checkEmailMsg === ""
    ) {
      const member = {
        memberId,
        memberPw,
        memberName,
        memberPhone,
        memberEmail,
      };
      axios
        .post("/member/join", member)
        .then((res) => {
          if (res.data === 1) {
            Swal.fire("회원가입이 완료되었습니다!","로그인 페이지로 이동합니다.","success");
            navigate("/login");
          } else {
            Swal.fire("회원가입 실패");
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      alert("필수 정보 항목을 입력해주세요.");
    }
  };
  return (
    <div className="join-wrap">
      <div className="join-title">MEMBERSHIP</div>
      <JoinInputWrap
        data={memberId}
        setData={setMemberId}
        type="type"
        content="memberId"
        label="아이디"
        checkMsg={checkIdMsg}
        blurEvent={idCheck}
      />
      <JoinInputWrap
        data={memberPw}
        setData={setMemberPw}
        type="password"
        content="memberPw"
        label="비밀번호"
      />
      <JoinInputWrap
        data={memberPwRe}
        setData={setMemberPwRe}
        type="password"
        content="memberPwRe"
        label="비밀번호 확인"
        checkMsg={checkPwMsg}
        blurEvent={pwCheck}
      />
      <JoinInputWrap
        data={memberName}
        setData={setMemberName}
        type="type"
        content="memberName"
        label="이름"
        checkMsg={checkNameMsg}
        blurEvent={nameCheck}
      />
      <JoinInputWrap
        data={memberPhone}
        setData={setMemberPhone}
        type="type"
        content="memberPhone"
        label="전화번호"
        checkMsg={checkPhoneMsg}
        blurEvent={phoneCheck}
      />
      <JoinInputWrap
        data={memberEmail}
        setData={setMemberEmail}
        type="type"
        content="memberEmail"
        label="이메일"
        checkMsg={checkEmailMsg}
        blurEvent={emailCheck}
      />
      <AgreeBox />
      <div className="join-button">
        <button type="button" onClick={join}>
          회원가입
        </button>
      </div>
    </div>
  );
};

const JoinInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const checkMsg = props.checkMsg;
  const blurEvent = props.blurEvent;
  return (
    <div className="join-input-wrap">
      <div>
        <label htmlFor={content}>{label}</label>
      </div>
      <div>
        <Input
          type={type}
          data={data}
          setData={setData}
          content={content}
          blurEvent={blurEvent}
        />
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};
export default Join;
