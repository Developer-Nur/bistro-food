import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";



export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loader, setLoader] = useState(true);
    const axiosPublic = useAxiosPublic()

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
        localStorage.removeItem('access-token');
        return signOut(auth)
    }

    // update user profile
    const updaleProfileOfUser = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        })
    }

    // handle social sing in
    const googleSingin = () => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }

    // USER observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            // jwt token loder
            const userInfo = {
                email: currentUser.email
            }
            if (currentUser) {
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
            else {
                // Remove token
                localStorage.removeItem('access-token');
            }
            setLoader(false)
        });
        return () => {
            return unsubscribe()
        }
    }, [axiosPublic]);

    const authInfo = {
        googleSingin, loader, user, singinUser, createUser, logOut, updaleProfileOfUser, setLoader
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextProvider;