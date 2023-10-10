import "./inputFrm.css";

const Input = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const blurEvent = props.blurEvent;

  const onClick = props.onClick;

  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setData(inputValue);
  };
  return (
    <>
      <input
        id={content}
        className="input-form"
        type={type}
        value={data}
        onChange={changeValue}
        onBlur={blurEvent}
        onClick={onClick}
      ></input>
    </>
  );
};
export default Input;
