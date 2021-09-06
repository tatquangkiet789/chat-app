import React, { useState, useEffect, useRef, MutableRefObject, FormEvent, useContext } from 'react'
import { db } from '../../firebase';
import firebase from 'firebase';
import "./ChatWindow.css";
import { UserContext } from '../Context/UserProvider';
import MessageList from '../MessageList/MessageList';
import ChatList from '../ChatList/ChatList';
import Navbar from '../Navbar/Navbar';

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiverID, setReceiverID] = useState<string>();
    const messageNameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const user = useContext<User>(UserContext);

    useEffect(() => {
        if(db || receiverID) {
            const unsub = db.collection('messages').orderBy('created').limit(25)
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    uid: doc.id,
                    text: doc.data().text,
                    senderID: doc.data().senderID,
                    receiverID: doc.data().receiverID
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
                if(receiverID) {
                    await db.collection('messages').add({
                        text: name,
                        senderID: user.uid,
                        receiverID: receiverID,
                        created: firebase.firestore.FieldValue.serverTimestamp()
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
            <Navbar />
            <div className="chat-container">
                <div className="chat-list">
                    <ChatList setReceiverID={setReceiverID} />
                </div>
                <div className="chat-window">
                    <MessageList messages={messages} />
                    <form className="send-box" onSubmit={handleAddMessage}>
                        <input className="send-bar" type="text" ref={messageNameRef} placeholder="Type your message here....." />
                        <button className="send-button" type="submit">Send</button>
                    </form>
                </div>
                {console.log(receiverID)}
            </div>
        </div>
    )
}

export default ChatWindow;