import React, { useState } from 'react';
import "./index.css";
import ProfileHeader from "./header";
import ProfileActivity from "./activity";
// import { getMetaData} from '../../../tool/index';

const ProfilePage = ({ user, clickTag, handleAnswer }) => {
    const [view, setView] = useState('summary');
    
    // Format the registration date to show only YYYY-MM-DD
    const formattedRegDate = new Date(user.reg_date).toISOString().split('T')[0];

    return (
      <>
      
        <ProfileHeader username={user.username} lastseen={formattedRegDate} profilepic={user.profile_pic_url} />
        <div className='header'>
          <button onClick={() => setView('summary')} className="optionName" >User Summary</button>
          <button onClick={() => setView('saved')} className="optionName">Saved Posts</button>
          <button onClick={() => setView('subscriptions')} className="optionName">Subscriptions</button>
          <button onClick={() => setView('asked')} className="optionName">Asked Questions</button>
          <button onClick={() => setView('answers')} className="optionName">Answers</button>
          <button onClick={() => setView('vote')} className="optionName">Votes</button>
</div>
        
        {view === 'summary' && <div><h1>User Summary</h1><p>Display summary information here...</p></div>}
        {view === 'saved' && <ProfileActivity user={user} saved={user.save_lists} clickTag={clickTag} handleAnswer={handleAnswer} fetchSaved />}
        {view === 'subscriptions' && <ProfileActivity user={user} subscribes={user.subscribes} clickTag={clickTag} handleAnswer={handleAnswer} fetchSubscribed />}
        {view === 'asked' && <ProfileActivity user={user} clickTag={clickTag} handleAnswer={handleAnswer} fetchAsked />}
        {view === 'answers' && <ProfileActivity user={user} clickTag={clickTag} handleAnswer={handleAnswer} fetchAnswers />}
        {view === 'vote' && <ProfileActivity user={user} clickTag={clickTag} handleAnswer={handleAnswer} fetchVote />}

      </>
    );
};

export default ProfilePage;

  