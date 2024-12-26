import "./index.css";
import { useState } from "react";
import Form from "../../baseComponents/form";
import Input from "../../baseComponents/input";
import { getUser, createNewList, saveQuestionToList } from "../../../../services/userService";
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


// Header for the Answer page
const AnswerHeader = ({
    user,
    question,
    ansCount = 0,
    title,
    handleSubscribe,
    setPage,
    fetchUser }) => {
    const [subFeedback, setSubFeedBack] = useState(null)
    const [saveFeedback, setSaveFeedBack] = useState(null)
    const [modal, setModal] = useState(false);
    const [listname, setListname] = useState("")
    const [listnameErr, setListnameErr] = useState("")
    const [addListFeedback, setAddListFeedback] = useState("")
    const [saveTolistFeedback, setSaveToListFeedback] = useState("")
    const [listSelection, setListSelection] = useState(
        (user && user.save_lists && user.save_lists.length > 0) ? user.save_lists[0].name : '' // Handle undefined
    );
    const [askFeedBack, setAskFeedBack] = useState("")

    const toggle = () => setModal(!modal);


    const handleSaveModal = async () => {
        // Check if logged In
        const res = await getUser();
        if (res && res._id) {
            toggle()
        }
        else {
            setSaveFeedBack(" ⛔️ Not logged In ...Redirecting")
            setTimeout(() => { setPage("login") }, 1000)
        }
    }


    const handleNewQuestion = async () => {
        // Check if logged In
        const res = await getUser();
        if (res && res._id) {
            setPage("newQuestion")
        }
        else {
            setAskFeedBack(" ⛔️ Not logged In ...Redirecting")
            setTimeout(() => { setPage("login") }, 1000)
        }
    }

    const postSub = async () => {
        const res = await handleSubscribe(question._id);
        if (res && res._id) {
            setSubFeedBack(`✅️`)
        }
        else {
            if (res.message == 'User session not found') {
                setSubFeedBack(" ⛔️ Not logged In ...Redirecting")
                setTimeout(() => { setPage("login") }, 1000)
            }
            if (res.message == "Already subscribed to this question") {
                setSubFeedBack('✅️')
            }
            if (res.message == 'Subscription successful') {
                setSubFeedBack(`✅️`)
            }
        }
    }

    const postSave = async () => {
        const res = await saveQuestionToList(question._id, listSelection)
        if (res && res._id) {
            setSaveToListFeedback(`✅️ Added`)
        }
        else if (res.message == 'User session not found') {
            setSaveToListFeedback(" ⛔️ Not logged In ...Redirecting")
            setTimeout(() => { setPage("login") }, 1000)
        }
        else if (res.message == 'List already have this question') {
            setSaveToListFeedback("✅️ Already added")
        }
    }

    const postNewSaveList = async () => {
        let isValid = true;
        //Error Check
        if (!listname) {
            setListnameErr("Listname cannot be empty")
            isValid = false;
        }
        if (listname.length > 20) {
            setListnameErr("Listname cannot be more than 20 characters")
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const res = await createNewList(listname)
        if (res && res._id) {
            setAddListFeedback(`✅️ ${listname} added`);
            await fetchUser();
            setListSelection(listname)
        }
        else if (res.message == 'User session not found') {
            setAddListFeedback(" ⛔️ Not logged In ...Redirecting")
            setTimeout(() => { setPage("login") }, 1000)
        }
        else if (res.message == 'User.save_lists already have this list') {
            setAddListFeedback(`⛔️ ${listname} already exist`);
        }

    }

    return (
        <div id="answersHeader" className=" mb-3 ">
            <div id="first_level" className="d-flex justify-content-between">
                <div id="questionTitle" className="fs-3 w-75">{title || 'No Title'}</div>
                <div id="buttons" className="justify-content-between ms-auto text-end">
                    <button
                        className={`border btn btn-sm shadow-sm ms-1 mb-1`}
                        onClick={() => {
                            postSub()
                        }}
                    > {!subFeedback && `🔔`}{subFeedback}
                    </button>
                    <button
                        className={`border btn btn-sm shadow-sm ms-1 mb-1`}
                        onClick={() => {
                            handleSaveModal()
                        }}
                    >
                        {!saveFeedback && `💾`} {saveFeedback}
                    </button>
                    <button
                        className={`border btn btn-primary btn-sm shadow-sm opcity-50 ms-1 mb-1`}
                        onClick={() => {
                            handleNewQuestion();
                        }}
                    >
                        {!askFeedBack && `Ask Question`}{askFeedBack}
                    </button>
                </div>
            </div>
            <div id="second_level" className="d">
                <div className="ansCount">{ansCount} answers</div>
            </div>
            <Modal className="SaveModal" isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Save Question</ModalHeader>
                <ModalBody>
                    <div className="newList_container">
                        <Form>
                            <Input
                                title={"Create A New list"}
                                hint={"List Name: "}
                                id={"formListNameInput"}
                                mandatory={true}
                                val={listname}
                                setState={setListname}
                                err={listnameErr}
                            />
                            <button
                                className="greenbtn"
                                onClick={postNewSaveList}
                            >
                                Add List
                            </button>
                            <div>{addListFeedback}</div>
                        </Form>
                    </div>
                    {user && user.save_lists.length > 0 &&
                        <div className="listSelect_container">
                            <div className="select_title"> Chose A list to Save : {`  `}</div>
                            <select className="form-select" value={listSelection} onChange={(e) => setListSelection(e.target.value)}>
                                {user.save_lists.map((qlist, idx) => (
                                    <option key={idx} value={qlist.name} >{qlist.name}</option>
                                ))}
                            </select>
                            <Button className="saveB" color="primary" onClick={postSave}>
                                {!saveTolistFeedback && `Save`}{saveTolistFeedback}
                            </Button>
                        </div>}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
    );
};

export default AnswerHeader;
