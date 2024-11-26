
import "./index.css";

const OrderButton = ({ message, setQuestionOrder,questionOrder }) => {


    return (
        <button
            className={`order_button ${message == questionOrder? "order_selected":""}`}
            onClick={() => {
                setQuestionOrder(message);
            }}
        >
            {message}
        </button>
    );
};

export default OrderButton;
