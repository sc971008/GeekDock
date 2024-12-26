import "./index.css";

const SideBarNav = ({ selected = "", handleQuestions, handleTags,handleHome }) => {
    return (
        <>
            <div id="sideBarNav" className="d-flex flex-column flex-shrink-0 p-2 rounded-start">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li
                        id="menu_home"
                        className={`nav-link d-flex ${selected === "h" ? "active" : "text-body"} gap-2`}
                        onClick={handleHome}
                    >
                        <i className="bi bi-house-fill"></i>
                        <span className="d-none d-md-block">Home</span>
                    </li>
                    <li
                        id="menu_question"
                        className={`nav-link d-flex ${selected === "q" ? "active" : "text-body"} gap-2`}
                        onClick={handleQuestions}
                    >
                        <i className="bi bi-patch-question-fill "></i>
                        <span className="d-none d-md-block">Questions</span>
                    </li>
                    <li
                        id="menu_tag"
                        className={`nav-link d-flex ${selected === "t" ? "active" : "text-body"} gap-2`}
                        onClick={handleTags}
                    >
                        <i className="bi bi-tag-fill"></i>
                        <span className="d-none d-md-block">Tags</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SideBarNav;
