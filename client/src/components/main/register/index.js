import { useState } from "react";
import { addUser } from "../../../services/userService";
import FloatInput from "../baseComponents/floatingInput";

const Register = ({ setPage }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [postFeeback, setPostFeedback] = useState("")
    const [loading, setLoading] = useState(false)


    //helper function 
    const postUser = async () => {
        event.preventDefault()
        setPostFeedback("")
        setLoading(true)

        const user = {
            username: email,
            password: password,
            reg_date: new Date()
        }

        const res = await addUser(user)

        if (res && res._id) {
            console.log(`User [${res.username}] added`)
            setPostFeedback(`[${res.username}] Register sucessfully ! \n ...Redirecting to Log In`)
            setTimeout(() => {
                setPage('login');
            }, 2000);
        } else {
            setPostFeedback(res.message)
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center py-4  w-100 m-auto">
            <i className="fs-1 bi bi-braces-asterisk mx-2" style={{ color: "cornflowerblue" }} ></i>
            <form className="form-signin need-validation" onSubmit={postUser}>
                <h1 className="h3 mb-3 fw-normal" >Join the Dock now.</h1>
                <h3 className="text-secondary" style={{fontSize: "12px"}}> By clicking “Sign up”, you agree to our terms of service and acknowledge you have read our privacy policy.</h3>
                    <FloatInput
                    id="floatingInput"
                    label="Email address"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="email"
                />
                <FloatInput
                    id="floatingPassword"
                    label="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="Password"
                />
                <button className="my-2 btn btn-primary w-100 py-2" type="submit">
                    {loading ? (
                        <div className="spinner-border text-light py-2" role="status">
                        </div>
                    ) : (
                        'Sign Up')}</button>
                <div className="my-2 text-warning">{postFeeback}</div>
                {/* <p className="mt-5 mb-3 text-body-secondary">&copy; Cheng Shi Project</p> */}
            </form>
        </div>
    )
}

export default Register