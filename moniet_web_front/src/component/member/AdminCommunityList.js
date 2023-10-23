import { useEffect, useState } from "react";
import "./adminCommunityList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
const AdminCommunityList = (props) => {
  const isLogin = props.isLogin;
  const [communityList, setCommunityList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [render, setRender] = useState(false);

  useEffect(() => {
    axios
      .get("/community/allCommunityList/" + reqPage)
      .then((res) => {
        setCommunityList(res.data.communityList); //communityList -> key값
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage, render]);
  return (
    <div className="admin-community-list-wrap">
      <div className="admin-community-list-title">커뮤니티 목록</div>
      <div className="admin-comunity-list-content">
        <div className="community-check-del-btn-wrap">
          <button
            className="chk-del-btn"
            onClick={() => {
              checkDel(render, setRender);
            }}
          >
            삭제
          </button>
        </div>
        <table className="admin-community-list-table">
          <thead>
            <th>선택</th>
            <th>글번호</th>
            <th width={"30%"}>글제목</th>
            <th>공개여부</th>
            <th>작성자</th>
            <th>참여인원수</th>
            <th>작성일</th>
            <th>삭제</th>
            <th>게시글 상세</th>
          </thead>
          <tbody>
            {communityList.map((community, index) => {
              return (
                <CommunityItem
                  community={community}
                  key={"commmunity" + index}
                  isLogin={isLogin}
                  render={render}
                  setRender={setRender}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        reqPage={reqPage}
        setReqPage={setReqPage}
        pageInfo={pageInfo}
      />
    </div>
  );
};

//게시글 선택 삭제
const checkDel = (render, setRender) => {
  //체크된 체크박스
  const check = document.querySelectorAll(".chk:checked");
  if (check.length == 0) {
    alert("삭제할 게시글을 선택해주세요.");
  } else {
    alert("게시글을 삭제하시겠습니까?");
    //체크된 게시글 번호를 저장할 배열
    const no = new Array();
    check.forEach(function (item) {
      const communityNo = item.parentElement.nextElementSibling.innerText;
      no.push(communityNo);
    });
    const community = { communityNo: no.join("/") };
    axios
      .post("/community/checkDelete", community)
      .then((res) => {
        alert("게시글이 삭제 되었습니다.");
        setRender(!render);
        //체크박스 false
        const checkbox = document.querySelectorAll(".chk");
        for (let i = 0; i < checkbox.length; i++) {
          checkbox[i].checked = false;
        }
      })
      .catch((res) => {
        console.log(res.data);
      });
  }
};

const CommunityItem = (props) => {
  const community = props.community;
  const render = props.render;
  const setRender = props.setRender;

  //게시글 개별 삭제
  const commmunityDel = (e) => {
    const communityNo =
      e.target.parentNode.parentNode.previousSibling.previousSibling
        .previousSibling.previousSibling.previousSibling.previousSibling
        .innerText;
    if (window.confirm("게시글을 삭제 하시겠습니까?")) {
      axios
        .get("/community/deleteCommunity/" + communityNo)
        .then((res) => {
          alert("게시글이 삭제 되었습니다.");
          setRender(!render);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      return false;
    }
  };
  const navigate = useNavigate();

  //상세 페이지로 이동
  const detailedPage = () => {
    navigate("/community/view", {
      state: { communityNo: community.communityNo },
    });
  };

  return (
    <tr>
      <td>
        <input type="checkbox" className="chk"></input>
      </td>
      <td>{community.communityNo}</td>
      <td>{community.communityTitle}</td>
      <td>{community.communityStatus === 1 ? "Y" : "N"}</td>
      <td>{community.memberId}</td>
      <td>{community.communityParti}</td>
      <td>{community.communityDate}</td>
      <td>
        <button className="community-del" onClick={commmunityDel}>
          <span className="material-icons deletecommunity">delete</span>
        </button>
      </td>
      <td>
        <button className="none-button" onClick={detailedPage}>
          <span className="material-icons detail-view">pageview</span>
        </button>
      </td>
    </tr>
  );
};

export default AdminCommunityList;
