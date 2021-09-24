import React from 'react'
import firebase from 'firebase' 
import { auth, db } from '../../firebase'
import './SignIn.css'
import hello from '../../images/Hello.svg';

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
        <div className="sign-in-container">
            <div className="sign-in-content">
                <img src={hello} className="image" alt="Hello" />
                <div className="sign-in-box">
                    <h2 className="sign-in-text">Welcome to DoanChat</h2>
                    <button className="sign-in-button" onClick={signInWithGoogle}>Sign in with Google</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
