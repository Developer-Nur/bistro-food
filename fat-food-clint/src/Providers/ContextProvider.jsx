import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loader, setLoader] = useState(true);

    // CREATE USER
    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // singin user
    const singinUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // sing out 
    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }

    // update user profile
    const updaleProfileOfUser = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        })
    }

    // USER observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoader(false)
        });
        return () => {
            return unsubscribe()
        }
    }, []);

    const authInfo = {
        loader, user, singinUser, createUser, logOut, updaleProfileOfUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextProvider;