import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import Spin from "../Spin/Spin";

export const UserContext = React.createContext({});

const UserProvider: React.FC = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if(user) {
                const {uid, photoURL, displayName, email} = user;
                setUser({uid, photoURL, displayName, email});
                setLoading(false);
                history.push('/');
                console.log({user});
            } else {
                history.push('/login');
            }
        });

        //Clean up
        return unsub;
    }, [history]);

    return (
        <UserContext.Provider value={{user}}>
            {loading ? <Spin /> : children}
        </UserContext.Provider>
    );
}

export default UserProvider;