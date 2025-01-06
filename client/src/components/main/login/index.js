import { useState } from "react";
import { useRef } from "react";
import { authUser } from "../../../services/userService";
import FloatInput from "../baseComponents/floatingInput";




const Login = ({ setPage,setLogin,setUser}) => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [postFeeback, setPostFeedback] = useState("")
    const [loading, setLoading] = useState(false)

    const postUser = async (event) => {
        event.preventDefault()
        setPostFeedback("")
        setLoading(true)

        const user = {
            username: emailRef.current.value,
            password: passwordRef.current.value,
        }
        
        const res = await authUser(user)

        if (res && res._id) {
            console.log(`User ${res.username} logged in`);
            setUser(res)
            setLogin(true);
            setPage("home");
        } else {
            setPostFeedback(res.message);
            setLoading(false);
        }
        
    }


    return (
        <div className="container d-flex flex-column align-items-center py-4">
            <i className="fs-1 bi bi-braces-asterisk" style={{ color: "cornflowerblue" }} ></i>
            <form className="form-signin need-validation" onSubmit={postUser}>
                <h3 className="fw-normal" >Please sign in.</h3>
                <FloatInput
                    id="floatingInput"
                    label="Email address"
                    ref={emailRef}
                    type="email"
                    placeholder="email"
                />
                <FloatInput
                    id="floatingPassword"
                    label="Password"
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                />
                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">
                    {loading ? (
                        <div className="spinner-border text-light py-2" role="status">
                        </div>
                    ) : (
                        'Sign In')}</button>
                <div className="my-2 text-warning">{postFeeback}</div>
                {/* <p className="mt-5 mb-3 text-body-secondary">&copy; Cheng Shi Project</p> */}
            </form>
        </div>
    )
}

export default Login