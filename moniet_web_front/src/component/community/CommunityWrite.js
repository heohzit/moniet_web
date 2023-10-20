import CommunityFrm from "./CommunityFrm";
import "./community.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const CommunityWrite = (props) => {
  const isLogin = props.isLogin;
  const navigate = useNavigate();

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

  const write = () => {
    if (
      communityTitle !== "" &&
      communitySubTitle !== "" &&
      communityContent !== "" &&
      communityType.length !== 0
    ) {
      Swal.fire({
        icon: "question",
        text: "커뮤니티를 작성하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed) {
          const checkbox = document.querySelectorAll("[name=types]:checked");

          // console.log(communityTitle);
          // console.log(communitySubTitle);
          // console.log(thumbnail);
          // console.log(communityContent);
          // console.log(checkbox); // 덩어리가 크니까 value값만 넘겨주기
          // console.log("type : " + communityType);

          const form = new FormData();
          form.append("communityTitle", communityTitle);
          form.append("communitySubTitle", communitySubTitle);
          form.append("thumbnail", thumbnail);
          form.append("communityContent", communityContent);

          form.append("communityType", communityType);

          const token = window.localStorage.getItem("token");

          axios
            .post("/community/insert", form, {
              headers: {
                contentType: "multipart/form-data",
                processdData: false,
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              if (res.data > 1) {
                Swal.fire(
                  "작성 완료",
                  "커뮤니티 작성이 완료되었습니다.",
                  "success"
                );
                navigate("community");
              } else {
                Swal.fire("작성 실패", "관리자에게 문의하세요.", "error");
              }
            });
        } else {
          return;
        }
      });
    } else {
      Swal.fire("작성 실패", "입력값을 확인해주세요.", "warning");
    }
  };

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
        buttonEvent={write}
        type="write"
        maxlength="35"
      />
    </div>
  );
};

export default CommunityWrite;
