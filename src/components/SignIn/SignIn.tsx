import React from 'react'
import firebase from 'firebase' 
import { auth, db } from '../../firebase'
import style from './SignIn.module.css'

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
        <div className={style.container}>
            <div className={style.holder}>
                <div className={style.image}></div>
                <div className={style.buttonContainer}>
                    <h2 className={style.text}>Welcome to DoanChat</h2>
                    <button className={style.signInButton} onClick={signInWithGoogle}>Sign in with Google</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
