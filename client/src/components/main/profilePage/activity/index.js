import React, { useEffect, useState } from 'react';
import "./index.css";
import Question from "../../questionPage/question/index";
import Answer from "../../answerPage/answer/index"
import { getQuestionById, getQuestionByUser} from '../../../../services/questionService'; 
import { getAnswerByUser } from '../../../../services/answerService';
import { getUserVoteHistory } from '../../../../services/voteService';
import { getMetaData } from '../../../../tool';



const ProfileActivity = ({
    user, saved, subscribes, clickTag, handleAnswer,
    fetchSaved = false, fetchSubscribed = false, fetchAsked = false, fetchAnswers = false, fetchVote=false

  }) => {
    const [savedQ, setSavedQ] = useState([]);
    const [subscribeQ, setSbQ] = useState([]);
    const [askedQ, setaskQ] = useState([]);
    const [answers, setanswer] = useState([]);
    const [voteQ, setvote] = useState([]);

  
    // Fetch saved posts
    useEffect(() => {
      if (fetchSaved) {
        const fetchQuestions = async () => {
          const questionPromises = saved.map(s =>
            Promise.all(s.questions.map(id => getQuestionById(id)))
          );
          const questionDetails = await Promise.all(questionPromises).then(results => results.flat());
          setSavedQ(questionDetails);
        };
        fetchQuestions();
      }
    }, [saved, fetchSaved]);
  
    // Fetch subscriptions
    useEffect(() => {
      if (fetchSubscribed) {
        const fetchQuestions = async () => {
          const questionPromises = subscribes.map(id => getQuestionById(id));
          const questionDetails = await Promise.all(questionPromises);
          setSbQ(questionDetails);
        };
        fetchQuestions().catch(console.error);
      }
    }, [subscribes, fetchSubscribed]);
  
    // Fetch asked questions
    useEffect(() => {
      if (fetchAsked) {
        const fetchQuestions = async () => {
          try {
            const questionDetails = await getQuestionByUser(user.username);
            if(questionDetails.message && questionDetails.message=="No questions found for this user."){
              setaskQ([]);
            }else{
              setaskQ(questionDetails)
            }
          } catch (error) {
            console.error("Failed to fetch questions:", error);
            setaskQ([]);
          }
        };
        fetchQuestions();
      }
    }, [user, fetchAsked]);
  
    // Fetch answers
    useEffect(() => {
      if (fetchAnswers) {
        const fetchAnswers = async () => {
          try {
            const answersDetails = await getAnswerByUser(user.username);
            if(answersDetails.message && answersDetails.message =="No answers found for this user."){
              setanswer([]);
            }
            else{
              setanswer(answersDetails)
            }
          } catch (error) {
            console.error("Failed to fetch answers:", error);
            setanswer([]);
          }
        };
        fetchAnswers();
      }
    }, [user, fetchAnswers]);


    
    //fetch voting history
    useEffect(() => {
      if (fetchVote) {
        console.log(user.username);
        const fetchVotes = async () => {
          try {
            const voteDetails = await getUserVoteHistory(user.username);
            if(voteDetails.message && voteDetails.message=="No votes found for this user."){
              setvote([])
            }else{
              const filteredVoteDetails = voteDetails.filter(vote => vote.question !== null);
              setvote(filteredVoteDetails);
            }
          } catch (error) {
            console.error("Failed to fetch votes:", error);
            setvote([]);
          }
        };
        fetchVotes();
      }
    }, [user, fetchVote]);


  
    return (
      <div>
        {fetchSaved && savedQ.map((q, idx) => (
          <Question key={idx} q={q} clickTag={clickTag} handleAnswer={handleAnswer} />
        ))}
        {fetchSubscribed && subscribeQ.map((s, idx) => (
          <Question key={idx} q={s} clickTag={clickTag} handleAnswer={handleAnswer} />
        ))}
        {fetchAsked && askedQ.map((a, idx) => (
          <Question key={idx} q={a} clickTag={clickTag} handleAnswer={handleAnswer} />
        ))}
        {fetchAnswers && answers.map((a, idx) => (
          <Answer key={idx} text={a.text} ansBy={a.ans_by} meta={getMetaData(new Date(a.ans_date_time))}/>
        ))}
        {fetchVote && voteQ.map((v, idx) => (
          <div className="vote_container" key={idx}>
            <div className="vote_status" key={idx}>{ v.value==1? "🔺":"🔻" }</div>
            <Question key={idx} q={v.question} clickTag={clickTag} handleAnswer={handleAnswer}/>
          </div>
        ))}
    </div>

    );
  };
  
  export default ProfileActivity;
  
