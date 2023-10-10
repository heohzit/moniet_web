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
        <div>{community.memberId}</div>
        <div>{community.communityDate}</div>
        <div>참여인원 {community.communityParti}</div>
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
