import Input from "../util/InputFrm";
import "./community.css";
import { TextEditor1, TextEditor2 } from "../util/TextEditor";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";
import Type from "./Type";

const CommunityFrm = (props) => {
  const communityTitle = props.communityTitle;
  const setCommunityTitle = props.setCommunityTitle;
  const communitySubTitle = props.communitySubTitle;
  const setCommunitySubTitle = props.setCommunitySubTitle;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const communityContent = props.communityContent;
  const setCommunityContent = props.setCommunityContent;
  const communityImg = props.communityImg;
  const setCommunityImg = props.setCommunityImg;
  const communityType = props.communityType;
  const setCommunityType = props.setCommunityType;
  //const buttonEvent = props.buttonEvent;

  const type = props.type;

  const typeList = [
    { name: "저축하기 🐷", value: 1 },
    { name: "지출줄이기 💰", value: 2 },
    { name: "투자하기 📈", value: 4 },
    { name: "기타 💸", value: 8 },
  ];
  const buttonEvent = () => {
    const checkbox = document.querySelectorAll("[name=types]:checked");
  };
  const thumbnailChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setThumbnail(files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setCommunityImg(reader.result);
      };
    } else {
      setThumbnail({});
      setCommunityImg(null);
    }
  };

  return (
    <div className="community-frm-wrap">
      <div className="community-frm-top">
        <div className="community-thumbnail">
          {communityImg === null ? (
            <img src="/image/default.png" />
          ) : (
            <img src={communityImg} />
          )}
        </div>

        <div className="community-info">
          <table className="community-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="communityTitle">제목</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={communityTitle}
                    setData={setCommunityTitle}
                    content="communityTitle"
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label htmlFor="communitySubTitle">소제목</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={communitySubTitle}
                    setData={setCommunitySubTitle}
                    content="communitySubTitle"
                  />
                </td>
              </tr>

              <tr className="thumbnail-tr">
                <td>
                  <label htmlFor="thumbnail">대표이미지</label>
                </td>
                <td className="thumbnail-input-td">
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={thumbnailChange}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>커뮤니티 분류</label>
                </td>
                <td className="community-type">
                  {typeList.map((item) => {
                    return (
                      <label className="checkboxLabel" key={item.name}>
                        <input
                          type="checkbox"
                          id={item.name}
                          className="types"
                          defaultValue={item.value}
                        />
                        <span>{item.name}</span>
                      </label>
                    );
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="community-content-box">
        <TextEditor2
          data={communityContent}
          setData={setCommunityContent}
          url="/community/contentImg"
        />
      </div>

      <div className="community-btn-box">
        {type === "modify" ? (
          <Button1 text="수정하기" clickEvent={buttonEvent} />
        ) : (
          <Button1 text="작성하기" clickEvent={buttonEvent} />
        )}
      </div>
    </div>
  );
};

const onCheckedItem = (e) => {};

export default CommunityFrm;
