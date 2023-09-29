import "./inputFrm.css";

const Input = (props) => {
    const content = props.content;
    const data = props.data;
    const setData = props.setData;
    const type = props.type;
    const changeValue = (e) => {
        const inputValue = e.currentTarget.value;
        setData(inputValue);
    };
    return(
        <>
        <input
        id={content}
        className="input-form"
        type={type}
        value={data}
        onChange={changeValue}
        ></input>
        </>
    );
    
};
export default Input;