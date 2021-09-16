import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import "./ReceiverInfo.css"

interface Props {
    receiverID: string
}

const ReceiverInfo: React.FC<Props> = ({receiverID}) => {
    const [receiver, setReceiver] = useState<User>();

    useEffect(() => {
        if(db && receiverID !== "") {
            db.collection('users').where('uid', '==', receiverID)
            .get().then(snapShot => {
                snapShot.docs.forEach(doc => {
                    setReceiver({uid: doc.data().uid, photoURL: doc.data().photoURL, email: doc.data().email, displayName: doc.data().displayName})
                })
            })
        }
    },[receiverID]);

    return(
        <div className="receiver-container">
            <img className="receiver-img" src={receiver?.photoURL} alt="Receiver" />
            <h3 className="receiver-name">{receiver?.displayName}</h3>
        </div>
    );
}

export default ReceiverInfo;