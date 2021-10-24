import React, { useState, useEffect, useRef, MutableRefObject, FormEvent, useContext } from 'react'
import { db } from '../../firebase';
import firebase from 'firebase';
import "./ChatWindow.css";
import { UserContext } from '../Context/UserProvider';
import ChatList from '../ChatList/ChatList';
import Navbar from '../Navbar/Navbar';
import Message from '../Message/Message';
import ReceiverInfo from '../ReceiverInfo/ReceiverInfo';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiverID, setReceiverID] = useState<string>("");
    const messageNameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const dummyMesseage = useRef() as MutableRefObject<HTMLDivElement>
    const user = useContext<User>(UserContext); 

    //Lấy dữ liệu từ Firestore ở Firebase
    useEffect(() => {
        if(db && receiverID !== "") {
            const unsub = db.collection('messages')
            .where('senderID', 'in', [user.uid, receiverID])
            .orderBy('created').limit(50)
            .onSnapshot(snapShot => {
                const temp: Message[] = [];
                //Nên tối ưu lại khúc trả Messages
                snapShot.docs.forEach(doc => {
                    if((doc.data().senderID === user.uid && doc.data().receiverID === receiverID) || 
                        (doc.data().senderID === receiverID && doc.data().receiverID === user.uid)) {
                        temp.push({ 
                            uid: doc.id, 
                            text: doc.data().text, 
                            senderID: doc.data().senderID, 
                            receiverID: doc.data().receiverID,
                            senderPhoto: doc.data().senderPhoto
                        }); 
                    }
                }) 
                setMessages(temp);
                //Dùng để tự động scroll down tới mesage mới nhất
                dummyMesseage.current.scrollIntoView({behavior: "smooth"});
            })
            //Dọn dẹp sự kiện onSnapShot
            return () => {
                unsub();
            }
        }
    }, [receiverID]);

    //Thêm message vào Firestore
    const handleAddMessage = (e: FormEvent<HTMLFormElement>) => {
        try {
            const name = messageNameRef.current.value;
            if(name === "" && receiverID === "")
                return;
            else {
                e.preventDefault();
                if(receiverID) {
                    db.collection('messages').add({
                        text: name,
                        senderID: user.uid,
                        receiverID: receiverID,
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        senderPhoto: user.photoURL
                    });
                }
                messageNameRef.current.value = "";          
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
                    <div>
                        <ReceiverInfo receiverID={receiverID} />
                    </div>
                    <div className="messages">
                        {messages.map(msg => {
                            return <Message key={msg.uid} message={msg}/>
                        })}
                        <div ref={dummyMesseage}></div>
                    </div>
                        
                    <form className="send-box" onSubmit={handleAddMessage}>
                        <input className="send-bar" type="text" ref={messageNameRef} placeholder="Type your message here....." />
                        <button className="send-button" type="submit">🕊️</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow;