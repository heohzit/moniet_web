import { useState } from "react";
import Input from "./InputFrm";
import "./join.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const navigate = useNavigate();
  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{4,8}$/;
    if (!idReg.test(memberId)) {
      setCheckIdMsg("아이디는 영어 대/소문자/숫자로 4~8글자를 입력해주세요.");
    } else {
      axios
        .get("/member/checkId/", { params: { memberId: memberId } }) // /member/checkId/input value
        .then((res) => {
          setCheckIdMsg("이미 사용중인 아이디 입니다.");
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
  //회원가입
  const join = () => {
    if (checkIdMsg === "" && checkPwMsg === "") {
      const member = { memberId, memberPw, memberName, memberPhone };
      axios
        .post("/member/join/", member)
        .then((res) => {
          if (res.data === 1) {
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
      />
      <JoinInputWrap
        data={memberPhone}
        setData={setMemberPhone}
        type="type"
        content="memberPhone"
        label="전화번호"
      />
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
