
import "./index.css";

const OrderButton = ({ label, setQuestionOrder, questionOrder }) => {

    return (
        <>
            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id={label}
                autoComplete="off"
                checked={label.toLowerCase() == questionOrder}
                onChange={() => { setQuestionOrder(label.toLowerCase()) }}
            ></input>
            <label className="btn btn-sm" htmlFor={label} >{label}</label>
        </>
    );
};

export default OrderButton;
