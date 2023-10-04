const Button1 = (props) => {
  const clickEvent = props.clickEvent;
  const text = props.text;
  return (
    <>
      <button className="btn st1" type="button" onClick={clickEvent}>
        {text}
      </button>
    </>
  );
};

const Button2 = (props) => {
  const clickEvent = props.clickEvent;
  const text = props.text;
  return (
    <>
      <button className="btn st2" type="button" onClick={clickEvent}>
        {text}
      </button>
    </>
  );
};

const Button3 = (props) => {
  const clickEvent = props.clickEvent;
  const text = props.text;
  return (
    <>
      <button className="btn st3" type="button" onClick={clickEvent}>
        {text}
      </button>
    </>
  );
};

export { Button1, Button2, Button3 };
