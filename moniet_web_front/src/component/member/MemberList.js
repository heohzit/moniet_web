import axios from "axios";
import "./memberList.css";
import { useEffect, useState } from "react";

const MemberList = () => {
  const [memberList, setMemberList] = useState([]);
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    axios.get("/member/allMember").then((res) => {
      setMemberList(res.data);
      console.log(res.data);
    });
  }, []);

  const searchMemberId = () => {
    console.log(memberId);
    axios
      .get("/member/searchMemberId/" + memberId)
      .then((res) => {
        if (res.data !== "") {
          console.log(res.data);
          setMemberList(res.data);
        } else {
          alert("조회되는 회원이 없습니다.");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="memberlist-wrap">
      <div className="memberlist-title">회원 정보</div>
      <div className="id-search-input">
        <input
          type="text"
          value={memberId}
          placeholder="아이디 검색"
          onChange={(e) => setMemberId(e.target.value)}
        />
        <button onClick={searchMemberId}>
          <span className="material-icons seacrh-icon">search</span>
        </button>
      </div>
      <div className="membertable-wrap">
        <table className="membertable">
          <thead>
            <td>회원번호</td>
            <td>등급</td>
            <td>아이디</td>
            <td>이름</td>
            <td>전화번호</td>
            <td>이메일</td>
            <td>가입일자</td>
          </thead>
          <tbody>
            {memberList.map((member, index) => {
              return <MemberItem member={member} key={"member" + index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MemberItem = (props) => {
  const member = props.member;
  return (
    
    <tr className="scrollBar">
      <td>{member.memberNo}</td>
      <td>{member.memberGrade == 0 ? <span class="material-icons admin-icon">
admin_panel_settings
</span>  : "일반회원"}</td>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberPhone}</td>
      <td>{member.memberEmail}</td>
      <td>{member.memberDate}</td>
    </tr>
  );
};


export default MemberList;