import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import style from "./UserInfoList.module.css";

interface Props {
    usersInfo: User[]
}

const UserInfoList: React.FC<Props> = ({usersInfo}) => {
    return (
        <div className={style.container}>
            {usersInfo.map(userInfo => {
                return <UserInfo key={userInfo.uid} userInfo={userInfo} />
            })}
        </div>
    );
}

export default UserInfoList;