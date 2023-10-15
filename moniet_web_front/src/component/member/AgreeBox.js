import { useState, useEffect, useRef } from "react";
import "./agreeBox.css";
import { useNavigate } from "react-router-dom";

const AgreeBox = () => {
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [requiredModalOpen, setRequiredModalOpen]  = useState(false);
  const modalBackground = useRef();

  const navigate = useNavigate();

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
    //disabled = true -> disable처리
    const nextBtn = document.querySelector(".next-button");
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
      nextBtn.disabled = false;
    }
    if (ageCheck === true && useCheck === true) {
      nextBtn.disabled = false;
    } else {
      setAllCheck(false);
      nextBtn.disabled = true;
    }
  }, [ageCheck, useCheck, marketingCheck]);

  const popUpForTerms = () => {
    console.log("클릭");
  };

  const joinfrm = () => {
    const nextBtn = document.querySelector(".next-button");
    if (nextBtn.disabled) {
      alert("이용약관 동의 후 회원가입 페이지로 이동합니다.");
    } else {
      navigate("/joinFrm");
    }
  };

  return (
    <div className="agree-box-wrap">
      <div className="agree-box-title">
        환영합니다!
        <br />
        머니어트에 가입하시려면
        <br />
        약관에 동의해 주세요.
      </div>
      <div className="agree-box-content">
          <div>
            <div>
              <div className="check">
                <input
                  type="checkbox"
                  id="all-check"
                  checked={allCheck}
                  onChange={allBtnEvent}
                />
                <label htmlFor="all-check">전체동의</label>
              </div>
              <div className="check">
                <input
                  type="checkbox"
                  id="check1"
                  checked={ageCheck}
                  onChange={ageBtnEvent}
                />
                <label htmlFor="check1">
                  만 14세 이상입니다 <span>(필수)</span>
                </label>
              </div>
              <div className="check">
                <input
                  type="checkbox"
                  id="check2"
                  checked={useCheck}
                  onChange={useBtnEvent}
                />
                <label htmlFor="check2">
                  이용약관 동의 <span>(필수)</span>
                </label>
                <button
                  onClick={() => setRequiredModalOpen(true)}
                  type="button"
                  className="popUpBtn"
                >
                  자세히
                </button>
                  {
                    requiredModalOpen &&
                    <div 
                      className={'required-modal-container'} 
                      ref={modalBackground} onClick={e => {
                      if (e.target === modalBackground.current) {
                          setRequiredModalOpen(false);
                        }
                      }}
                      >
                      <div className={'required-modal-content'}>
                        <div className="required-modal-title">
                          이용약관 동의(필수)
                        </div>
                        <button className={'modal-close-btn'} onClick={() => setRequiredModalOpen(false)}>
                          <span className="material-icons modalIcon" id="modal-icon">close</span>
                        </button>
                        <div className="scroll-wrap">
                        <h2>제1장 총칭</h2>
                        <br></br>
                        
                        <h4>제1조(목적)</h4>
                        <br/>
                        이 약관은 (주)머니어트(이하 "회사"라 한다)에서 운영하는 머니어트 사이버 몰 (https://www.moneiet.co.kr)이 제공하는 인터넷관련 서비스 (이하"서비스"라 한다)를 이용함에 있어 가입조건 및 이용에 관한 제반 사항과 기타 필요사항, 회원과 회사간의 권리, 의무, 책임사항 및 회원의 서비스 이용절차 등에 관한 사항을 구체적으로 규정함을 목적으로 합니다.
                        ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다」
                        <br/><br/>
                        <h4>제2조(용어의 정의)</h4>
                        <br/>
                        1. "사이트" 라 함은 "회사"가 재화 또는 용역(이하 "재화 등"이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 "재화 등"을 거래할 수 있도록 설정한 가상의 영업장 및 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
                        <br></br>
                        2. "이용자"란 "회사"에 접속하여 이 약관에 따라"회사"가 제공하는 서비스를 받는 회원 및 비회원을 말합니다. 단, 법인이나 회사명의 등으로 서비스 이용은 불가능합니다.
                        <br></br>
                        3. ‘회원’이라 함은 "회사"에 개인정보를 제공하여 회원등록을 한 자로서, "회사"의 정보를 지속적으로 제공받으며, "회사"가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
                        <br></br>
                        4. ‘비회원’이라 함은 회원에 가입하지 않고 "회사"가 제공하는 서비스를 이용하는 자를 말합니다.
                        <br></br>
                        5. "서비스"란 이 약관 제4조에 정한바 대로 회사가 사이트를 통하여 이용자를 위하여 유료 또는 무료로 제공하는 행위 또는 그 행위의 대상인 유•무형의 물건 자체를 의미합니다.
                        <br></br>
                        6. "개인정보"란 당해 정보에 포함되어 있는 성명, 생년월일, 성별 등의 사항에 의하여 특정 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 인식할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함)를 말합니다.
                        <br></br><br></br>
                        <h4>제3조(약관의 명시와 설명 및 개정)</h4>
                        1. "회사"는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보 관리책임자 등을 회원이 쉽게 알 수 있도록 "사이트"의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
                        <br></br>
                        2. "회사"는 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회, 배송책임, 환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.
                        <br></br>
                        3. "회사"는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망이용촉진 등에 관한 법률, 방문판매 등에 관한 법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                        <br></br>
                        4. "회사"가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 "회사"의 초기 화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
                        다만, 이용자에게 불리하게 약관 내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 "회사"는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.
                        <br></br>
                        5. "회사"는 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 "회사"에 송신하여 "회사"의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.
                        <br></br>
                        6. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호 지침 및 관계법령 또는 상관례에 따릅니다.
                        제2장 서비스의 이용
                        <br></br><br></br>
                        <h4>제4조(서비스의 제공 및 변경)</h4>
                        1. "회사"는 다음과 같은 업무를 수행합니다.
                        가. 재화 또는 용역에 대한 정보제공 및 수입대행계약 또는 구매계약의 체결
                        나. 구매계약이 체결된 재화 또는 용역의 배송
                        다. 기타 "회사"가 정하는 업무
                        <br></br>
                        2. "회사"는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.
                        <br></br>
                        3. "회사"가 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화 등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 즉시 통지합니다.
                        <br></br>
                        4. 전항의 경우 "회사"는 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, "회사"가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
                        <br></br><br></br>
                        <h4>제5조(서비스의 중단)</h4>
                        1. "회사"는 컴퓨터 등 정보통신설비의 보수, 점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
                        <br></br>
                        2. "회사"는 제1항의 사유로 서비스의 제공이 일시적 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, "회사"가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
                        <br></br>
                        3. 사업종목의 전환, 사업의 포기, 업체간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 "회사"는 제8조에 정한 방법으로 이용자에게 통지하고 이용자가 이로 인하여 손해를 입은 경우에는 당초 "회사"에서 제시한 조건에 따라 이용자에게 보상합니다.
                        <br></br>
                        4. 머니어트 회원의 적립금은 서비스 만료일을 기준 전부 소멸되며 이는 회원에게 회원 E-mail로 사전통지 합니다. 다만, 머니어트가 사전에 통지하지 아니한 경우 회원의 적립금을 회사에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 회원에게 지급합니다.
                        <br></br>
                        5. 머니어트 회원의 예치금은 서비스 만료일 전까지 고객에게 모두 환불되며 연락두절, 계좌불분명 등으로 환불이 어려운 경우에도 업무처리를 위해 최선의 노력을 다 합니다.
                        </div>
                      </div>
                    </div>
                  }
                  </div>
              <div className="check">
                <input
                  type="checkbox"
                  id="check3"
                  checked={marketingCheck}
                  onChange={marketingBtnEvent}
                />
                <label htmlFor="check3">
                  개인정보수집 및 이용안내 <span>(선택)</span>
                </label>
                <button
                  onClick={() => setModalOpen(true)}
                  type="button"
                  className="popUpBtn"
                >
                  자세히
                </button>
                {modalOpen && (
                  <div
                    className={"modal-container"}
                    ref={modalBackground}
                    onClick={(e) => {
                      if (e.target === modalBackground.current) {
                        setModalOpen(false);
                      }
                    }}
                  >
                    <div className={"modal-content"}>
                      <div className="modal-title">
                        개인정보 수집 및 이용안내(선택)
                      </div>
                      <div className="modal-close-btn-wrap">
                        <button
                          className={"modal-close-btn"}
                          onClick={() => setModalOpen(false)}
                        >
                          <span className="material-icons modalIcon" id="modal-icon">close</span>
                        </button>
                      </div>
                      <table className="option-table">
                        <thead>
                        <tr>
                          <th>구분</th>
                          <th>수집항목</th>
                          <th>이용목적</th>
                        </tr>
                        </thead>
                        <tbody>
                        <th>기타
                            <br></br>
                          서비스
                          </th>
                          <td>휴대폰 번호</td>
                          <td className="text-underline">앱 설치 URL 전송</td>
                        </tbody>
                      </table>
                      <ul className="option-ul">
                        <li className="text-underline">개인정보의 보유 및 이용기간 : 회원 탈퇴 시 30일 뒤 또는 법정 의무 보유기간</li>
                        <li>선택사항의 동의를 거부하시는 경우에도 회원가입 및 필수서비스는 이용하실수 있습니다. 단, 일부 부가서비스는 제한될 수 있습니다.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="next-button" type="button" onClick={joinfrm}>
            다음
          </button>
      </div>
    </div>
  );
};

export default AgreeBox;
