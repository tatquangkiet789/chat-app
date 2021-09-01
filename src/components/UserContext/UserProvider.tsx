import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import Spin from "../Spin/Spin";

export const UserContext = React.createContext<User>(null!);

const UserProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(async (userFirebase) => {
            try {
                if(userFirebase) {
                    // const {uid, photoURL, displayName, email} = await userFirebase;
                    // if(user && uid) 
                    //     user.uid = uid;
                    // console.log(user)
                    if(user && userFirebase.photoURL && userFirebase.displayName && userFirebase.email) {
                        user.uid = userFirebase.uid;
                        user.photoURL = userFirebase.photoURL;
                        user.displayName = userFirebase.displayName;
                        user.email = userFirebase.email;
                    }
                    console.log(user)
                    setUser(user);
                    setLoading(false);
                    history.push('/');
                    return;
                }
                setLoading(false);
                history.push('/login');
            } catch(err) {
                console.log(err);
            }
        });

        //Clean up
        return () => {
            unsub();
        }
    }, [history, user]);

    return (
        <UserContext.Provider value={user!}>
            {loading ? <Spin /> : children}
        </UserContext.Provider>
    );
}

export default UserProvider;