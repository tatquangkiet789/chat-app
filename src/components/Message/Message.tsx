import React from "react";

interface Props {
    message: Message
}

const Message: React.FC<Props> = ({message}) => {
    return (
        <div>
            <h3>{message.text} - {message.senderID}</h3>
        </div>
    );
}

export default Message;