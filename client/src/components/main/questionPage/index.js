import "./index.css";
import QuestionHeader from "./header";
import Question from "./question";

import { getQuestionsByFilter } from "../../../services/questionService";
import { useEffect, useState } from "react";

const QuestionPage = ({
    title_text = "All Questions",
    order,
    search,
    questionOrder,
    setQuestionOrder,
    clickTag,
    handleAnswer,
    setPage,
    visual
}) => {
    const [qlist, setQlist] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionsByFilter(order, search);
            setQlist(res || []);
            console.log("Fetched question detailsssss:", res); 
        };

        fetchData().catch((e) => console.log(e));
    }, [order, search]);
    return (
        <div id="question_page" className="bg-body  rounded p-4">
            <QuestionHeader
                title_text={title_text}
                qcnt={qlist.length}
                questionOrder={questionOrder}
                setQuestionOrder={setQuestionOrder}
                setPage={setPage}
                visual={visual}
            />
            <div id="question_list" className={`question_list d-flex flex-column  border rounded mb-2`}>
                {qlist.map((q, idx) => (
                    <Question
                        q={q}
                        key={idx}
                        clickTag={clickTag}
                        handleAnswer={handleAnswer}
                        visual={visual}
                    />
                ))}
            </div>
            {title_text === "Search Results" && !qlist.length && (
                <div className="bold_title right_padding mt-2">
                    Oh ho ~ <br></br>
                    No Questions Found
                </div>
            )}
        </div>
    );
};

export default QuestionPage;
