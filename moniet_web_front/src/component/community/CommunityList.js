import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import "./community.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../util/InputFrm";

const CommuintyList = (props) => {
  const isLogin = props.isLogin;
  const [communityList, setCommunityList] = useState([]);
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    axios
      .get("/community/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setCommunityList(res.data);
        // setCommunityList(res.data.communityList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };

  return (
    <div>
      {/* {isLogin ? ( */}
      <div className="community-search-box">
        <Input />
      </div>
      <div className="community-write-btn">
        <Button1 text="글쓰기" clickEvent={write} />
      </div>
      {/* ) : ( */}
      {/* "" */}
      {/* )} */}

      <div className="community-list-wrap">
        {communityList.map((community, index) => {
          return (
            <CommunityItem key={"community" + index} community={community} />
          );
        })}
      </div>

      <div className="community-more">
        <Button2 text="더보기" clickEvent={""} />
      </div>
    </div>
  );
};

const CommunityItem = (props) => {
  const community = props.community;
  const navigate = useNavigate();
  const communityView = () => {};

  return (
    <div className="community-item-wrap">
      <div className="community-item">
        <div className="community-item-img">
          {community.communityThumb === null ? (
            <img src="/image/default.png" />
          ) : (
            <img src={"/community" + community.communityThumb} />
          )}
        </div>
        <div className="community-item-info">
          <div className="community-item-title">{community.communityTitle}</div>
          <div className="community-item-subtitle">
            {community.communitySubTitle}
          </div>
          <div className="community-item-date">{community.communityDate}</div>
          <div className="community-item-parti">{community.communityParti}</div>
        </div>
      </div>
    </div>
  );
};

export default CommuintyList;
