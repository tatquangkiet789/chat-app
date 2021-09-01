import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import UserInfoList from "../UserInfoList/UserInfoList";

const ChatList: React.FC = () => {
    const [usersInfo, setUsersInfo] = useState<User[]>([]);

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
        <div>
            <UserInfoList usersInfo={usersInfo} />
            {console.log(usersInfo)}
        </div>
    );
}

export default ChatList;