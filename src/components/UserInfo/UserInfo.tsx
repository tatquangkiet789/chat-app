import React from "react";
import style from "./UserInfo.module.css"

interface Props {
    userInfo: User;
    setReceiverID: (receiverID: string) => void;
}

const UserInfo: React.FC<Props> = ({userInfo, setReceiverID}) => {
    const handleGetReceiverID = () => {
        setReceiverID(userInfo.uid);
    }

    return (
        <div onClick={handleGetReceiverID} className={style.container}>
            <img className={style.userImg} src={userInfo.photoURL} height="60" width="60" alt="User" />
            <div className={style.userInfo}>
                <h5 className={style.userName}>{userInfo.displayName}</h5>
                <h5 className={style.userEmail}>{userInfo.email}</h5>
            </div>
        </div>
    );
}

export default UserInfo;