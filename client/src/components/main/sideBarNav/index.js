import "./index.css";

const SideBarNav = ({ selected = "", handleQuestions, handleTags }) => {
    return (
        <>
            <div id="sideBarNav" className="d-flex flex-column flex-shrink-0 p-1">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li
                        id="menu_question"
                        className={`nav-link ${selected === "q" ? "active" : "text-body"}`}
                        onClick={handleQuestions}
                    >
                        <i className="bi bi-patch-question-fill me-1"></i>
                        Questions
                    </li>
                    <li
                        id="menu_tag"
                        className={`nav-link ${selected === "t" ? "active" : "text-body"}`}
                        onClick={handleTags}
                    >   
                        <i className="bi bi-tag-fill me-1"></i>
                        Tags
                    </li>
                </ul>

            </div>
        </>
    );
};

export default SideBarNav;
