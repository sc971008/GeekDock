import { REACT_APP_API_URL, api } from "./config";

const VOTE_API_URL = `${REACT_APP_API_URL}/vote`;


const voteQuestionById = async (voteReq) => {
    const res = await api.post(`${VOTE_API_URL}/voteQuestionById/`,voteReq);
    return res.data;
};


const getUserVoteHistory = async (username) => {
    const res = await api.get(`${VOTE_API_URL}/getUserVoteHistory/${username}`);
    return res.data;
};


export {getUserVoteHistory,voteQuestionById}