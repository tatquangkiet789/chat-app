import React from "react";
import Message from "../Message/Message";

interface Props {
    messages: message[]
}

const MessageList: React.FC<Props> = ({messages}) => {
    return (
        <React.Fragment>
            {messages.map(msg => {
                return <Message key={msg.uid} message={msg}/>
            })}
        </React.Fragment>
    );
}

export default MessageList;