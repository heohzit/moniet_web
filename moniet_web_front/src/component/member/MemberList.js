import axios from "axios";
import "./memberList.css";
import { useEffect, useState } from "react";

const searchMemberId = () => {
  const memberId = document.querySelector("#memberId").value;
  console.log(memberId);
  axios
    .get("/member/searchMemberId", memberId)
    .then((res) => {
      console.log(res.data);
    })
    .catch((res) => {
      console.log(res);
    });
};

const MemberList = () => {
  const [memberList, setMemberList] = useState([]);
  const [memberId, setMemberId] = useState("");

  useEffect(() => {
    axios.get("/member/allMember").then((res) => {
      setMemberList(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className="memberlist-wrap">
      <div className="memberlist-title">회원정보</div>
      <div className="id-search-input">
        <input
          id="memberId"
          type="text"
          value={memberId}
          placeholder="아이디 검색"
          onChange={(e) => setMemberId(e.target.value)}
        />
        <button onClick={searchMemberId}>
          <span className="material-icons seacrh-icon">search</span>
        </button>
      </div>
      <div className="membertable">
        <table>
          <thead>
            <th>회원번호</th>
            <th>등급</th>
            <th>아이디</th>
            <th>이름</th>
            <th>전화번호</th>
            <th width="20%">이메일</th>
            <th>가입일자</th>
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
    <tr>
      <td>{member.memberNo}</td>
      <td>{member.memberGrade == 0 ? "관리자" : "일반회원"}</td>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberPhone}</td>
      <td>{member.memberEmail}</td>
      <td>{member.memberDate}</td>
    </tr>
  );
};
export default MemberList;
