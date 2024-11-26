import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";
import Main from "./main";
import { getUser } from "../services/userService";

export default function FakeStackOverflow() {
    const [search, setSearch] = useState("");
    const [mainTitle, setMainTitle] = useState("All Questions");
    const [page, setPage] = useState("home");
    const [user,setUser] = useState(null)

    useEffect( () => {
        fetchUser()
     },[])

    const fetchUser = async() =>{
        const res = await getUser()
        if(res && res._id){
            setUser(res)
        }else{
            setUser(null)
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
                fetchUser={fetchUser}
            />
            <Main
                user={user}
                page={page}
                setPage={setPage}
                search={search}
                title={mainTitle}
                setQuesitonPage={setQuesitonPage}
                fetchUser={fetchUser}
            />
        </>
    );
}
