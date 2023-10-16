import axios from "axios";
import "./memberMain.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../util/InputFrm";
import "./myinfo.css";

const Myinfo = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});
  const [memberPw, setMemberPw] = useState();
  const [newMemberPwRe, setNewMemberPwRe] = useState();
  const [checkPhoneMsg, setCheckPhoneMsg] = useState("");
  const [checkEmailMsg, setCheckEmailMsg] = useState("");
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(""); //보내주는 데이터
  const [memberImg, setMemberImg] = useState(""); //썸네일

  //이미지 업로드 input onChange
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

  const pwUpdate = () => {
    const pwTr2 = document.querySelector(".pw-tr2");
    pwTr2.classList.remove("display");

    const pwTr3 = document.querySelector(".pw-tr3");
    pwTr3.classList.remove("display");

    const curr = document.querySelector(".curr-pw-zone");
    curr.classList.add("display");
  };

  const backPw = () => {
    const pwTr2 = document.querySelector(".pw-tr2");
    pwTr2.classList.add("display");

    const pwTr3 = document.querySelector(".pw-tr3");
    pwTr3.classList.add("display");

    const curr = document.querySelector(".curr-pw-zone");
    curr.classList.remove("display");
  };

  //비밀번호 update
  const newPwUpdate = () => {
    const token = window.localStorage.getItem("token");
    if (memberPw !== "" && memberPw == newMemberPwRe) {
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
      alert("비밀번호가 일치 하지 않습니다.");
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
    const form = new FormData();
    form.append(member);
    form.append(thumbnail);
    const token = window.localStorage.getItem("token");
    if (checkPhoneMsg === "" && checkEmailMsg === "") {
      axios
        .post("/member/updateMember", form, {
          headers: {
            contentType: "multipart/form-data",
            processdData: false,
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
            <tr className="curr-pw-zone">
              <td>비밀번호</td>
              <td id="member-Pw">
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
              </td>
            </tr>
            <tr className="pw-tr2 display">
              <td>새 비밀번호</td>
              <td>
                <div className="new-pw-check-wrap">
                  <Input
                    type="password"
                    data={memberPw}
                    setData={setMemberPw}
                    content="newMemberPw"
                  />
                </div>
              </td>
            </tr>
            <tr className="pw-tr3 display">
              <td>새 비밀번호 확인</td>
              <td>
                <div className="new-pw-check-wrap">
                  <Input
                    type="password"
                    data={newMemberPwRe}
                    setData={setNewMemberPwRe}
                    content="newMemberPwRe"
                  />
                  <button className="new-pw-update-btn" onClick={newPwUpdate}>
                    변경
                  </button>
                  <button className="new-pw-del-btn" onClick={backPw}>
                    취소
                  </button>
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
          <button onClick={deleteMember} id="deleteBtn">
            회원탈퇴
          </button>
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
