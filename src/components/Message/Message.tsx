import React from "react";

interface Props {
    message: message
}

const Message: React.FC<Props> = ({message}) => {
    return (
        <div>
            <h3>{message.text}</h3>
            <p>{message.createdAt}</p>
        </div>
    );
}

export default Message;