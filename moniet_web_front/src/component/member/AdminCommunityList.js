import { useEffect, useState } from "react";
import "./adminCommunityList.css";
import axios from "axios";
const AdminCommunityList = (props) => {
  const isLogin = props.isLogin;
  const [communityList, setCommunityList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
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
  },[]);
  return (
    <div className="admin-community-list-wrap">
      <div className="admin-community-list-title">커뮤니티 목록</div>
      <div className="admin-comunity-list-content">
        <table className="admin-community-list-table">
          <thead>
            <th>글번호</th>
            <th>글제목</th>
            <th>썸네일</th>
            <th>작성자</th>
            <th>참여인원수</th>
            <th>작성일</th>
            <th>삭제</th>
          </thead>
          <tbody>
            {communityList.map((community,index)=>{
              return <CommunityItem community={community} key={"commmunity"+index}/>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CommunityItem = (props)=>{
  const community = props.community;
  return(
    <tr>
    <td>{community.communityNo}</td>
    <td>{community.communityTitle}</td>
    <td>{community.communityThumb === null ? "N" : "Y"}</td>
    <td>{community.memberId}</td>
    <td>{community.communityParti}</td>
    <td>{community.communityDate}</td>
    <td><input type="checkbox"></input></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
  )
}
export default AdminCommunityList;
