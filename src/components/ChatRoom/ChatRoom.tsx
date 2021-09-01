import React, { useState, useEffect, useRef, MutableRefObject, FormEvent, useContext } from 'react'
import { db } from '../../firebase';
import MessageList from '../MessageList/MessageList';
import firebase from 'firebase';
import ChatList from '../ChatList/ChatList';
import style from "./ChatRoom.module.css";
import { UserContext } from '../UserContext/UserProvider';
import SignOut from '../SignOut/SignOut';

const ChatRoom: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messageNameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const user = useContext<User>(UserContext);

    useEffect(() => {
        if(db) {
            const unsub = db.collection('messages').orderBy('created').limit(25)
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    uid: doc.id,
                    text: doc.data().text,
                    senderID: user.uid
                })))
            })
            //Clean up
            return () => {
                unsub();
            } 
        }
    }, [])

    const handleAddMessage = async (e: FormEvent<HTMLFormElement>) => {
        try {
            const name = messageNameRef.current.value;
            if(name === "")
                return;
            else {
                e.preventDefault();
                await db.collection('messages').add({
                    text: name,
                    created: firebase.firestore.FieldValue.serverTimestamp()
                });
                messageNameRef.current.value = "";
            }
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <div className={style.container}>
            <ChatList />
            <div className={style.chatWindow}>
                <MessageList messages={messages} />
                <form className={style.sendBox} onSubmit={handleAddMessage}>
                    <input className={style.sendBar} type="text" ref={messageNameRef} placeholder="Type your message here....." />
                    <button className={style.sendButton} type="submit">Send</button>
                </form>
            </div>
            <SignOut />
            {console.log(user)}
        </div>
    )
}

export default ChatRoom;