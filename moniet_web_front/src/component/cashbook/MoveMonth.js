const PrevMonth = (props) => {
  const dateRange = props.dateRange;
  const setDateRange = props.setDateRange;
  const select = props.select;
  const setSelect = props.setSelect;

  const prev = () => {
    const startDate = new Date(
      dateRange[0].startDate.getFullYear(),
      dateRange[0].startDate.getMonth() - 1,
      1
    );
    const endDate = new Date(
      dateRange[0].endDate.getFullYear(),
      dateRange[0].endDate.getMonth(),
      0
    );
    setDateRange([{ startDate: startDate, endDate: endDate }]);
    setSelect(!select);
  };

  return <img src="icon/left-btn.png" alt="prev" onClick={prev} />;
};
const NextMonth = (props) => {
  const dateRange = props.dateRange;
  const setDateRange = props.setDateRange;
  const select = props.select;
  const setSelect = props.setSelect;

  const next = () => {
    const startDate = new Date(
      dateRange[0].startDate.getFullYear(),
      dateRange[0].startDate.getMonth() + 1,
      1
    );
    const endDate = new Date(
      dateRange[0].endDate.getFullYear(),
      dateRange[0].endDate.getMonth() + 2,
      0
    );
    setDateRange([{ startDate: startDate, endDate: endDate }]);
    setSelect(!select);
  };
  return <img src="icon/right-btn.png" alt="next" onClick={next} />;
};

export { PrevMonth, NextMonth };
