import React from 'react'
import firebase from 'firebase' 
import { auth, db } from '../../firebase'

const SignIn: React.FC = () => {
    const signInWithGoogle = async () => {
        const ggProvider = new firebase.auth.GoogleAuthProvider();
        try {
            const { additionalUserInfo, user } = await auth.signInWithPopup(ggProvider);
            if(user && additionalUserInfo?.isNewUser) {
                db.collection('users').add({
                    displayName: user?.displayName,
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,            
                })
            }
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
