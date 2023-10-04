import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import "./community.css";
import { useState, useEffect } from "react";
import axios from "axios";

const CommuintyList = (props) => {
  const isLogin = props.isLogin;
  const [communityList, setCommunityList] = useState([]);
  const [reqPage, setReqPage] = useState(1);

  useEffect(() => {
    axios
      .get("/community/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setCommunityList(res.data.communityList);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  return (
    <div>
      {/* {isLogin ? ( */}
      <div className="community-write-btn">
        <Button1 text="글쓰기" clickEvent={""} />
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
    </div>
  );
};

const CommunityItem = (props) => {
  return (
    <div>
      <div>네</div>
    </div>
  );
};

export default CommuintyList;
