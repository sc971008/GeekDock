import "./index.css";
import React from "react";
import { handleHyperlink } from "../../../../tool";
import {voteQuestionById} from '../../../../services/voteService'

// Component for the Question's Body
const QuestionBody = ({user, qid, views, vote, text, askby, meta, onVoteChange, setPage}) => {

    const handleUpvote = async () => {
        if (!user) {
            alert("Please log in to vote!");
            setPage("login")
            return;
        }
        console.log('Upvoting with user:', user, 'and question ID:', qid);
        try {            
            const voteReq = {
                user: user.username,
                qid:qid,
                voteType:1
            }
            const updatedQuestion = await voteQuestionById(voteReq);
            if (updatedQuestion && updatedQuestion.vote !== undefined) {
                onVoteChange(updatedQuestion.vote);
            } else {
                console.error('Unexpected response from server:', updatedQuestion);
            }

        } catch (error) {
            console.error('Failed to upvote', error);
        }

    };
    

    const handleDownvote = async () => {
        if (!user) {
            alert("Please log in to vote!");
            setPage("login")  // Assuming setPage switches your app's page
            return;
        }

        console.log('Upvoting with user:', user, 'and question ID:', qid);
        try {
            const voteReq = {
                user: user.username,
                qid:qid,
                voteType:-1
            }
            const updatedQuestion = await voteQuestionById(voteReq);
            if (updatedQuestion && updatedQuestion.vote !== undefined) {
                onVoteChange(updatedQuestion.vote);
            } else {
                console.error('Unexpected response from server:', updatedQuestion);
            }
        } catch (error) {
            console.error('Failed to upvote', error);
        }};

    
    return (
        <div id="questionBody" className="d-flex flex-wrap justify-cotent-between border rounded shadow p-3">
            <div id=""className="d-flex">
                <div id="vote_section" className="d-flex flex-column align-items-center">
                    <button id="vote_up" className="border btn btn-sm shadow-sm" onClick={handleUpvote}>
                        <i className="bi bi-caret-up-fill"></i>
                    </button>
                    <div id="voteCount" className="p-1 text-secondary">{`${vote}`}</div>
                    <button id="vote_down" className="border btn btn-sm shadow-sm" onClick={handleDownvote}>
                        <i className="bi bi-caret-down-fill"></i>
                    </button>
                </div>

                <div id="question_text" className="px-3">{handleHyperlink(text)}</div>
            </div>
            <div id="question_meta" className="ms-auto text-end">
                <div className="question_author font-monospace">{askby}</div>
                <div className="answer_question_meta text-secondary ">asked {meta}</div>
                <div className="view text-secondary">{views} views</div>
            </div>
        </div>
    );
};

export default QuestionBody;