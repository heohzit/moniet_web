import "./inputFrm.css";

const Input = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const min = props.min;
  const max = props.max;
  const content = props.content;
  const blurEvent = props.blurEvent;
  const disabled = props.disabled;
  const placeholder = props.placeholder;
  const pattern = props.pattern;
  const keyUpEvent = props.keyUpEvent;
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
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
        pattern={pattern}
        onKeyUp={keyUpEvent}
        maxLength="30"
      ></input>
    </>
  );
};
export default Input;
