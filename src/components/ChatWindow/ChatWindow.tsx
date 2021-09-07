import React, { useState, useEffect, useRef, MutableRefObject, FormEvent, useContext } from 'react'
import { db } from '../../firebase';
import firebase from 'firebase';
import "./ChatWindow.css";
import { UserContext } from '../Context/UserProvider';
import ChatList from '../ChatList/ChatList';
import Navbar from '../Navbar/Navbar';
import Message from '../Message/Message';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiverID, setReceiverID] = useState<string>("");
    const messageNameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const dmmyMesseage = useRef() as MutableRefObject<HTMLDivElement>
    const user = useContext<User>(UserContext);
    const test: string[] = [user.uid, receiverID];

    //Lấy dữ liệu từ Firestore ở Firebase
    useEffect(() => {
        if(db) {
            const unsub = db.collection('messages')
            .where('usersInvolve', 'array-contains', test)
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    uid: doc.id,
                    text: doc.data().text,
                    senderID: doc.data().senderID,
                    usersInvolve: doc.data().usersInvolve
                })))
            })
            //Dọn dẹp sự kiện onSnapShot
            return () => {
                unsub();
            }
        }
    }, [])

    //Thêm message vào Firestore
    const handleAddMessage = async (e: FormEvent<HTMLFormElement>) => {
        try {
            const name = messageNameRef.current.value;
            if(name === "")
                return;
            else {
                e.preventDefault();
                if(receiverID) {
                    await db.collection('messages').add({
                        text: name,
                        senderID: user.uid,
                        usersInvolve: test,
                        created: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }
                messageNameRef.current.value = "";
                //Dùng để tự động scroll down tới mesage mới nhất
                dmmyMesseage.current.scrollIntoView({behavior: 'smooth'});
            }
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="chat-room">
            <div>
                <Navbar />
            </div>
            <div className="chat-container">
                <div className="chat-list">
                    <ChatList setReceiverID={setReceiverID} />
                </div>
                <div className="chat-window">
                    <div className="messages">
                        {messages.map(msg => {
                            return <Message key={msg.uid} message={msg}/>
                        })}
                        <div ref={dmmyMesseage}></div>
                    </div>
                    <div ref={dmmyMesseage}></div>
                    <form className="send-box" onSubmit={handleAddMessage}>
                        <input className="send-bar" type="text" ref={messageNameRef} placeholder="Type your message here....." />
                        <button className="send-button" type="submit">Send</button>
                    </form>
                </div>
            </div>
            {console.log(receiverID)}
            {console.log(test)}
        </div>
    )
}

export default ChatWindow;