import { useState } from "react";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import { addUser } from "../../../services/userService";

const Register = ({setPage}) => {
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
    //helper function 
    const postUser = async() => {
        let isValid = true;
        resetHints()

        if(!username){
            setUserError("Username cannot be empty")
            isValid = false;
        }else if(username.length > 20){
            setUserError("Username cannot be more than 20 char")
            isValid = false;
        }else if(!username.match("^[A-Za-z0-9]+$")){
            setUserError("Username can only contains alphabet char")
            isValid = false;
        }

        if(!password){
            setPassError("Password cannot be empty")
            isValid = false;
        }else if(password.length < 10){
            setPassError("At least to be 10 char long")
            isValid = false;
        }else if(password.match("^[A-Za-z0-9]+$")){
            setPassError("Use at least 1 special char")
            isValid = false;
        }

        if(!isValid){
            return;
        }

        const user = {
            username:username,
            password:password,
            reg_date:new Date()
        }

        const res = await addUser(user)
 
        if(res && res._id){
            console.log(`User [${res.username}] added`)
            setGoodFeedback(`[${res.username}] Registerd sucessfully ....Redirecting to Log In`)
            setTimeout(() => {
                setPage('login');
            }, 2000);
        }else{
            setBadFeedback(res.message)
        }
    }

    return(
        <Form>
            <Input
                title={"Username"}
                hint={"Only aplhabet char and number, limit to 20 char or less"}
                id={"formUserInput"}
                val={username}
                setState={setUsername}
                err={userError}
            />
            <Input
                title={"Password"}
                hint={"Use strong password with at least 1 special char, mininum 10 char."}
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
                    Confirm to Register
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

export default Register