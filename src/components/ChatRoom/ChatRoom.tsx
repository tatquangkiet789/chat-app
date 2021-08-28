import React, { useState, useEffect, useRef, MutableRefObject, FormEvent } from 'react'
import { db } from '../../firebase';
import MessageList from '../MessageList/MessageList';
import SignOut from '../SignOut/SignOut'
import firebase from 'firebase';

const ChatRoom: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const messageNameRef = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if(db) {
            const unsub = db.collection('messages').orderBy('created').limit(25)
            .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    uid: doc.id,
                    text: doc.data().text
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
        <div>
            <MessageList messages={messages} />
            <form onSubmit={handleAddMessage}>
                <input type="text" ref={messageNameRef} placeholder="Type your message here....." />
                <button type="submit">Send</button>
            </form>
            <SignOut />
        </div>
    )
}

export default ChatRoom;