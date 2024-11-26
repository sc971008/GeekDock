import React,{ useEffect, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
import "./index.css";
import { validateHyperlink } from "../../../tool";
import { addQuestion } from "../../../services/questionService";
import { getUser } from "../../../services/userService";
import { getTagsWithQuestionNumber } from "../../../services/tagService";

const NewQuestion = ({ handleQuestions,setPage }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
  
    const [titleErr, setTitleErr] = useState("");
    const [textErr, setTextErr] = useState("");
    const [tagErr, setTagErr] = useState("");
    const [userErr,setUserErr] =useState("")
    const [tagOptions,SetTagOptions] = useState([])
    const [tagSelections,setTagSelections] = useState([])
    var Filter= require('bad-words');
    var customFilter = new Filter({ placeHolder: 'x'});

    useEffect(()=>{
        fetchTag()
    },[])
    

    const fetchTag = async() => {
        const taglist = await getTagsWithQuestionNumber()
        if(taglist.length){
            let tagOptionsTemp = []
            await taglist.map((tag)=> tagOptionsTemp.push({value:tag.name,label:tag.name}))
            SetTagOptions(tagOptionsTemp)
        }
        console.log(tagOptions)
    }

    const postQuestion = async () => {
        let isValid = true;

         //if not logged in
         const user = await getUser();
         if (!user || !user._id) {
             setUserErr(" ⛔️ Not logged In ...Redirecting")
             setTimeout(() => { setPage("login") }, 1000)
         }

        if (!title) {
            setTitleErr("Title cannot be empty");
            isValid = false;
        } else if (title.length > 100) {
            setTitleErr("Title cannot be more than 100 characters");
            isValid = false;
        }

        if (!text) {
            setTextErr("Question text cannot be empty");
            isValid = false;
        }

        // Hyperlink validation
        if (!NewQuestion.validateHyperlink(text)) {
            setTextErr("Invalid hyperlink format.");
            isValid = false;
        }

        // let tags = tag.split(" ").filter((tag) => tag.trim() !== "");
        let tags = tagSelections.map((t)=>t.value)
        if (tags.length === 0) {
            setTagErr("Should have at least 1 tag");
            isValid = false;
        } else if (tags.length > 5) {
            setTagErr("Cannot have more than 5 tags");
            isValid = false;
        }

        for (let tag of tags) {
            if (tag.length > 20) {
                setTagErr("New tag length cannot be more than 20");
                isValid = false;
                break;
            }
        }


        if (!isValid) {
            return;
        }

        const question = {
            title: customFilter.clean(title),
            text: customFilter.clean(text),
            tags: tags,
            asked_by: user.username,
            ask_date_time: new Date(),
        };

        const res = await NewQuestion.addQuestion(question);
        if (res && res._id) {
            handleQuestions();
        }
    };



    return (
        <Form>
            <Input
                title={"Question Title"}
                hint={"Limit title to 100 characters or less"}
                id={"formTitleInput"}
                val={title}
                setState={setTitle}
                err={titleErr}
            />
            <Textarea
                title={"Question Text"}
                hint={"Add details"}
                id={"formTextInput"}
                val={text}
                setState={setText}
                err={textErr}
            />
            <div className="input_title">Tag*</div>
            <div className="input_hint">Select 1 to 5 tags or create your own</div>
            <CreatableSelect
                value={tagSelections}
                name="Tags"
                options={tagOptions}
                id={"formTagInput"}
                isMulti
                isClearable
                onChange={(options) => setTagSelections(options)}
            />
            <div className="input_error">{tagErr}</div>

            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={postQuestion}
                >
                    {!userErr ? 'Post Question' : userErr}
                </button>
                <div className="mandatory_indicator">* indicates mandatory fields</div>
            </div>
        </Form>
    );
};

NewQuestion.addQuestion = addQuestion
NewQuestion.validateHyperlink = validateHyperlink
export default NewQuestion;
