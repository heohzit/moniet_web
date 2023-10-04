import "./inputFrm.css";

const Input = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const changevalue = (e) => {
    const inputValue = e.currentTarget.value;
    setData(inputValue);
  };
  return (
    <>
      <input
        id={content}
        className="input-form"
        type={type}
        value={data || ""}
        onChange={changevalue}
        onBlur={blurEvent}
      ></input>
    </>
  );
};
export default Input;
