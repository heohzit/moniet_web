import axios from "axios";
import "./memberMain.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button1 } from "../util/Buttons";

const MemberMain=(props)=>{
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  const token = window.localStorage.getItem("token");
  const [member,setMember] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    axios
    .post("/member/getMember", null, {
      headers : {
        Authorization:"Bearer "+token,
    },
    }).then((res)=>{
      console.log(res.data);
      setMember(res.data);
    }).catch((res)=>{
      //로그인이 풀린상태
      if(res.response.status === 403){
        alert("로그인 후 이용해주세요.");
        navigate("/");
      }
    });
  },[]);
  //로그아웃 상태일때
  if(!isLogin){
    navigate("/");
  }
  
  const deleteMember = ()=>{
    if(window.confirm("회원 탈퇴를 진행하시겠습니까?")) {
      axios.post("/member/delete",null,{
        headers : {
          Authorization: "Bearer "+token,
        },
      })
      .then((res)=>{
        if(res.data === 1) {
          alert("회원탈퇴가 완료되었습니다.");
          //로그아웃
          window.localStorage.removeItem("token")
          setIsLogin(false);
        }
      })
      .catch((res)=>{
        if(res.response.status === 403){
          console.log("로그아웃된 상태");
          setIsLogin(false);
        }
      });
    }else{

    }
  }
  
  return(
    <div>
      <div className="my-title">MY PAGE</div>
      <div className="my-content">
        <div>{member.memberNo}</div>
        <div>{member.memberId}</div>
        <div className="del-btn-wrap">
        <button onClick={deleteMember}>회원탈퇴</button>
        </div>
      </div>
    </div>
  )
}

export default MemberMain;
