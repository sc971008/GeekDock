import { getMetaData } from "../../../../tool";
import "./index.css";

const Question = ({ q, clickTag, handleAnswer }) => {
    return (
        <div className="question d-flex flex-row justify-content-between border-bottom  p-3"> 
            <div className="postStats d-flex flex-column flex-nowrap text-end mx-1 text-secondary d-none d-md-block">
                <div >{q.answers.length || 0} answers</div>
                <div >{q.views} views</div>
                <div >{q.vote} votes</div>
            </div>

            <div className="question_content px-2">
                <a className="postTitle text-decoration-none" onClick={() => {handleAnswer(q._id);}}>{q.title}</a>
                <div className="question_tags mt-2">
                    {q.tags.map((tag, idx) => {
                        return (
                            <button
                                key={idx}
                                className={`btn border btn-sm me-2 font-monospace`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clickTag(tag.name);
                                }}
                            >
                                {tag.name}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="question_meta d-flex flex-column justify-content-bewteen ms-auto text-end">
                <div className="fs-6 font-monospace">{q.asked_by}</div>
                <div className="last_activity text-secondary mt-auto">asked {getMetaData(new Date(q.ask_date_time))}
                </div>
            </div>
        </div>
    );
};

export default Question;
