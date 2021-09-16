import React from "react";
import "./UserInfo.css"

interface Props {
    userInfo: User;
    setReceiverID: (receiverID: string) => void;
}

const UserInfo: React.FC<Props> = ({userInfo, setReceiverID}) => {
    const handleGetReceiverID = () => {
        setReceiverID(userInfo.uid);
    }

    return (
        <div onClick={handleGetReceiverID} className="user-container">
            <img className="user-image" src={userInfo.photoURL} alt="User" />
            <div className="user-info">
                <h5 className="user-name">{userInfo.displayName}</h5>
                <h5 className="user-email">{userInfo.email}</h5>
            </div>
        </div>
    );
}

export default UserInfo;