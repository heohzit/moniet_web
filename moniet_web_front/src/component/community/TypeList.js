import Type from "./Type";
import { useState } from "react";

const TypeList = () => {
  const types = [...Array(4).keys()]; // 1, 2, 4, 8, 16
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [isAllChecked, setIsAllChecked] = useState(false);

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };

  const allCheckedHandler = (isChecked) => {
    if (isChecked) {
      setCheckedItems(new Set(types.map(({ id }) => id)));
      setIsAllChecked(true);
    } else {
      checkedItems.clear();
      setCheckedItems(setCheckedItems);
      setIsAllChecked(false);
    }
  };

  return (
    <>
      <input type="checkbox" />
      <div>
        {types.map((types, index) => {
          <Type
            key={index}
            checkedItemHandler={checkedItemHandler}
            isAllChecked={isAllChecked}
          />;
        })}
      </div>
    </>
  );
};

export default TypeList;
