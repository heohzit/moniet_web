import { useState, useEffect } from "react";
import "./agreeBox.css";

const AgreeBox = () => {
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };
  useEffect(() => {
    const nextBtn = document.querySelector(".next-button");
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
      nextBtn.disabled = true;
    }
    if (ageCheck === true && useCheck === true) {
      nextBtn.disabled = true;
    } else {
      setAllCheck(false);
      nextBtn.disabled = false;
    }
  }, [ageCheck, useCheck, marketingCheck]);

  return (
    <div className="agree-box-wrap">
      <div className="agree-box-title">이용약관 확인 및 동의</div>
      <div className="agree-box-content">
        <form method="post" action="">
          <div>
            <div>
              <div>
                <input
                  type="checkbox"
                  id="all-check"
                  checked={allCheck}
                  onChange={allBtnEvent}
                />
                <label for="all-check">전체동의</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="check1"
                  checked={ageCheck}
                  onChange={ageBtnEvent}
                />
                <label for="check1">
                  만 14세 이상입니다 <span>(필수)</span>
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="check2"
                  checked={useCheck}
                  onChange={useBtnEvent}
                />
                <label for="check2">
                  이용약관 <span>(필수)</span>
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="check3"
                  checked={marketingCheck}
                  onChange={marketingBtnEvent}
                />
                <label for="check3">
                  마케팅 동의 <span>(선택)</span>
                </label>
              </div>
            </div>
          </div>
          <button className="next-button" disabled>
            확인
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgreeBox;
