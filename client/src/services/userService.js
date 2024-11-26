import { REACT_APP_API_URL, api } from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

// Resgiter user
const addUser = async(user) =>{
    const res = await api.post(`${USER_API_URL}/register`,user)
    return res.data
}

// Login user
const authUser = async(user) =>{
    const res = await api.post(`${USER_API_URL}/login`,user)
    return res.data
}

// get Current logged in User
const getUser = async() =>{
    const res = await api.get(`${USER_API_URL}/getSessionUser`)
    return res.data
}

const logoutUser = async() =>{
    const res = await api.post(`${USER_API_URL}/logout`)
    return res.data
}

const UsersubscribeQuestion = async(qid) =>{
    const res = await api.post(`${USER_API_URL}/subscribeQuestion`,{qid})
    console.log(res)
    return res.data
}

const createNewList = async(listName) => {
    try{
        const res = await api.post(`${USER_API_URL}/createNewList`,{listName})
        return res.data;
    }
    catch(err){
        console.log(err)
    }
}


const subscribedQuestionsWithNewAnswers = async (userId, lastCheck) => {
    const res = await api.get(`${USER_API_URL}/subscribedQuestionsWithNewAnswers?userId=${userId}&lastCheck=${lastCheck}`);
    return res.data;
};



const saveQuestionToList = async(qid,listName) =>{
    try{
        const res = await api.post(`${USER_API_URL}/saveQuestionToList`,{listName:listName,qid:qid})
        return res.data
    }
    catch(err){
        console.log(err)
    }
}


export{addUser,authUser,getUser,logoutUser,UsersubscribeQuestion, subscribedQuestionsWithNewAnswers, createNewList,saveQuestionToList}

