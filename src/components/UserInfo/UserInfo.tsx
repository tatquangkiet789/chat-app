import React from "react";
//import style from "./UserInfo.module.css"

interface Props {
    userInfo: User
}

const UserInfo: React.FC<Props> = ({userInfo}) => {
    return (
        <div>
            <h5>{userInfo.uid}</h5>
            <h5>{userInfo.displayName}</h5>
            <h5>{userInfo.email}</h5>
            <img src={userInfo.photoURL} height="60" width="60" alt="User" />
        </div>
    );
}

export default UserInfo;