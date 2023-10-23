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
  const [communityTitle, setCommunityTitle] = useState("");
  const [communityWriter, setCommunityWriter] = useState("");
  const [renderingList, setRenderingList] = useState(false);
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    // console.log(reqPage);
    axios
      .get("/community/list/" + reqPage, {
        headers: {
          contentType: "multipart/form-data",
          processdData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(communityList);
        // console.log(communityList.length);
        // console.log(res.data);
        // console.log(res.data.length);
        //const arr = [...communityList, ...res.data];
        const arr = new Array();
        for (let i = 0; i < communityList.length; i++) {
          arr.push(communityList[i]);
        }

        for (let i = 0; i < res.data.length; i++) {
          arr.push(res.data[i]);
        }

        // setRenderingList(!renderingList);
        setCommunityList(arr);
        // setCommunityList(res.data.communityList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [renderingList, reqPage]);

  const navigate = useNavigate();
  const write = () => {
    navigate("write");
  };

  const searchCommunity = () => {
    const searchType = document.querySelector(".community-search-box > select");
    const searchValue = document.querySelector(".community-search-box input");

    if (searchValue.value == "") {
      alert("검색어를 입력해주세요.");
    } else {
      navigate("/community/searchCommunity", {
        state: {
          searchType: searchType.value,
          searchValue: searchValue.value,
        },
      });
    }
  };

  const moreList = () => {
    console.log(reqPage);
    setReqPage(reqPage + 1);
    // const startIndex = reqPage * numperPage;
    // const endIndex = startIndex + numperPage;
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      searchCommunity();
    }
  };

  return (
    <div>
      {/* {isLogin ? ( */}
      <div className="community-top-wrap">
        <div className="community-search-box" onKeyDown={onCheckEnter}>
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
          {isLogin ? <Button2 text="글쓰기" clickEvent={write} /> : ""}
        </div>
      </div>
      {/* ) : ( */}
      {/* "" */}
      {/* )} */}

      <div className="community-list-wrap">
        {communityList.map((community, index) => {
          return (
            <CommunityItem
              key={"community" + index}
              community={community}
              isLogin={isLogin}
              index={index}
              communityList={communityList}
              setCommunityList={setCommunityList}
              renderingList={renderingList}
              setRenderingList={setRenderingList}
            />
          );
        })}
      </div>

      <div className="community-more">
        <Button2 text="더보기" clickEvent={moreList} />
      </div>
    </div>
  );
};

const CommunityItem = (props) => {
  const index = props.index;
  const isLogin = props.isLogin;
  const [community, setCommunity] = useState(props.community);
  const communityList = props.communityList;
  const setCommunityList = props.setCommunityList;
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);
  console.log(community);
  const likeChange = (isLike) => {
    if (isLike) {
      community.isWish = 1;
    } else {
      community.isWish = 0;
    }
    setCommunity({ ...community });
  };
  const renderingList = props.renderingList;
  const setRenderingList = props.setRenderingList;

  const communityView = () => {
    if (isLogin) {
      navigate("/community/view", {
        state: { communityNo: community.communityNo },
      });
    } else {
      Swal.fire("이용 제한", "로그인 후 이용해주시기 바랍니다.", "info");
    }
  };

  const communityLike = (e) => {
    setHeart(!heart);
    const token = window.localStorage.getItem("token");
    axios
      .get("/community/insertCommunityLike/" + community.communityNo, {
        headers: {
          contentType: "multipart/form-data",
          processdData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        likeChange(true);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    e.stopPropagation();
  };

  const communityRemoveLike = (e) => {
    setHeart(!heart);
    const token = window.localStorage.getItem("token");
    axios
      .get("/community/removeCommunityLike/" + community.communityNo, {
        headers: {
          contentType: "multipart/form-data",
          processdData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        likeChange(false);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    e.stopPropagation();
  };

  const shareCommunity = () => {};

  return (
    <div className="community-item-wrap">
      <div className="community-item" onClick={communityView}>
        <div className="community-item-img">
          {community.communityThumb === null ? (
            <img src="/image/piggy.jpg" className="default-img" />
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
          {community.isWish === 0 ? (
            <span class="material-icons ab-btn1" onClick={communityLike}>
              favorite_border
            </span>
          ) : (
            <span class="material-icons ab-btn2" onClick={communityRemoveLike}>
              favorite
            </span>
          )}
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
          <input type="text" maxLength={35} />
          {/* <Input data={data} setData={setData} type={type} content={content} /> */}
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
