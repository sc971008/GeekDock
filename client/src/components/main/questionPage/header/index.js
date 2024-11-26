import "./index.css";
import { useState } from "react";
import OrderButton from "./orderButton";
import { getUser } from "../../../../services/userService";
const QuestionHeader = ({title_text,qcnt,questionOrder,setQuestionOrder,setPage}) => {
    const [askFeedBack,setAskFeedBack] = useState("")

    const handleNewQuestionClick = async () => {
        // Check if logged In
        const res = await getUser();
        if (res && res._id) {
            setPage('newQuestion')
        }
        else {
            setAskFeedBack(" ⛔️ Not logged In ...Redirecting")
            setTimeout(() => { setPage("login") }, 1000)
        }
    }

    return (
        <div>
            <div className="space_between right_padding">
                <div className="bold_title">{title_text}</div>
                <button
                    className="bluebtn"
                    onClick={() => {
                        handleNewQuestionClick()
                    }}
                >
                    {!askFeedBack && `Ask a Question`}{askFeedBack}
                </button>
            </div>
            <div className="space_between right_padding">
                <div id="question_count">{qcnt} questions</div>
                <div className="btns">
                    {["Newest", "Active", "Unanswered"].map((m, idx) => (
                        <OrderButton
                            questionOrder={questionOrder}
                            key={idx}
                            message={m}
                            setQuestionOrder={setQuestionOrder}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;
