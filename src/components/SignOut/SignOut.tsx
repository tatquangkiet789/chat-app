import React from "react";
import { auth } from "../../firebase";

const SignOut: React.FC = () => {
    const handleSignOut = () => {
        auth.signOut();
    }

    return (
        <div>
            <button onClick={handleSignOut}>SignOut</button>
        </div>
    )
}

export default SignOut;