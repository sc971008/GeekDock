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
        <div className="question_header d-flex flex-column justify-content-between ">

            <div id="" className="d-flex justify-content-between mb-3">
                <div className="fs-4">{title_text}</div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        handleNewQuestionClick()
                    }}
                >
                    {!askFeedBack && `Ask a Question`}{askFeedBack}
                </button>
            </div>
            
            <div className="d-flex justify-content-between mb-2">
                <div id="question_count">{qcnt} questions</div>
                <div id="orderBar" className={`btn-group btn-secondary bg-${visual ==='dark' ? 'dark':'body'}`} role="group" aria-label="Basic radio toggle button group">  
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
