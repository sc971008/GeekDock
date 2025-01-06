import { useRef, useState } from "react";
import { addAnswer } from "../../../services/answerService";
import { getUser } from "../../../services/userService"
import FloatInput from "../baseComponents/floatingInput";
const NewAnswer = ({ qid, handleAnswer, setPage }) => {

    const textRef = useRef(null)
    const [textErr, setTextErr] = useState("");
    const [loading, setLoading] = useState(false)

    const postAnswer = async (event) => {
        event.preventDefault()
        setTextErr("")
        setLoading(true)

        //if not logged in
        const user = await getUser();
        if (!user || !user._id) {
            setTextErr(" ⛔️ Not logged In ...Redirecting")
            setTimeout(() => { setPage("login") }, 1000)
        }

        const answer = {
            text: textRef.current.value,
            ans_by: user.username,
            ans_date_time: new Date(),
        };

        console.log(answer)

        const res = await addAnswer(qid, answer);
        if (res && res._id) {
            handleAnswer(qid);
        } else {
            setTextErr(res.message);
            setLoading(false);
        }
    };
    return (
        <div className="container d-flex flex-column align-items-center py-4">
            <form className="form-signin need-validation w-75" onSubmit={postAnswer}>
                <h3 className="fw-normal" >Type your anwser here.</h3>
                <FloatInput
                    id="floatingInput"
                    label="Anwser"
                    ref={textRef}
                    type="text"
                    placeholder="Type your anwser here."
                />
                <button className="btn btn-primary py-2 mt-2 " type="submit">
                {loading ? (
                    <div className="spinner-border text-light py-2" role="status">
                    </div>
                ) : (
                    'Submit')}
                </button>
            </form>
            <div className="my-2 text-warning">{textErr}</div>
        </div>
    );
};

export default NewAnswer;
