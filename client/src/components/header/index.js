import "./index.css";
import React, { useEffect, useState } from "react";
import { logoutUser } from "../../services/userService";
import { subscribedQuestionsWithNewAnswers } from "../../services/userService";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

// const Header = ({ user, search, setQuesitonPage, setPage, fetchUser }) => {
//   const [val, setVal] = useState(search);



const Header = ({ user, search, setQuesitonPage, setPage, fetchUser }) => {
  const [val, setVal] = useState(search);
  const [subModal, setSubModal]= useState(false);
  const [subscribeQuestions, setSubscribedQuestions]= useState([]);
  const [lastCheck, setLastCheck] = useState(new Date('2001-03-22T21:17:53'));
  const [notificationIcon, setNotificationIcon]= useState("💌");

  const toggleSubModal =() => setSubModal(!subModal);

  // const handleSubModal =async() => {
  //   if (!user || !user._id){
  //     setPage("login");
  //     return;
  //   }
  //   try{
  //     const data=await subscribedQuestionsWithNewAnswers(user._id, lastCheck);
  //     // setLastCheck(Date.now());
  //     setSubscribedQuestions(data);
  //     setNotificationIcon("💌");
  //     toggleSubModal();
  //   } catch (err){
  //     console.error("Error fetching subscribed questions", err);
  //   }
  // };

  // Handle the subscribed questions modal
const handleSubModal = async () => {
  if (!user || !user._id) {
    setPage("login");
    return;
  }

  try {
    // Fetch subscribed questions with new answers, without updating lastCheck yet
    const data = await subscribedQuestionsWithNewAnswers(user._id, lastCheck);
    
    setSubscribedQuestions(data);
    
    if (data.length > 0) {
      setNotificationIcon("📥");  // Change to inbox if there are new updates
    } else {
      setNotificationIcon("💌");  // No new updates
    }

    // Only update lastCheck after successful response handling
    setLastCheck(Date.now());

    toggleSubModal();  // Open the modal with the fetched data
  } catch (err) {
    console.error("Error fetching subscribed questions", err);
  }
};


  // useEffect(() => {
  //   const checkForUpdates = async () => {
  //     if (!user || !user._id) return;

  //     const data = await subscribedQuestionsWithNewAnswers(user._id, lastCheck);

  //     if (data.length > 0) {
  //       setNotificationIcon("📥");  // Show inbox icon if there are updates
  //     }
  //   };

  //   checkForUpdates();
  // }, [user, lastCheck]);

  useEffect(() => {
    const checkForUpdates = async () => {
      if (!user || !user._id) return;
  
      try {
        // Fetch subscribed questions with the last check time
        const data = await subscribedQuestionsWithNewAnswers(user._id, lastCheck);
  
        if (data.length > 0) {
          setNotificationIcon("📥");  // Show inbox if there are updates
        } else {
          setNotificationIcon("💌");  // No updates
        }
      } catch (err) {
        console.error("Error checking for updates", err);
      }
    };
  
    checkForUpdates();  // Trigger the check for updates
  }, [user, lastCheck]);
  

  

  return (
    <div id="header" className="header">
      <div></div>
      <div
        className="title"
        onClick={() => {
          setQuesitonPage();
          setPage("home");
        }}
      >
        {" "}
        ⍍ Stack Over Flow{" "}
      </div>
      <input
        id="searchBar"
        placeholder="Search ..."
        type="text"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setQuesitonPage(e.target.value, "Search Results");
          }
        }}
      />
      {!(user && user._id) && (
        <div className="userSection">
          <button
            className="greenbtn"
            onClick={() => {
              setPage("register");
            }}
          >
            New User
          </button>
          <button
            className="greenbtn"
            onClick={() => {
              setPage("login");
            }}
          >
            Log In
          </button>
        </div>
      )}

 {(user && user._id) && (
            <div>
                Hello! {' '}
                <button className= "userinbox" onClick={()=> {setPage("profile")}}>🧜🏼 [ {user.username} ]{' '}</button>
                <button className= "userinbox" onClick={handleSubModal}>{notificationIcon}</button>

                <button
                    className="greenbtn"              
                    onClick={() => {
                            logoutUser()
                            fetchUser()
                            setPage("home")
                        }}
                >
                    Log Out
                </button>
            </div>)}

            <Modal className="subModal" isOpen={subModal} toggle={toggleSubModal}>
              <ModalHeader toggle={toggleSubModal}>
                        Inbox
              </ModalHeader>

              <ModalBody>
                      {subscribeQuestions.length>0 ? (
                        <ul>
                          {subscribeQuestions.map((question)=>(
                            <li
                            key={question._id}
                            onClick={()=>{
                              setQuesitonPage(question._id);
                              toggleSubModal();
                            }}>
                              {question.title}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p> No new updates.</p>
                      )}

              </ModalBody>


            </Modal>

    </div>
  );
};

export default Header;
