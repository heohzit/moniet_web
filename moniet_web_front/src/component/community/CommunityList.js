import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import "./community.css";

const CommuintyList = (props) => {
  const isLogin = props.isLogin;

  return (
    <div>
      <div className="community-write-btn">
        <Button1 text="글쓰기" clickEvent={""} />
      </div>
    </div>
  );
};

export default CommuintyList;
