import "./community.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import CommunityFrm from "./CommunityFrm";

const CommunityModify = () => {
  const location = useLocation();
  const community = location.state.community;
  console.log(community);

  const [communityTitle, setCommunityTitle] = useState(
    community.communityTitle
  );
  const [communitySubTitle, setCommunitySubTitle] = useState(
    community.communitySubTitle
  );
  const [communityThumb, setCommunityThumb] = useState(
    community.communityThumb
  );
  const [communityImg, setCommunityImg] = useState(community.communityThumb);
  const [communityContent, setCommunityContent] = useState(
    community.communityContent
  );
  const [communityType, setCommunityType] = useState([]);

  const [typeList, setTypeList] = useState([
    { name: "types", text: "저축하기 🐷", value: 1 },
    { name: "types", text: "지출줄이기 💰", value: 2 },
    { name: "types", text: "투자하기 📈", value: 4 },
    { name: "types", text: "기타 💸", value: 8 },
  ]);

  const [typeList1, setTypeList1] = useState(community.typeList);

  const [thumbnail, setThumbnail] = useState({});
  // const [typeList, setTypeList] = useState(community.typeList);
  const [delTypeNo, setDelTypeNo] = useState([]);

  const navigate = useNavigate();

  const modify = () => {
    if (
      communityTitle !== "" &&
      communitySubTitle !== "" &&
      communityContent !== "" &&
      communityType.length !== 0
    ) {
      Swal.fire({
        icon: "question",
        text: "커뮤니티를 수정하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed) {
          const checkbox = document.querySelectorAll("[name=types]:checked");

          console.log("수정할 제목 : " + communityTitle);
          console.log("수정할 소제목 : " + communitySubTitle);
          console.log("수정 전 썸네일 : " + communityThumb);
          console.log("썸네일 수정시 파일 : " + thumbnail);
          console.log("수정할 내용 : " + communityContent);
          console.log(checkbox);
          console.log("type : " + communityType);

          const form = new FormData();
          form.append("communityNo", community.communityNo);
          form.append("communityTitle", communityTitle);
          form.append("communitySubTitle", communitySubTitle);
          // form.append("communityThumb", communityThumb);
          form.append("communityImg", communityImg);
          form.append("communityContent", communityContent);
          form.append("communityType", communityType);
          form.append("thumbnail", thumbnail);
          form.append("communityThumb", communityThumb);

          form.append("typeList", typeList);
          form.append("typeList1", typeList1);

          form.append("delTypeNo", delTypeNo.join("/"));

          const token = window.localStorage.getItem("token");

          axios
            .post("/community/modifyCommunity", form, {
              headers: {
                contentType: "multipart/form-data",
                processData: false,
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              if (res.data === 1) {
                Swal.fire(
                  "수정 완료",
                  "커뮤니티 수정이 완료되었습니다.",
                  "success"
                );
                navigate("community");
              } else {
                Swal.fire("수정 실패", "관리자에게 문의하세요.", "error");
              }
            });
        } else {
          return;
        }
      });
    } else {
      Swal.fire("작성 실패", "입력값을 확인해주세요.", "warning");
    }

    // console.log("수정 전 타입리스트 : " + typeList);
    // console.log("수정 전 타입리스트 길이 : " + typeList.length);
    // console.log(delTypeNo);
  };

  return (
    <div>
      <CommunityFrm
        communityTitle={communityTitle}
        setCommunityTitle={setCommunityTitle}
        communitySubTitle={communitySubTitle}
        setCommunitySubTitle={setCommunitySubTitle}
        communityThumb={communityThumb}
        setCommunityThumb={setCommunityThumb}
        communityImg={communityImg}
        setCommunityImg={setCommunityImg}
        communityContent={communityContent}
        setCommunityContent={setCommunityContent}
        communityType={communityType}
        setCommunityType={setCommunityType}
        typeList={typeList}
        setTypeList={setTypeList}
        delTypeNo={delTypeNo}
        setDelTypeNo={setDelTypeNo}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        buttonEvent={modify}
        type="modify"
      />
    </div>
  );
};

export default CommunityModify;
