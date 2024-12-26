import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import { getQuestionById } from "../../../services/questionService";
import { UsersubscribeQuestion,getUser } from "../../../services/userService"


// Component for the Answers page
const AnswerPage = ({user,qid, handleNewQuestion,handleSave,setPage,fetchUser}) => {
    const [question, setQuestion] = useState({});
    const [ansFeedBack,setAnsFeedBack] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionById(qid);
            setQuestion(res || {});
        };
        fetchData().catch((e) => console.log(e));
    }, [qid]);

    const handleNewAnswer = async () => {
        // Check if logged In
        const res = await getUser();
        if (res && res._id) {
            setPage("newAnswer")
        }
        else {
            setAnsFeedBack(" ⛔️ Not logged In ...Redirecting")
            setTimeout(() => { setPage("login") }, 1000)
        }
    }

    return (
        <div id="answer_page" className={`d-flex flex-column shadow px-5 py-4 border rounded bg-body`}>  
            <AnswerHeader
                user={user}
                question= {question}
                ansCount={
                    question && question.answers && question.answers.length
                }
                title={question && question.title}
                handleNewQuestion={handleNewQuestion}
                handleSubscribe={UsersubscribeQuestion}
                handleSave={handleSave}
                setPage={setPage}
                fetchUser={fetchUser}
            />
              <QuestionBody
                user={user}
                views={question && question.views}
                text={question && question.text}
                askby={question && question.asked_by}
                qid={qid}
                onVoteChange={(newVote) => {
                    setQuestion({ ...question, vote: newVote }); // Update the local state to reflect the new vote count
                }}
                vote={question && question.vote}
                meta={question && getMetaData(new Date(question.ask_date_time))}
                setPage={setPage}
            />
            {question &&
                question.answers &&
                question.answers.map((a, idx) => (
                    <Answer
                        key={idx}
                        text={a.text}
                        ansBy={a.ans_by}
                        meta={getMetaData(new Date(a.ans_date_time))}
                    />
                ))}
            <div className="d-flex flex-column">
                <button
                    className="btn btn-primary mt-4 me-auto"
                    onClick={() => {
                        handleNewAnswer();
                    }}
                >
                    {!ansFeedBack && `Answer Question`}{ansFeedBack}
                </button>
            </div>
        </div>
    );
};

export default AnswerPage;

