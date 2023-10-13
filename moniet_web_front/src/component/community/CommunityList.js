import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import "./community.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../util/InputFrm";
import Select from "../util/Select";
import Swal from "sweetalert2";

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
        // console.log(res.data);
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

  const searchCommunity = () => {};

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
          <span class="material-icons search-btn" onClick={searchCommunity}>
            search
          </span>
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
  const communityView = () => {
    navigate("/community/view", {
      state: { communityNo: community.communityNo },
    });
  };

  return (
    <div className="community-item-wrap">
      <div className="community-item" onClick={communityView}>
        <div className="community-item-img">
          {community.communityThumb === null ? (
            <img src="/image/default.png" className="default-img" />
          ) : (
            <img src={"/community/" + community.communityThumb} />
          )}
        </div>
        <div className="community-item-info">
          <div className="community-item-title">{community.communityTitle}</div>
          <div className="community-item-subtitle">
            {community.communitySubTitle}
          </div>
          <div className="community-item-types">
            {community.typeList
              ? community.typeList.map((types, index) => {
                  return <TypesItem key={"types" + index} types={types} />;
                })
              : ""}
          </div>
          <div className="community-item-writer">
            <span>작성자 </span>
            {community.memberId}
          </div>
          <div className="community-item-date">
            <span>작성일 </span>
            {community.communityDate}
          </div>
          <div className="community-item-parti">
            <span>참여인원 </span>
            {community.communityParti}
          </div>
        </div>
        <div className="heart-btns">
          <span class="material-icons ab-btn1">favorite_border</span>
          <span class="material-icons ab-btn2">favorite</span>
        </div>
        <span class="material-icons sh-btn1">share</span>
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

const TypesItem = (props) => {
  const types = props.types;

  return (
    <div className="community-types">
      <div className="type-name">
        {types.communityTypeDiv === 1 ? (
          <span className="keyword key1">저축하기</span>
        ) : types.communityTypeDiv === 2 ? (
          <span className="keyword key2">지출줄이기</span>
        ) : types.communityTypeDiv === 4 ? (
          <span className="keyword key4">투자하기</span>
        ) : (
          <span className="keyword key8">기타</span>
        )}
      </div>
    </div>
  );
};

export default CommuintyList;
