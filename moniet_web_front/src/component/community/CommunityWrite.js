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
  const [communityType, setCommunityType] = useState([]);

  const [typeList, setTypeList] = useState([
    { name: "types", text: "저축하기 🐷", value: 1 },
    { name: "types", text: "지출줄이기 💰", value: 2 },
    { name: "types", text: "투자하기 📈", value: 4 },
    { name: "types", text: "기타 💸", value: 8 },
  ]);

  const navigate = useNavigate();

  return (
    <div>
      <CommunityFrm
        communityTitle={communityTitle}
        setCommunityTitle={setCommunityTitle}
        communitySubTitle={communitySubTitle}
        setCommunitySubTitle={setCommunitySubTitle}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        communityContent={communityContent}
        setCommunityContent={setCommunityContent}
        communityImg={communityImg}
        setCommunityImg={setCommunityImg}
        communityType={communityType}
        setCommunityType={setCommunityType}
        typeList={typeList}
        setTypeList={setTypeList}
        type="write"
      />
    </div>
  );
};

export default CommunityWrite;
