import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../firebase';
import MessageList from '../MessageList/MessageList';
import SignOut from '../SignOut/SignOut'

const ChatRoom: React.FC = () => {
    const [messages, setMessages] = useState<message[]>([]);

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

    return (
        <div>
            <MessageList messages={messages} />
            <form action="">
                <input type="text" placeholder="Type your message here....." />
                <button>Send</button>
            </form>
            <SignOut />
        </div>
    )
}

export default ChatRoom;