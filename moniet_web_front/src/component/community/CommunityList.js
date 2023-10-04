import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import "./community.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../util/InputFrm";
import Select from "../util/Select";

const CommuintyList = (props) => {
  const isLogin = props.isLogin;
  const [communityList, setCommunityList] = useState([]);
  const [reqPage, setReqPage] = useState(1);

  const [communityTitle, setCommunityTitle] = useState("");
  const [communityWriter, setCommunityWriter] = useState("");

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
      <div className="community-top-wrap">
        <div className="community-search-box">
          <Select />
          <ListInputWrap
            data={communityTitle}
            setData={setCommunityTitle}
            type="type"
            content="searchBox"
          />
          <Button1 text="검색" clickEvent={""} />
        </div>
        <div className="community-write-btn">
          <Button2 text="글쓰기" clickEvent={write} />
        </div>
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

const ListInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;

  return (
    <div className="list-input-wrap">
      <div>
        <div className="input">
          <Input data={data} setData={setData} type={type} content={content} />
        </div>
      </div>
    </div>
  );
};

export default CommuintyList;
