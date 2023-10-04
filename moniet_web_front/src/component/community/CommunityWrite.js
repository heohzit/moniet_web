import CommunityFrm from "./CommunityFrm";
import "./community.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CommunityWrite = () => {
  const [communityTitle, setCommunityTitle] = useState("");
  const [communitySubTitle, setCommunitySubTitle] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [communityContent, setCommunityContent] = useState("");
  const [communityImg, setCommunityImg] = useState(null);

  const navigate = useNavigate();

  const write = () => {
    Swal.fire("하이");
  };

  return (
    <div>
      <CommunityFrm
        communityTitle={communityTitle}
        setCommunityTitle={setCommunityTitle}
        communitySubTitle={setCommunitySubTitle}
        setCommunitySubTitle={setCommunitySubTitle}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        communityContent={communityContent}
        setCommunityContent={setCommunityContent}
        communityImg={communityImg}
        setCommunityImg={setCommunityImg}
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};

export default CommunityWrite;
