import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import style from "./UserInfoList.module.css";

interface Props {
    usersInfo: User[];
    setReceiverID: (receiverID: string) => void;
}

const UserInfoList: React.FC<Props> = ({usersInfo, setReceiverID}) => {

    return (
        <div className={style.container}>
            {usersInfo.map(userInfo => {
                return <UserInfo setReceiverID={setReceiverID} key={userInfo.uid} userInfo={userInfo} />
            })}
        </div>
    );
}

export default UserInfoList;