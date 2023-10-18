import { useEffect, useState } from "react";
import "./adminCommunityList.css";
import axios from "axios";
const AdminCommunityList = () => {
  const [communityList, setCommunityList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get("/community/communityList/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setCommunityList(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  });
  return (
    <div className="admin-community-list-wrap">
      <div className="admin-community-list-title">커뮤니티 목록</div>
      <div className="admin-comunity-list-content"></div>
    </div>
  );
};
export default AdminCommunityList;
