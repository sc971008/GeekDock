import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";
import Main from "./main";
import { getUser } from "../services/userService";


export default function GeekDock() {
    const [search, setSearch] = useState("");
    const [mainTitle, setMainTitle] = useState("Newest Questions");
    const [page, setPage] = useState("home");
    const [login, setLogin] = useState(null);
    const [user, setUser] = useState(null)
    const [visual, setVisual] = useState("")

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        const res = await getUser()
        console.log("Fetched user:", res)
        if (res && res._id) {
            setUser(res)
            setLogin(true)
        } else {
            setUser(null)
            setLogin(false)
        }
    }

    const setQuesitonPage = (search = "", title = "Newest Questions") => {
        setSearch(search);
        setMainTitle(title);
        setPage("questions");
    };


    return (
        <div className="overflow-auto flex-grow-1 bg-body bg-body-tertiary" data-bs-theme={visual}>
            <Header
                user={user}
                search={search}
                setQuesitonPage={setQuesitonPage}
                setPage={setPage}
                setLogin={setLogin}
                login={login}
            />
            <Main
                user={user}
                page={page}
                search={search}
                title={mainTitle}
                setPage={setPage}
                setUser={setUser}
                setLogin={setLogin}
                fetchUser={fetchUser}
                setQuesitonPage={setQuesitonPage}
            />
            <button id="visualToggleBtn" className="bd-mode-toggle btn btn-sm bg-secondary bg-opacity-25 position-fixed bottom-0 end-0 mb-3 me-3"  onClick={() => {
                if (visual === "dark") {
                    setVisual("light")
                } else {
                    setVisual("dark")
                }
            }}>{visual === "dark" ?  <i className="bi bi-brightness-high-fill"></i>: <i className="bi bi-moon-stars-fill"></i>}
            </button>
        </div>
    );
}
