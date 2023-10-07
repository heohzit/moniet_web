import axios from "axios";
import "./memberMain.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../util/InputFrm";
import { Button1 } from "../util/Buttons";

const MemberMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});
  const [checkPhoneMsg, setCheckPhoneMsg] = useState("");
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const [currPw,setCurrPw]=useState("");
  const [isPwauth,setIsPwauth]=useState("");
  const navigate = useNavigate();

  //비밀번호 확인
  const pwCheck=()=>{
    axios
    .post(
      "/member/pwCheck",
      {memberPw : currPw},
      {
        headers : {
        Authorization: "Bearer " + token,
      },
    }
  )
  .then((res)=>{
    if(res.data==1){
      setIsPwauth(true);
    } else {
      alert("비밀번호가 일치 하지 않습니다.")
    }
    console.log(res.data);
  })
  .catch((res) => {
    if (res.response.status === 403) {
      window.localStorage.removeItem("token");
      setIsLogin(false);
    }
  });
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
        console.log(res.data);
        setMember(res.data);
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
      axios
        .post("/member/updateMember", member, {
          headers: {
            Authorization: "Bearer " + token,
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
    <div>
      <div className="my-title">MY PAGE</div>
      <div className="my-content">
        <div className="pw-check-zone">
          <div className="pw-check-zone-title">비밀번호 확인</div>
          <div className="pw-check-zone-content">
            회원님의 안전한 개인정보 보호를 위해 비밀번호를 다시 한번 확인 합니다.
            <div>
            <Input
              data={currPw}
              setData={setCurrPw}
              type="password"
              content="currPw"
            />
            <Button1 text="확인" clickEvent={pwCheck}></Button1>
            </div>
          </div>
        </div>
        <table className="my-info-tbl">
          <tbody>
            <tr>
              <td>아이디</td>
              <td>{member.memberId}</td>
            </tr>
            <tr>
              <td>이름</td>
              <td>{member.memberName}</td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td id="member-phone">
                <div>
                <UpdateInputWrap
                  data={member.memberPw}
                  type="password"
                  content="memberPw"
                />
                </div>
              </td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td id="member-phone">
                <div>
                <UpdateInputWrap
                  data={member.memberPhone}
                  setData={setMemberPhone}
                  type="text"
                  content="memberPhone"
                  checkMsg={checkPhoneMsg}
                  blurEvent={phoneCheck}
                />
                </div>
              </td>
            </tr>
            <tr>
              <td>이메일</td>
              <td id="member-email">
                <div>
                <UpdateInputWrap
                  data={member.memberEmail}
                  setData={setMemberEmail}
                  type="text"
                  content="memberEmail"
                  checkMsg={checkEmailMsg}
                  blurEvent={emailCheck}
                />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="my-info-btn-wrap">
          <button onClick={updateMember}>정보수정</button>
          <button onClick={deleteMember} id="deleteBtn">회원탈퇴</button>
        </div>
      </div>
    </div>
  );
};
const UpdateInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;

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
          />
        </div>
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};

export default MemberMain;
