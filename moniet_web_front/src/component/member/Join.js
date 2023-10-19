import "./join.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./InputFrm";
import axios from "axios";
import Swal from "sweetalert2";

const Join = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const [memberPwRe, setMemberPwRe] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [memberImg, setMemberImg] = useState(null);
  const [authCode, setAuthCode] = useState("");
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const [checkPwReMsg, setCheckPwReMsg] = useState("");
  const [checkNameMsg, setCheckNameMsg] = useState("");
  const [checkPhoneMsg, setCheckPhoneMsg] = useState("");
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const [checkAuthMsg, setCheckAuthMsg] = useState("");
  const navigate = useNavigate();

  //이메일 인증번호 체크
  const authCheck = () => {
    const authValue = document.querySelector("#authInput").value;
    console.log("클릭");
    if (authValue == authCode) {
      setCheckAuthMsg("인증이 완료되었습니다.");
    } else {
      setCheckAuthMsg("인증코드가 일치하지 않습니다.");
    }
  };

  //이메일 인증번호 발송
  const sendAuth = () => {
    const emailValue = document.querySelector("#memberEamil").value;
    const emailReg = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-za-z0-9\\-]+/;
    const authInput = document.querySelector(".auth-input-wrap");
    const member = { memberEmail };

    console.log(emailValue);
    if (!emailReg.test(emailValue)) {
      setCheckEmailMsg("'@'를 포함하여 올바른 형식으로 입력해주세요.");
    } else {
      setCheckEmailMsg("");
      alert("인증번호가 발송되었습니다.");
      axios
        .post("/member/sendAuth", member)
        .then((res) => {
          setAuthCode(res.data);
          console.log(res.data);
          authInput.style.display = "block";
        })
        .catch((res) => {
          console.log(res);
          alert("이메일 인증에 실패했습니다.");
        });
    }
  };

  //이미지 업로드
  const thumbnailChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setThumbnail(files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setMemberImg(reader.result);
      };
    } else {
      setThumbnail({});
      setMemberImg(null);
    }
  };

  //유효성 검사
  const idCheck = () => {
    const idReg = /^[a-zA-Z0-9]{4,8}$/;
    if (!idReg.test(memberId)) {
      setCheckIdMsg("영문/숫자를 조합하여 4~8글자를 입력해주세요.");
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
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!pwReg.test(memberPw)) {
      setCheckPwMsg("영문/숫자/특수문자를 조합하여 8~16자를 입력해주세요.");
    } else {
      setCheckPwMsg("");
    }
  };

  const pwReCheck = () => {
    if (memberPw !== memberPwRe) {
      setCheckPwReMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPwReMsg("");
    }
  };
  const nameCheck = () => {
    const nameReg = /^[가-힣]{2,4}$/;
    if (!nameReg.test(memberName)) {
      setCheckNameMsg("한글 2~4글자를 입력해주세요.");
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
      checkPwReMsg == "" &&
      checkNameMsg === "" &&
      checkPhoneMsg === "" &&
      checkEmailMsg == "" &&
      checkAuthMsg == "인증이 완료되었습니다."
    ) {
      const form = new FormData();
      form.append("thumbnail", thumbnail);
      form.append("memberId", memberId);
      form.append("memberPw", memberPw);
      form.append("memberName", memberName);
      form.append("memberPhone", memberPhone);
      form.append("memberEmail", memberEmail);
      axios
        .post("/member/join", form, {
          headers: {
            contentType: "multipart/form-data",
            processdData: false, //문자열 + file전송
          },
        })
        .then((res) => {
          if (res.data === 1) {
            alert("회원가입이 완료되었습니다.");
            navigate("/login");
          } else {
            Swal.fire("회원가입 실패");
          }
        })
        .catch((res) => {
          console.log(res.data);
        });
    } else {
      alert("이메일 인증 및 입력양식을 다시 한번 확인해주세요.");
    }
  };
  return (
    <div className="join-wrap">
      <div className="join-title">MEMBERSHIP</div>
      <div className="join-img-wrap">
        {memberImg ? <img src={memberImg} /> : <img src="./image/piggy.jpg" />}
      </div>
      <div className="join-profile-wrap">
        <label htmlFor="profileImg" className="signup-profileImg-label">
          프로필 이미지 업로드
        </label>
        <input
          className="sign-up-profile-img-input"
          type="file"
          accept="image/jpg,impge/png,image/jpeg"
          id="profileImg"
          onChange={thumbnailChange}
        />
      </div>
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
        checkMsg={checkPwMsg}
        blurEvent={pwCheck}
      />
      <JoinInputWrap
        data={memberPwRe}
        setData={setMemberPwRe}
        type="password"
        content="memberPwRe"
        label="비밀번호 확인"
        checkMsg={checkPwReMsg}
        blurEvent={pwReCheck}
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
        placeholder="ex) 010-0000-0000"
      />
      <div className="email-wrap">
        <JoinInputWrap
          data={memberEmail}
          setData={setMemberEmail}
          type="type"
          content="memberEamil"
          label="이메일"
          blurEvent={emailCheck}
          placeholder="ex) moneiet@iei.or.kr"
        />
        <button className="email-auth-btn" onClick={sendAuth}>
          이메일 인증
        </button>
      </div>
      <div className="check-msg">{checkEmailMsg}</div>
      <div className="auth-input-wrap">
        <input
          type="text"
          placeholder="인증번호를 입력해주세요."
          id="authInput"
        ></input>
        <button onClick={authCheck}>확인</button>
        <div className="check-msg">{checkAuthMsg}</div>
      </div>
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
  const placeholder = props.placeholder;

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
          placeholder={placeholder}
        />
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};
export default Join;
