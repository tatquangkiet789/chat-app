import React from 'react'
import firebase from 'firebase' 
import { auth } from '../../firebase'

const SignIn: React.FC = () => {
    const signInWithGoogle = async () => {
        const ggProvider = new firebase.auth.GoogleAuthProvider();
        try {
            await auth.signInWithPopup(ggProvider);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}

export default SignIn;
