import "./index.css";
import { useState } from "react";
import SideBarNav from "./sideBarNav";
import QuestionPage from "./questionPage";
import TagPage from "./tagPage";
import AnswerPage from "./answerPage";
import NewQuestion from "./newQuestion";
import NewAnswer from "./newAnswer";
import Register from "./register"
import Login from "./login";
import SavePage from "./savePage";
import ProfilePage from "./profilePage";


const Main = ({ user,page="home",search = "", setQuesitonPage,title,setPage,fetchUser}) => {
    const [questionOrder, setQuestionOrder] = useState("newest");
    const [qid, setQid] = useState("");

    let selected = "";
    let content = null;

    const handleQuestions = () => {    
        setQuesitonPage()
        fetchUser()
        setPage("home");
    };

    // const handleProfile = () => {
    //     fetchUser();
    //     setPage("profile");
    // };


    const handleTags = () => {
        setPage("tag");
    };

    const handleAnswer = (qid) => {
        setQid(qid);
        setPage("answer");
    };

    const handleSave = (qid) =>{
        setQid(qid);
        fetchUser();
        setPage("save");
    }

    const clickTag = (tname) => {
        setQuesitonPage("[" + tname + "]", tname);
        setPage("home");
    };

    const handleNewQuestion = () => {
        setPage("newQuestion");
    };

    const handleNewAnswer = () => {
        setPage("newAnswer");
    };

    const getQuestionPage = (order = "newest", search = "") => {
        return (
            <QuestionPage
                title_text={title}
                order={order}
                search={search}
                questionOrder={questionOrder}
                setQuestionOrder={setQuestionOrder}
                clickTag={clickTag}
                setPage={setPage}
                handleAnswer={handleAnswer}
                handleNewQuestion={handleNewQuestion}
            />
        );
    };

    switch (page) {
        case "home": {
            selected = "q";
            content = getQuestionPage(questionOrder.toLowerCase(), search);
            break;
        }

        case "profile":{
            selected = "";
            content = (
                <ProfilePage
                    user={user}
                    clickTag={clickTag}
                    handleAnswer={handleAnswer}


                />
            );
            break;
        }

        case "register":{
            selected = "";
            content = <Register setPage={setPage}/>;
            break;
        }
        case "login":{
            selected = "";
            content = <Login handleQuestions={handleQuestions}/>;
            break;
        }
        case "tag": {
            selected = "t";
            content = (
                <TagPage
                    clickTag={clickTag}
                    handleNewQuestion={handleNewQuestion}
                />
            );
            break;
        }
        case "answer": {
            selected = "";
            content = (
                <AnswerPage
                    user={user}
                    qid={qid}
                    handleNewQuestion={handleNewQuestion}
                    handleNewAnswer={handleNewAnswer}
                    handleSave={handleSave}
                    setPage={setPage}
                    fetchUser={fetchUser}
                />
            );
            break;
        }
        case "newQuestion": {
            selected = "";
            content = <NewQuestion handleQuestions={handleQuestions} setPage={setPage} />;
            break;
        }
        case "newAnswer": {
            selected = "";
            content = <NewAnswer qid={qid} handleAnswer={handleAnswer} setPage={setPage}/>;
            break;
        }
        case "save" :{
            selected ="";
            content = <SavePage user={user} qid={qid} handleAnswer={handleAnswer}/>
            break;
        }
        default:
            selected = "q";
            content = getQuestionPage();
            break;
    }

    return (
        <div id="main" className="main">
            <SideBarNav
                selected={selected}
                handleQuestions={handleQuestions}
                handleTags={handleTags}
            />
            <div id="right_main" className="right_main">
                {content}
            </div>
        </div>
    );
};

export default Main;

