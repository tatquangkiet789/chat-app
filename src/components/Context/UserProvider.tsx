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
        const unsub = auth.onAuthStateChanged((userFirebase) => {
            try {
                if(userFirebase) {
                    const {uid, photoURL, displayName, email} = userFirebase;
                    if(uid && photoURL && displayName && email)
                        setUser({uid, photoURL, displayName, email});
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
        //Dọn dẹp sự kiện onAuthStateChanged
        return () => {
            unsub();
        }
    }, [history]);

    return (
        <UserContext.Provider value={user!}>
            {loading ? <Spin /> : children}
        </UserContext.Provider>
    );
}

export default UserProvider;