import "./challenge.css";
import { Button3 } from "../util/Buttons";
import Input from "../util/InputFrm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChallengeFrm = (props) => {
  const challengeKind = props.challengeKind;
  const setChallengeKind = props.setChallengeKind;
  const challengeTitle = props.challengeTitle;
  const setChallengeTitle = props.setChallengeTitle;
  const challengeContent = props.challengeContent;
  const setChallengeContent = props.setChallengeContent;
  const challengeAmount = props.challengeAmount;
  const setChallengeAmount = props.setChallengeAmount;
  const challengeStart = props.challengeStart;
  const setChallengeStart = props.setChallengeStart;
  const challengeEnd = props.challengeEnd;
  const setChallengeEnd = props.setChallengeEnd;
  const buttonEvent = props.buttonEvent;
  const type = props.type;

  const onChangeHanlder = (e) => {
    setChallengeKind(e.currentTarget.value);
  };
  const Options = [
    { value: "선택" },
    { key: 1, value: "저축 챌린지" },
    { key: 2, value: "지출 챌린지" },
  ];
  //const writeReturn = () => {
  //const navigate = useNavigate();
  //navigate("/challenge");
  //};
  return (
    <div>
      <div className="challenge-frm-top">
        <div className="challenge-info">
          <table className="challenge-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="challengeKind">머니챌린지 선택</label>
                </td>
                <td>
                  <select onChange={onChangeHanlder} value={challengeKind}>
                    {Options.map((item, index) => (
                      <option key={item.key} value={item.key}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeTitle">제목</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={challengeTitle}
                    setData={setChallengeTitle}
                    content="challengeTitle"
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeContent">내용</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={challengeContent}
                    setData={setChallengeContent}
                    content="challengeContent"
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeStart">시작일자</label>
                </td>
                <td>
                  <Input
                    type="date"
                    data={challengeStart}
                    setData={setChallengeStart}
                    content="challengeStart"
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeEnd">종료일자</label>
                </td>
                <td>
                  <Input
                    type="date"
                    data={challengeEnd}
                    setData={setChallengeEnd}
                    content="challengeEnd"
                  ></Input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeAmount">목표 금액</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={challengeAmount}
                    setData={setChallengeAmount}
                    content="challengeAmount"
                  ></Input>
                  <span>원</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="board-btn-box">
        <Button3 text="취소하기"></Button3>
        <Button3 text="등록하기" clickEvent={buttonEvent}></Button3>
      </div>
    </div>
  );
};
export default ChallengeFrm;
