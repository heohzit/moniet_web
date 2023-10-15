import "./challenge.css";
import { Button3 } from "../util/Buttons";
import Input from "../util/InputFrm";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//챌린지 작성 폼
const ChallengeFrm = (props) => {
  const challengeKind = props.challengeKind;
  const setChallengeKind = props.setChallengeKind;
  const challengeTitle = props.challengeTitle;
  const setChallengeTitle = props.setChallengeTitle;
  const challengeAmount = props.challengeAmount;
  const setChallengeAmount = props.setChallengeAmount;
  const challengeStart = props.challengeStart;
  const setChallengeStart = props.setChallengeStart;
  const challengeEnd = props.challengeEnd;
  const setChallengeEnd = props.setChallengeEnd;
  const buttonEvent = props.buttonEvent;
  const challengeCategory = props.challengeCategory;
  const setChallengeCategory = props.setChallengeCategory;
  const type = props.type;

  //챌린지 옵션
  const onChangeHanlder = (e) => {
    setChallengeKind(e.currentTarget.value);
  };
  const Options = [
    { key: 1, value: "저축 챌린지" },
    { key: 2, value: "지출 챌린지" },
  ];
  //달력 날짜 지정
  const today = new Date();
  const dateString = today.toISOString().substring(0, 10);
  const dateObj = new Date(dateString);
  dateObj.setDate(dateObj.getDate() + 1);
  const tomorrowString = dateObj.toISOString().substring(0, 10);

  const navigate = useNavigate();
  const canclePage = () => {
    navigate("/challenge/*");
  };

  const [spendingCate, setSpendingCate] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/cashbook/categoryList", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setSpendingCate(res.data.spendingCategory);
        console.log(res.data.spendingCategory);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

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
                      <option key={item.key} value={item.key} selected>
                        {item.value}
                      </option>
                    ))}
                  </select>
                  {challengeKind === "2" ? (
                    <select
                      name="categoryChallenge"
                      defaultValue={challengeCategory}
                      onChange={(e) =>
                        setChallengeCategory(e.currentTarget.value)
                      }
                    >
                      <option value="">지출챌린지 종류 선택</option>
                      {spendingCate.map((item, index) =>
                        item.categoryTitle !== "저축" ? (
                          <option
                            key={"spending" + index}
                            value={item.categoryNo}
                            selected
                          >
                            {item.categoryTitle}
                          </option>
                        ) : (
                          ""
                        )
                      )}
                    </select>
                  ) : null}
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="challengeTitle">머니챌린지 다짐한마디!</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={challengeTitle}
                    setData={setChallengeTitle}
                    content="challengeTitle"
                    placeholder={"ex) 한달동안 식비"}
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
                    min={dateString}
                    max={dateString}
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
                    min={tomorrowString}
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
      <div className="challenge-btn-box">
        <Button3 text="취소하기" clickEvent={canclePage}></Button3>
        <Button3 text="등록하기" clickEvent={buttonEvent}></Button3>
      </div>
    </div>
  );
};

export default ChallengeFrm;
