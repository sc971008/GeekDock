import { handleHyperlink } from "../../../../tool";
import "./index.css";

// Component for the Answer Page
const Answer = ({ text, ansBy, meta }) => {
    return (
        <div id="anwser" className="d-flex flex-wrap px-3 py-2 mb-2 border-bottom">
            <div id="answerText" className="mb-1 ">
                {handleHyperlink(text)}
            </div>
            <div className="answerAuthor ms-auto text-end">
                <div className="answer_author font-monospace">{ansBy}</div>
                <div className="answer_question_meta text-secondary">answered {meta}</div>
            </div>
        </div>
    );
};

export default Answer;
