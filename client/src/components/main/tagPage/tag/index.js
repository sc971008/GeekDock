import "./index.css";

const Tag = ({ t, clickTag }) => {
    return (
        <div className="col-10 col-sm-6 col-md-4 col-lg-3 py-2 ms-2 border shadow-sm rounded"
        >
            <button id="tagName"
                className="btn btn-sm font-monospace border shadow-sm mb-2"
                onClick={() => { clickTag(t.name); }}>
                {t.name}
            </button>

            <div className="text-secondary" style={{fontSize: "12px"}}>{t.qcnt} questions</div>
        </div>
    );
};

export default Tag;
