import React from "react";

interface Props {
    message: message
}

const Message: React.FC<Props> = ({message}) => {
    return (
        <div>
            <h4>{message.uid}</h4>
            <h3>{message.text}</h3>
        </div>
    );
}

export default Message;