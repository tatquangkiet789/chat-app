import React from "react";
import Message from "../Message/Message";
import "./MessageList.css";

interface Props {
    messages: Message[]
}

const MessageList: React.FC<Props> = ({messages}) => {
    return (
        <div className="messages-container">
            <div className="messages">
                {messages.map(msg => {
                    return <Message key={msg.uid} message={msg}/>
                })}
            </div>
        </div>
    );
}

export default MessageList;