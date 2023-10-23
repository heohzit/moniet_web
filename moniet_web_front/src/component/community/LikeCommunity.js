import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import "./community.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const LikeCommunity = (props) => {
  const isLogin = props.isLogin;

  const [communityList, setCommunityList] = useState([]);
  const [renderingList, setRenderingList] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .get("/community/likeCommunityList", {
        headers: {
          contentType: "multipart/form-data",
          processdData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCommunityList(res.data);
      })
      .catch(
        (res) => {
          console.log(res.response.status);
        },
        [renderingList]
      );
  }, [renderingList]);

  return (
    <>
      <div className="like-community-list-wrap">
        <div className="like-community-list-title">
          좋아요 한 커뮤니티 리스트
        </div>
        <div className="like-community-list-tbl">
          <table>
            <thead>
              <tr>
                <td width={"10%"}>글번호</td>
                <td width={"45%"} className="title-td">
                  제목
                </td>
                <td width={"10%"}>작성자</td>
                <td width={"20%"}>작성일</td>
                <td width={"5%"}>참여인원</td>
                <td width={"20%"}>좋아요</td>
              </tr>
            </thead>

            <tbody>
              {communityList.map((community, index) => {
                return (
                  <LikeCommunityItem
                    key={"community" + index}
                    community={community}
                    isLogin={isLogin}
                    renderingList={renderingList}
                    setRenderingList={setRenderingList}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const LikeCommunityItem = (props) => {
  const navigate = useNavigate();

  const community = props.community;

  const isLogin = props.isLogin;

  const renderingList = props.renderingList;
  const setRenderingList = props.setRenderingList;

  const communityView = () => {
    navigate("/community/view", {
      state: { communityNo: community.communityNo },
    });
  };

  const communityRemoveLike = (e) => {
    Swal.fire({
      icon: "warning",
      text: "좋아요를 취소하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    })
      .then((res) => {
        if (res.isConfirmed) {
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
              navigate("/community/likeCommunity");
              setRenderingList(!renderingList);
            })
            .catch((res) => {
              console.log(res.response.status);
            });
        } else {
          return;
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    e.stopPropagation();
  };

  return (
    <tr onClick={communityView}>
      <td>{community.communityNo}</td>
      <td className="title-td">
        <div>{community.communityTitle}</div>
      </td>
      <td>{community.memberId}</td>
      <td>{community.communityDate}</td>
      <td>{community.communityParti}</td>
      <td>
        <span className="material-icons ab-btn2" onClick={communityRemoveLike}>
          favorite
        </span>
      </td>
    </tr>
  );
};

export default LikeCommunity;
