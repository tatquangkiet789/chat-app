import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { db } from "../../firebase";
import { UserContext } from "../Context/UserProvider";
import UserInfoList from "../UserInfoList/UserInfoList";
import style from "./ChatList.module.css"

const ChatList: React.FC = () => {
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

            //Clean up
            return () => {
                unsub();
            }
        }
    }, [])

    const handleGetUserUid = (receiverID: string) => {
        console.log(receiverID);
    }

    return (
        <div className={style.container}>
            <UserInfoList usersInfo={usersInfo.filter(user => user.uid !== currentUser.uid)} />
            {console.log(usersInfo)}
        </div>
    );
}

export default ChatList;