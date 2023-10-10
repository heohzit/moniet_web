import "./community.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import axios from "axios";

const CommunityView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const communityNo = location.state.communityNo;
  const [community, setCommunity] = useState({});
  const [member, setMember] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/community/view/" + communityNo)
      .then((res) => {
        console.log(res.data);
        setCommunity(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          // setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);

  return (
    <div className="community-view-wrap">
      <div className="community-view-thumbnail">
        {community.communityThumb ? (
          <img src={"/community/" + community.communityThumb} />
        ) : (
          <img src="/image/default.png" />
        )}
      </div>
      <div className="community-view-info">
        <div className="community-view-title">{community.communityTitle}</div>
        <div className="community-view-subtitle">
          {community.communitySubTitle}
        </div>
        <div className="community-view-type">
          {community.typeList
            ? community.typeList.map((type, index) => {
                return <TypeItem key={"type" + index} type={type} />;
              })
            : ""}
        </div>
        <div className="community-view-writer">
          작성자 ｜ {community.memberId}
        </div>
        <div className="community-view-date">
          작성일 ｜ {community.communityDate}
        </div>

        <div className="community-view-parti">
          참여인원 {community.communityParti}
        </div>

        <div className="community-view-btns">
          <div className="community-view-join-btn">
            <Button1 text="참여하기" />
          </div>
          <div className="community-view-like-btn">
            <span class="material-icons ab-btn1">favorite_border</span>
          </div>
          <div className="community-view-share-btn">
            <span class="material-icons sh-btn1">share</span>
          </div>
        </div>
      </div>
      <div className="community-view-content-top">INFO</div>
      <div
        className="community-view-content ql-editor"
        dangerouslySetInnerHTML={{ __html: community.communityContent }}
      ></div>

      <div className="community-view-bottom-btns">
        <div className="community-view-update">
          <span className="community-view-update-btn">수정</span>
        </div>

        <div className="community-view-delete">
          <span className="community-view-delete-btn">삭제</span>
        </div>
      </div>

      <div className="community-view-board-zone">
        <div className="community-view-board">게시글</div>
      </div>
    </div>
  );
};

const TypeItem = (props) => {
  const type = props.type;

  return (
    <div className="community-type">
      <div className="type-name">
        {type.communityTypeDiv === 1 ? (
          <span className="keyword key1">저축하기</span>
        ) : type.communityTypeDiv === 2 ? (
          <span className="keyword key2">지출줄이기</span>
        ) : type.communityTypeDiv === 4 ? (
          <span className="keyword key4">투자하기</span>
        ) : (
          <span className="keyword key8">기타</span>
        )}
      </div>
    </div>
  );
};

export default CommunityView;
