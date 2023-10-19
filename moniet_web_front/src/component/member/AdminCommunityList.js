import { useEffect, useState } from "react";
import "./adminCommunityList.css";
import axios from "axios";
const AdminCommunityList = (props) => {
  const isLogin = props.isLogin;
  const [communityList, setCommunityList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [communityNo, setCommunityNo] = useState("");
  useEffect(() => {
    axios
      .get("/community/allCommunityList/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setCommunityList(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <div className="admin-community-list-wrap">
      <div className="admin-community-list-title">커뮤니티 목록</div>
      <div className="admin-comunity-list-content">
        <table className="admin-community-list-table">
          <thead>
            <th>선택</th>
            <th>글번호</th>
            <th width={"30%"}>글제목</th>
            <th>썸네일</th>
            <th>작성자</th>
            <th>참여인원수</th>
            <th>작성일</th>
            <th>삭제</th>
          </thead>
          <tbody>
            {communityList.map((community, index) => {
              return (
                <CommunityItem
                  community={community}
                  key={"commmunity" + index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const commmunityDel = (e) => {
  const communityNo = e.target.parentNode.parentNode.firstChild.innerText;
  console.log(communityNo);
  if (window.confirm("게시글을 삭제하시겠습니까?") == true) {
    axios
      .get("/community/adminDelete/" + communityNo)
      .then((res) => {
        console.log(res.data);
        alert("게시글이 삭제 되었습니다.");
      })
      .catch((res) => {
        console.log(res);
      });
  } else {
    return false;
  }
};

const CommunityItem = (props) => {
  const community = props.community;
  return (
    <tr>
      <td>
        <input type="checkbox" className="chk"></input>
      </td>
      <td>{community.communityNo}</td>
      <td>{community.communityTitle}</td>
      <td>{community.communityThumb === null ? "N" : "Y"}</td>
      <td>{community.memberId}</td>
      <td>{community.communityParti}</td>
      <td>{community.communityDate}</td>
      <td>
        <button className="community-del" onClick={commmunityDel}>
          삭제
        </button>
      </td>
    </tr>
  );
};
export default AdminCommunityList;
