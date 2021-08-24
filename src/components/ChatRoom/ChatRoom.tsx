import React from 'react'
import { useState } from 'react';
import { db } from '../../firebase';
import MessageList from '../MessageList/MessageList';
import SignOut from '../SignOut/SignOut'
import { useEffect } from 'react';

const ChatRoom: React.FC = () => {
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        if(db) {
            const unsub = db.collection('messages').orderBy('createdAt').limit(25)
            .onSnapshot(query => {
                const data = query.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setMessages(data);
            })

            //Clean up
            return () => {
                unsub();
            }
        }
    }, [db])

    return (
        <div>
            <MessageList messages={messages} />
            <form action="">
                <input type="text" name="" id="" />
                <button>Send</button>
            </form>
            {console.log(messages)}
            <SignOut />
        </div>
    )
}

export default ChatRoom;