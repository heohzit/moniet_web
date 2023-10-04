import "./challenge.css";
import { Button3 } from "../util/Buttons";

const ChallengeFrm = (props) => {
  const challengeTitle = props.challengeTitle;
  const setChallengeTitle = props.setChallengeTitle;
  const challengeContent = props.challengeContent;
  const setChallengeContent = props.setChallengeContent;
  const challengeKind = props.challengeKind;
  const setChallengeKind = props.setChallengeKind;
  const challengeAmount = props.challengeAmount;
  const setChallengeAmount = props.setChallengeAmount;
  const challengeStart = props.challengeStart;
  const setChallengeStart = props.setChallengeStart;
  const challengeEnd = props.challengeEnd;
  const setChallengeEnd = props.setChallengeEnd;
  const buttonEvent = props.buttonEvent;
  return (
    <div className="challenge-frm wrap">
      <div className="challenge-frm-top">
        <div className="challenge-info">
          <table className="challenge-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="challengeKind">머니챌린지 선택</label>
                </td>
                <td>
                  <select>
                    <option>저축 챌린지</option>
                    <option>지출 챌린지</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeTitle">제목</label>
                </td>
                <td>
                  <input type="text"></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeContent">내용</label>
                </td>
                <td>
                  <input type="text"></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeStart">시작일자</label>
                </td>
                <td>
                  <input type="date"></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeEnd">종료일자</label>
                </td>
                <td>
                  <input type="date"></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeAmount">목표 금액</label>
                </td>
                <td>
                  <input type="text"></input>
                  <span>원</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="board-content-box"></div>
      <div className="board-btn-box">
        <Button3 text="취소하기"></Button3>
        <Button3 text="등록하기"></Button3>
      </div>
    </div>
  );
};
export default ChallengeFrm;
