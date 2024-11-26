import "./index.css";
import React from "react";
import { handleHyperlink } from "../../../../tool";
import {voteQuestionById} from '../../../../services/voteService'

// Component for the Question's Body
const QuestionBody = ({user, qid, views, vote, text, askBy, meta, onVoteChange, setPage}) => {

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
        <div id="questionBody" className="questionBody right_padding">
            <div className="vote_section">
                <div className="aVote" onClick={handleUpvote}>🔺</div>
                <span id="voteCount">{`${vote}`}</span>
                <div className="aVote" onClick={handleDownvote}>🔻</div>
            </div>
            <div className="view">{views} views</div>
            <div className="answer_question_text">{handleHyperlink(text)}</div>
            <div className="answer_question_right">
                <div className="question_author">{askBy}</div>
                <div className="answer_question_meta">asked {meta}</div>
            </div>
        </div>
    );
};

export default QuestionBody;