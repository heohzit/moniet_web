import { useNavigate } from "react-router-dom";
import Input from "./InputFrm";
import axios from "axios";
import Swal from "sweetalert2";

const MyPage = (props) => {
  //회원탈퇴
  const deleteMember = () => {
    const isDelete = confirm("회원 탈퇴를 하시겠습니까?");
    if (isDelete == true) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/delete", null, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          window.localStorage.removeItem("token");
          setIsLogin(false);
          alert("탈퇴가 완료되었습니다.");
        })
        .catch((res) => {
          if (res.response.status === 403) {
            window.localStorage.removeItem("token");
            setIsLogin(false);
          }
        });
    }
  };

  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="mypage-wrap">
      <div className="mypage-title">MY PAGE</div>
      <table className="mypage-tbl">
        <tbody>
          <tr>
            <td>회원번호</td>
            <td>{member.memberNo}</td>
          </tr>
          <tr>
            <td>아이디</td>
            <td>{member.memberId}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>{member.memberName}</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td id="member-phone">
              <div>
                <Input
                  type="text"
                  data={member.memberPhone}
                  setData={setMemberPhone}
                  content="memberPhone"
                />
                <button onClick={updateMemberPhone}>변경하기</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="delete-btn-box">
        <button onClick={deleteMember}>회원탈퇴</button>
      </div>
    </div>
  );
};

export default MyPage;
