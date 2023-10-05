import { useState, useEffect } from "react";

const Type = (props) => {
  const checkedItemHandler = props.checkedItemHandler;
  const isAllChecked = props.isAllChecked;

  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(Type.id, target.checked);
  };

  const allCheckeHandler = () => setChecked(isAllChecked);

  useEffect(() => allCheckeHandler(), [isAllChecked]);

  return (
    <>
      <input
        type="checkbox"
        checked={bChecked}
        onChange={(e) => checkHandler(e)}
      />
    </>
  );
};

export default Type;
