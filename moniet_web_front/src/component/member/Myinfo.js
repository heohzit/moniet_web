import "./myinfo.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../util/InputFrm";
import axios from "axios";

const Myinfo = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});
  const [memberPw, setMemberPw] = useState();
  const [newMemberPwRe, setNewMemberPwRe] = useState();
  const [checkPwMsg, setCheckPwMsg] = useState("");
  const [checkPwReMsg, setCheckPwReMsg] = useState("");
  const [checkPhoneMsg, setCheckPhoneMsg] = useState("");
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const [thumbnail, setThumbnail] = useState(""); //보내주는 데이터
  const [memberImg, setMemberImg] = useState(""); //썸네일
  const navigate = useNavigate();

  //비밀번호 유효성 검사
  const pwCheck = () => {
    const pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!pwReg.test(memberPw)) {
      setCheckPwMsg("영문/숫자/특수문자를 조합하여 8~16자를 입력해주세요.");
    } else {
      setCheckPwMsg("");
    }
  };

  const pwReCheck = () => {
    if (memberPw !== newMemberPwRe) {
      setCheckPwReMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPwReMsg("");
    }
  };

  //프로필 change
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

  //비밀번호 변경
  const pwUpdate = () => {
    const pwInput = document.querySelector(".mypage-pw-input-form");
    pwInput.classList.remove("display");

    const pwReInput = document.querySelector(".mypage-pwRe-input-form");
    pwReInput.classList.remove("display");

    const currPw = document.querySelector(".mypage-input-pw-form");
    currPw.classList.add("display");
  };

  //비밀번호 변경 취소
  const backPw = () => {
    const pwInput = document.querySelector(".mypage-pw-input-form");
    pwInput.classList.add("display");

    const pwReInput = document.querySelector(".mypage-pwRe-input-form");
    pwReInput.classList.add("display");

    const currPw = document.querySelector(".mypage-input-pw-form");
    currPw.classList.remove("display");
  };

  //비밀번호 update
  const newPwUpdate = () => {
    const token = window.localStorage.getItem("token");
    if (checkPwMsg == "" && checkPwReMsg == "" && memberPw == newMemberPwRe) {
      axios
        .post(
          "/member/updatePw",
          { memberPw },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          if (res.data == 1) {
            alert("비밀번호가 변경되었습니다.");
          } else {
            alert("비밀번호 변경 중 오류가 발생했습니다.");
          }
        })
        .catch((res) => {
          if (res.response.status === 403) {
            window.localStorage.removeItem("token");
            setIsLogin(false);
          }
        });
    } else {
      alert("입력양식이 올바르지 않습니다.");
    }
  };

  //회원정보 update
  const setMemberPhone = (data) => {
    member.memberPhone = data;
    setMember({ ...member });
  };
  const setMemberEmail = (data) => {
    member.memberEmail = data;
    setMember({ ...member });
  };
  useEffect(() => {
    axios
      .post("/member/getMember", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMember(res.data);
        setMemberImg(res.data.imgFile);
      })
      .catch((res) => {
        //로그인이 풀린상태
        if (res.response.status === 403) {
          alert("로그인 후 이용해주세요.");
          navigate("/");
        }
      });
  }, []);
  //로그아웃 상태일때
  if (!isLogin) {
    navigate("/");
  }

  //회원탈퇴
  const deleteMember = () => {
    if (window.confirm("회원 탈퇴를 진행하시겠습니까?")) {
      axios
        .post("/member/delete", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data === 1) {
            alert("회원탈퇴가 완료되었습니다.");
            //로그아웃
            window.localStorage.removeItem("token");
            setIsLogin(false);
            navigate("/");
          }
        })
        .catch((res) => {
          if (res.response.status === 403) {
            console.log("로그아웃된 상태");
            setIsLogin(false);
          }
        });
    } else {
    }
  };

  const updateMember = () => {
    const token = window.localStorage.getItem("token");
    if (checkPhoneMsg === "" && checkEmailMsg === "") {
      const form = new FormData();
      form.append("memberId", member.memberId);
      form.append("memberEmail", member.memberEmail);
      form.append("memberPhone", member.memberPhone);
      form.append("member", member);
      form.append("thumbnail", thumbnail);
      console.log(member);
      console.log(thumbnail);
      axios
        .post("/member/updateMember", form, {
          headers: {
            Authorization: "Bearer " + token,
            contentType: "multipart/form-data",
            processdData: false,
          },
        })
        .then((res) => {
          alert("회원정보 수정이 완료되었습니다.");
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      alert("입력양식을 확인해주세요.");
    }
  };

  //정규표현식
  const phoneCheck = () => {
    const phoneReg = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneReg.test(member.memberPhone)) {
      setCheckPhoneMsg("'-'을 포함하여 올바른 형식으로 입력해주세요.");
    } else {
      setCheckPhoneMsg("");
    }
  };
  const emailCheck = () => {
    const emailReg = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-za-z0-9\\-]+/;
    if (!emailReg.test(member.memberEmail)) {
      setCheckEmailMsg("'@'를 포함하여 올바른 형식으로 입력해주세요.");
    } else {
      setCheckEmailMsg("");
    }
  };

  return (
    <>
      <div className="my-title">MY PAGE</div>
      <div className="my-content">
        <div className="my-profile-img-wrap">
          {memberImg === null ? (
            <img src="/image/piggy.jpg" />
          ) : (
            <img src={memberImg} />
          )}
        </div>
        <div className="my-info-profile-wrap">
          <label
            htmlFor="my-info-profile-img"
            className="my-info-profile-label"
          >
            프로필 이미지변경
          </label>
          <input
            className="my-info-profile-img-input"
            id="my-info-profile-img"
            type="file"
            accept="image/*"
            onChange={thumbnailChange}
          />
        </div>
        <div className="mypage-input-form">
          <label htmlFor="memberId">아이디</label>
          <UpdateInputWrap
            data={member.memberId}
            type="text"
            content="memberId"
            disabled="true"
          />
        </div>
        <div className="mypage-input-form">
          <label htmlFor="memberName">이름</label>
          <UpdateInputWrap
            data={member.memberName}
            type="text"
            content="memberName"
            disabled="true"
          />
        </div>
        <div className="mypage-input-pw-form">
          <label htmlFor="memberPw">비밀번호</label>
          <div className="pw-wrap">
            <UpdateInputWrap
              data="********"
              type="password"
              content="memberPw"
              disabled="true"
            />
            <button className="pw-btn" onClick={pwUpdate}>
              변경하기
            </button>
          </div>
        </div>
        <div className="mypage-pw-input-form display">
          <label htmlFor="newMeberPw">새 비밀번호</label>
          <Input
            type="password"
            data={memberPw}
            setData={setMemberPw}
            content="newMemberPw"
            checkMsg={checkPwMsg}
            blurEvent={pwCheck}
          />
          <div className="pw-check-msg">{checkPwMsg}</div>
        </div>
        <div className="mypage-pwRe-input-form display">
          <label htmlFor="newMeberPw">새 비밀번호 확인</label>
          <Input
            type="password"
            data={newMemberPwRe}
            setData={setNewMemberPwRe}
            content="newMemberPwRe"
            checkMsg={checkPwMsg}
            blurEvent={pwReCheck}
          />
          <button className="new-pw-update-btn" onClick={newPwUpdate}>
            변경
          </button>
          <button className="new-pw-del-btn" onClick={backPw}>
            취소
          </button>
        </div>
        <div className="pwRe-check-msg">{checkPwReMsg}</div>
        <div>
          <div className="mypage-input-form">
            <label htmlFor="memberPhone">전화번호 *</label>
            <UpdateInputWrap
              data={member.memberPhone}
              setData={setMemberPhone}
              type="text"
              content="memberPhone"
              checkMsg={checkPhoneMsg}
              blurEvent={phoneCheck}
            />
          </div>
          <div className="mypage-input-form">
            <label htmlFor="memberEmail">이메일 *</label>
            <UpdateInputWrap
              data={member.memberEmail}
              setData={setMemberEmail}
              type="text"
              content="memberEmail"
              checkMsg={checkEmailMsg}
              blurEvent={emailCheck}
            />
          </div>
          <div className="my-info-btn-wrap">
            <button onClick={updateMember}>정보수정</button>
            <button onClick={deleteMember} id="deleteBtn">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const UpdateInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;
  const disabled = props.disabled;

  return (
    <div className="update-input-wrap">
      <div>
        <div className="update-input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
            disabled={disabled}
          />
        </div>
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};

export default Myinfo;
