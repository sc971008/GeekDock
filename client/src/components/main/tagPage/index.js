import { useEffect, useState } from "react";
import "./index.css";
import Tag from "./tag";
import { getTagsWithQuestionNumber } from "../../../services/tagService";

const TagPage = ({ clickTag, handleNewQuestion,visual}) => {
    const [tlist, setTlist] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let res = await getTagsWithQuestionNumber();
            setTlist(res || []);
        };

        fetchData().catch((e) => console.log(e));
    }, []);
    return (
        <div id="tagPage" className={`bg-${visual==='dark'?'dark':'body'} d-flex flex-column rounded p-4 `}>
            <div id="left side" className="d-flex justify-content-between mb-3 align-items-center">
                <div id="Tag title "className="fs-4">All Tags</div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        handleNewQuestion();
                    }}
                >
                    Ask a Question
                </button>
            </div>
            <h6 className="w-75 mb-3 text-secondary" style={{fontSize: "12px"}}>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</h6>
            <div id="right side" className="d-flex justify-content-between">
                <div className="text-secondary">{tlist.length} Tags</div>
            </div>
            <div id="tagList" className="mt-2 row gap-3">
                {tlist.map((t, idx) => (
                    <Tag key={idx} t={t} clickTag={clickTag} />
                ))}
            </div>
        </div>
    );
};

export default TagPage;
