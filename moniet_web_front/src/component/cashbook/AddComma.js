const AddComma = (props) => {
  const num = props.num;
  if (num >= 1000) {
    const numAddComma = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numAddComma;
  }
  return num;
};

export default AddComma;
