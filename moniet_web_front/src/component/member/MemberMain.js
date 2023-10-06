import axios from "axios";
import "./memberMain.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../util/InputFrm";

const MemberMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const [member, setMember] = useState({});

  const navigate = useNavigate();
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
        console.log(member);
      });
  };

  return (
    <div>
      <div className="my-title">MY PAGE</div>
      <div className="my-sub-title">회원정보수정</div>
      <div className="my-content">
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
              <td>전화번호</td>
              <Input
                type="text"
                data={member.memberPhone}
                setData={setMemberPhone}
                content="memberPhone"
              />
            </tr>
            <tr>
              <td>이메일</td>
              <Input
                type="text"
                data={member.memberEmail}
                setData={setMemberEmail}
                content="memberEmail"
              />
            </tr>
          </tbody>
        </table>
        <div className="btn-wrap">
          <button onClick={updateMember}>정보수정</button>
          <button onClick={deleteMember}>회원탈퇴</button>
        </div>
      </div>
    </div>
  );
};

export default MemberMain;
