import { useState } from "react";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import { authUser } from "../../../services/userService";

const Login = ({handleQuestions}) => {
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[goodfeedback,setGoodFeedback] = useState(null)
    const[badfeedback,setBadFeedback] = useState(null)

    const[userError,setUserError] = useState("")
    const[passError,setPassError] = useState("")

    const resetHints = () =>{
        setPassError("")
        setUserError("")
        setGoodFeedback(null)
        setBadFeedback(null)
    }

    const postUser = async()=>{
        let isValid = true;
        resetHints()

        if(!username){
            setUserError("Username cannot be empty")
            isValid = false;
        }
        if(!password){
            setPassError("Password cannot be empty")
            isValid = false;
        }
        if(!isValid){
            return;
        }

        const user = {           
            username:username,
            password:password,
        }

        const res = await authUser(user)

        if(res && res._id){
            console.log(`User ${res.username} logged in`)
            setGoodFeedback(`${res.username} Log In sucessfully ....Redirecting To HomePage`)
            setTimeout(() => {
                handleQuestions()
            }, 1200);
        }else{
            setBadFeedback(res.message)
        }

    }

    return(
        <Form>
            <Input
                title={"Username"}
                hint={""}
                id={"formUserInput"}
                val={username}
                setState={setUsername}
                err={userError}
            />
            <Input
                title={"Password"}
                hint={""}
                id={"formPassInput"}
                val={password}
                setState={setPassword}
                err={passError}
            />

            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={() => {
                        postUser();
                    }}
                >
                    Log In
                </button>
                <div className="mandatory_indicator">
                    * indicates mandatory fields
                </div>
            </div>
            {goodfeedback && <div className="goodfeedback">{goodfeedback}</div>}
            {badfeedback && <div className="badfeedback">{badfeedback}</div>}
        </Form>
    )
}

export default Login