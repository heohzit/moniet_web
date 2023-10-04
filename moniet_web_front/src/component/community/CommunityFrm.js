import Input from "../util/InputFrm";
import "./community.css";
import { TextEditor1, TextEditor2 } from "../util/TextEditor";
import { Button1, Button2, Button3, Button4 } from "../util/Buttons";

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
  const buttonEvent = props.buttonEvent;

  const type = props.type;

  const thumbnailChange = (e) => {};

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

              <tr>
                <td>
                  <label htmlFor="thumbnail">대표이미지</label>
                </td>
                <td>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={thumbnailChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="community-content-box">
        <TextEditor1 data={communityContent} setData={setCommunityContent} />
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

export default CommunityFrm;
