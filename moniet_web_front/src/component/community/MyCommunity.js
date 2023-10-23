import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import "./community.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MyCommunity = (props) => {
  const isLogin = props.isLogin;

  const [communityList, setCommunityList] = useState([]);
  const [communityPartiList, setCOmmunityPartiList] = useState([]);
  const [renderingList, setRenderingList] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .get("/community/myCommunityList", {
        headers: {
          contentType: "multipart/form-data",
          processdData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCommunityList(res.data);
      })
      .catch(
        (res) => {
          console.log(res.response.status);
        },
        [renderingList]
      );
    axios
      .get("/community/myPartiCommunityList", {
        headers: {
          contentType: "multipart/form-data",
          processdData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCOmmunityPartiList(res.data);
      });
  }, [renderingList]);

  return (
    <>
      <div className="my-community-list-wrap">
        <div className="my-community-list-title">나의 커뮤니티 리스트</div>
        <div className="my-community-list-tbl">
          <table>
            <thead>
              <tr>
                <td width={"10%"}>글번호</td>
                <td width={"45%"} className="title-td">
                  제목
                </td>
                <td width={"15%"}>작성일</td>
                <td width={"15%"}>참여인원</td>
                <td width={"5%"}>공개여부</td>
                <td width={"15%"}>삭제</td>
              </tr>
            </thead>

            <tbody>
              {communityList.map((community, index) => {
                return (
                  <CommunityItem
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

      <div className="parti-community-list-wrap">
        <div className="parti-community-list-title">
          나의 참여 커뮤니티 리스트
        </div>
        <div className="parti-community-list-tbl">
          <table>
            <thead>
              <tr>
                <td width={"10%"}>글번호</td>
                <td width={"45%"} className="title-td">
                  제목
                </td>
                <td width={"15%"}>작성자</td>
                <td width={"15%"}>작성일</td>
                <td width={"15%"}>참여인원</td>
              </tr>
            </thead>

            <tbody>
              {communityPartiList.map((pCommunity, index) => {
                return (
                  <PartiCommunityItem
                    key={"community" + index}
                    pCommunity={pCommunity}
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

const CommunityItem = (props) => {
  const navigate = useNavigate();

  const isLogin = props.isLogin;
  const community = props.community;

  const renderingList = props.renderingList;
  const setRenderingList = props.setRenderingList;

  const communityView = () => {
    navigate("/community/view", {
      state: { communityNo: community.communityNo },
    });
  };

  const deleteCommunity = (e) => {
    Swal.fire({
      icon: "warning",
      text: "커뮤니티를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    })
      .then((res) => {
        if (res.isConfirmed) {
          axios
            .get("/community/deleteCommunity/" + community.communityNo)
            .then((res) => {
              if (res.data > 0) {
                Swal.fire(
                  "삭제 완료",
                  "커뮤니티 삭제가 완료되었습니다.",
                  "success"
                );
                navigate("/community/myCommunity");
                setRenderingList(!renderingList);
              }
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
      <td>{community.communityDate}</td>
      <td>{community.communityParti}</td>
      <td>{community.communityStatus === 1 ? "공개" : "비공개"}</td>
      <td>
        <span class="material-icons deletecommunity" onClick={deleteCommunity}>
          delete
        </span>
      </td>
    </tr>
  );
};

const PartiCommunityItem = (props) => {
  const navigate = useNavigate();

  const pCommunity = props.pCommunity;

  const isLogin = props.isLogin;

  const communityView = () => {
    navigate("/community/view", {
      state: { communityNo: pCommunity.communityNo },
    });
  };

  return (
    <tr onClick={communityView}>
      <td>{pCommunity.communityNo}</td>
      <td className="title-td">
        <div>{pCommunity.communityTitle}</div>
      </td>
      <td>{pCommunity.memberId}</td>
      <td>{pCommunity.communityDate}</td>
      <td>{pCommunity.communityParti}</td>
    </tr>
  );
};

export default MyCommunity;
