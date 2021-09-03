import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { db } from "../../firebase";
import { UserContext } from "../Context/UserProvider";
import UserInfoList from "../UserInfoList/UserInfoList";
import style from "./ChatList.module.css"

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

            //Clean up
            return () => {
                unsub();
            }
        }
    }, [])

    return (
        <div className={style.container}>
            <UserInfoList setReceiverID={setReceiverID} usersInfo={usersInfo.filter(user => user.uid !== currentUser.uid)} />
        </div>
    );
}

export default ChatList;