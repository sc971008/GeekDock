import "./index.css";


const ProfileHeader = ({
    username,
    profilepic,
    lastseen,
}) => {
    return(
    <>
    <div className="basic">
        <div>
        <img src={profilepic || 'default_profile_photo_url_here'} alt="Profile" />
        <h1 className="usename">{username}</h1>
        </div>
            <div>Registeration Date: {lastseen}</div>
            </div>
            </>
);
    }

export default ProfileHeader;