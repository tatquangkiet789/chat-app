import React, { useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import "./Message.css";

interface Props {
    message: Message
}

const Message: React.FC<Props> = ({message}) => {
    const currentUser = useContext<User>(UserContext);

    return (
        <div className={(currentUser.uid === message.senderID) ? "message-container-send" : "message-container"}>
            <p>{message.text}</p>
        </div>
    );
}

export default Message;