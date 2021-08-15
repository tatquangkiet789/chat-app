import React from 'react'
import firebase from 'firebase' 
import {auth} from '../../firebase'

const SignIn: React.FC = () => {
    const signInWithGoogle = () => {
        const ggProvider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(ggProvider);
    }

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}

export default SignIn;
