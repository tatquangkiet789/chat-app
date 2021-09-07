import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { db } from "../../firebase";
import { UserContext } from "../Context/UserProvider";
import UserInfo from "../UserInfo/UserInfo";
import "./ChatList.css"

interface Props {
    setReceiverID: (receiverID: string) => void;
}

const ChatList: React.FC<Props> = ({setReceiverID}) => {
    const [usersInfo, setUsersInfo] = useState<User[]>([]);
    const currentUser = useContext<User>(UserContext);

    useEffect(() => {
        if(db) {
            const unsub = db.collection('users')
            .onSnapshot(snapshot => {
                setUsersInfo(snapshot.docs.map(doc => ({
                    uid: doc.data().uid,
                    displayName: doc.data().displayName,
                    photoURL: doc.data().photoURL,
                    email: doc.data().email
                })));
            })
            //Dọn dẹp sự kiện onSnapShot
            return () => {
                unsub();
            }
        }
    }, [])

    return (
        <div className="chat-list-container">
            {usersInfo.filter(user => user.uid !== currentUser.uid).map(userInfo => {
                return <UserInfo setReceiverID={setReceiverID} key={userInfo.uid} userInfo={userInfo} />
            })}
        </div>
    );
}

export default ChatList;