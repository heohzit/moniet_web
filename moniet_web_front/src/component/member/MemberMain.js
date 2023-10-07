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
      navigate("/member/myinfo");
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
  return (
    <div>
      <div className="my-title">MY PAGE</div>
      <div className="my-content">
        <div className="pw-check-zone">
          <div className="pw-check-zone-title">비밀번호 확인</div>
          <div className="pw-check-zone-content">
            회원님의 안전한 개인정보 보호를 위해 비밀번호를 다시 한번 확인 합니다.
            <br></br>
            <br></br>
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
      </div>
    </div>
  );
};

export default MemberMain;
