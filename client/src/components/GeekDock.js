import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";
import Main from "./main";
import { getUser } from "../services/userService";


export default function GeekDock() {
    const [search, setSearch] = useState("");
    const [mainTitle, setMainTitle] = useState("All Questions");
    const [page, setPage] = useState("home");
    const [login, setLogin] = useState(null);
    const [user,setUser] = useState(null)

    useEffect(() => {
        fetchUser()
     },[])

    const fetchUser = async() =>{
        const res = await getUser()
        if(res && res._id){
            setUser(res)
            setLogin(true)
        }else{
            setUser(null)
            setLogin(false)
        }
    }

    const setQuesitonPage = (search = "", title = "All Questions") => {
        setSearch(search);
        setMainTitle(title);
    };


    return (
        <>
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
        </>
    );
}
