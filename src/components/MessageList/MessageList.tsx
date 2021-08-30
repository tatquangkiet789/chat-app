import React from "react";
import Message from "../Message/Message";
import style from "./MessageList.module.css";

interface Props {
    messages: Message[]
}

const MessageList: React.FC<Props> = ({messages}) => {
    return (
        <div className={style.container}>
            <div className={style.messages}>
                {messages.map(msg => {
                    return <Message key={msg.uid} message={msg}/>
                })}
            </div>
        </div>
    );
}

export default MessageList;