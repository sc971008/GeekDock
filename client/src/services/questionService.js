import { REACT_APP_API_URL, api } from "./config";

const QUESTION_API_URL = `${REACT_APP_API_URL}/question`;


const getQuestionsByFilter = async (order = "newest", search = "") => {
    const res = await api.get(
        `${QUESTION_API_URL}/getQuestion?order=${order}&search=${search}`
    );

    return res.data;
};

const getQuestionById = async (qid) => {
    const res = await api.get(`${QUESTION_API_URL}/getQuestionById/${qid}`);

    return res.data;
};

const getQuestionByUser = async (username) => {
    const res = await api.get(`${QUESTION_API_URL}/getQuestionByUser/${username}`);

    return res.data;
};




// To add Questions
const addQuestion = async (q) => {
    const res = await api.post(`${QUESTION_API_URL}/addQuestion`, q);
    return res.data;
};


export { getQuestionsByFilter, getQuestionById, getQuestionByUser, addQuestion};

