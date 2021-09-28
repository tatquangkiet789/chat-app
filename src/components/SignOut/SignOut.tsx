import React from "react";
import { auth } from "../../firebase";
import "./SignOut.css";

const SignOut: React.FC = () => {
    const handleSignOut = () => {
        auth.signOut();
    }

    return (
        <>
            <button className="sign-out-button" onClick={handleSignOut}>SignOut</button>
        </>
    )
}

export default SignOut;