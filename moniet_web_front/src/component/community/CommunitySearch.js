import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import "./community.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../util/InputFrm";
import Select from "../util/Select";
import Swal from "sweetalert2";

const CommunitySearch = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  //   const communityTitle = location.state.communityTitle;
  //   const setCommunityTitle = location.state.setCommunityTitle;
  const searchType = location.state.searchType;
  const searchValue = location.state.searchValue;

  const [searchCommunityList, setSearchCommunityList] = useState([]);
  const [communityTitle, setCommunityTitle] = useState("");
  const [searchRendering, setSearchRendering] = useState(false);

  console.log(searchType);
  console.log(searchValue);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    axios
      .get("/community/searchCoummunity/" + searchType + "/" + searchValue, {
        headers: {
          contentType: "multipart/form-data",
          processdData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // setSearchRendering(!searchRendering);
        console.log(res.data);
        if (res.data.length === 0) {
          Swal.fire("검색 실패", "게시물이 존재하지 않습니다.", "info");
        } else {
        }
        setSearchCommunityList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [searchRendering]);

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
    setSearchRendering(!searchRendering);
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      searchCommunity();
    }
  };

  return (
    <>
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

      <div className="community-list-wrap">
        {searchCommunityList.map((search, index) => {
          return (
            <SearchCommunityItem
              key={"search" + search}
              search={search}
              index={index}
              searchCommunityList={searchCommunityList}
              setSearchCommunityList={setSearchCommunityList}
            />
          );
        })}
      </div>
    </>
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

const SearchCommunityItem = (props) => {
  const navigate = useNavigate();
  const search = props.search;

  const [searchCommunityList, setSearchCommunityList] = useState(
    props.searchCommunity
  );

  //     <SearchCommunityItem
  //     key={"search" + search}
  //     search={search}
  //     index={index}
  //     searchCommunityList={searchCommunityList}
  //     setSearchCommunityList={setSearchCommunityList}
  //   />

  const communityView = () => {
    navigate("/community/view", {
      state: { communityNo: search.communityNo },
    });
  };

  return (
    <div className="community-item-wrap">
      <div className="community-item" onClick={communityView}>
        <div className="community-item-img">
          {search.communityThumb === null ? (
            <img src="/image/piggy.jpg" className="difault-img" />
          ) : (
            <img src={"/community/" + search.communityThumb} />
          )}
        </div>
        <div className="community-item-info">
          <div className="community-item-title">{search.communityTitle}</div>
          <div className="community-item-subtitle">
            {search.communitySubTitle}
          </div>
          <div className="community-item-types">
            {search.typeList
              ? search.typeList.map((types, index) => {
                  return <TypesItem key={"types" + index} types={types} />;
                })
              : ""}
          </div>
          <div className="community-item-writer">
            <span>작성자 </span>
            {search.memberId}
          </div>
          <div className="community-item-writer">
            <span>작성일 </span>
            {search.communityDate}
          </div>
          <div className="community-item-writer">
            <span>참여인원 </span>
            {search.communityParti}
          </div>
        </div>
        <div className="move-view">
          <span class="material-icons">keyboard_arrow_right</span>
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

export default CommunitySearch;
