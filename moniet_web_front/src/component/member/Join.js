import { useState } from "react";
import Input from "./InputFrm";
import "./join.css";

const Join = () => {
    const [memberId, setMemberId] =  useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberPwRe, setMemberPwRe] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const [checkIdMsg, setCheckIdMsg] = useState("");
    const [checkPwMsg, setCheckPwMsg] = useState("");
    const idCheck = ()=>{
        const idReg = /^[a-zA-Z0-9]{4,8}$/;
        if(!idReg.test(memberId)){
            setCheckIdMsg("아이디는 영어 대/소문자/숫자로 4~8글자를 입력해주세요.")
        }else{
        
        }
    };
    const pwCheck=()=>{
            if(memberPw !== memberPwRe) {
                setCheckPwMsg("비밀번호가 일치하지 않습니다.")
            }else{
                setCheckPwMsg("");
            }
    };
    return(
        <div className="join-wrap">
            <div className="join-title">MEMBERSHIP</div>
            <JoinInputWrap 
            data={memberId} 
            setData={setMemberId} 
            type="type" 
            content="memberId" 
            label="아이디"
            checkMsg={checkIdMsg}
            blurEvent = {idCheck}
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
    return(
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
                    blurEvent={blurEvent}/>
            </div>
            <div className="check-msg">{checkMsg}</div>
        </div>
    );
};
export default Join;