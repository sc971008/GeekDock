import "./index.css";
import { useState } from "react";
import OrderButton from "./orderButton";
import { getUser } from "../../../../services/userService";
const QuestionHeader = ({title_text,qcnt,questionOrder,setQuestionOrder,setPage,visual}) => {
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
        <div className="question_header d-flex flex-row justify-content-between mb-2">

            <div id="" className="d-flex flex-column justify-content-between">
                <div className="fs-4">{title_text}</div>
                <div id="question_count" className="fs-6 text-secondary">{qcnt} questions</div>
            </div>

            <div className="d-flex flex-column justify-content-between gap-2 ms-auto">
                <button
                    className="btn btn-primary btn-sm shadow-sm ms-auto"
                    onClick={() => {
                        handleNewQuestionClick()
                    }}
                >
                    {!askFeedBack && `Ask Question`}{askFeedBack}
                </button>
                <div id="orderBar" className={`btn-group btn-secondary bg-${visual ==='dark' ? 'dark':'body'} shadow-sm ms-auto`} role="group" aria-label="Basic radio toggle button group">  
                    {["Newest", "Active", "Unanswered"].map((label,idx) => (
                        <OrderButton
                            key = {idx}
                            label={label}
                            questionOrder={questionOrder}
                            setQuestionOrder={setQuestionOrder}
                            visual={visual}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;
