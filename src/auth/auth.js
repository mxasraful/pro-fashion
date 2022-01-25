import { createContext, useContext, useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import firebaseConfig from "../firebase.config";
import { useHistory } from "react-router";
import jwtDecode from "jwt-decode";

firebase.initializeApp(firebaseConfig)

// Menage context
const AuthContext = createContext()
export const AuthContextProvider = (props) => {
    const auth = Auth()
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

const Auth = () => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const [signUpErrMsg, setSignUpErrMsg] = useState(null)
    const [signInErrMsg, setSignInErrMsg] = useState(null)
    const [authLoading, setAuthLoading] = useState(false)
    const [updateProfileErr, setUpdateProfileErr] = useState(null)

    const redirectUrl = window.location.search.split('=')[1]

    const history = useHistory()

    const fireAuth = getAuth()
    const currentUser = fireAuth.currentUser

    // Filter user data
    const filterUser = usr => {
        const { displayName, email, photoURL } = usr;
        return { name: displayName, email, photo: photoURL }
    }

    // Google sign in auth method
    const googleSignIn = () => {
        setAuthLoading(true)
        const provider = new GoogleAuthProvider();
        signInWithPopup(fireAuth, provider)
            .then(userCredential => {
                const data = userCredential?.user
                setUser(filterUser(data))
                setError(false)
                localStorage.setItem('pro-fashion-user-id', data.accessToken)
                pathRedirect()
                setAuthLoading(false)
            })
            .catch(err => {
                setError(true)
            })
    }

    // Password Sign Up auth method
    const passSignUp = (name, email, pass) => {
        setError(false)
        setAuthLoading(true)
        createUserWithEmailAndPassword(fireAuth, email, pass)
            .then(userCredential => {
                const data = userCredential?.user
                updateProfile(fireAuth.currentUser, {
                    displayName: name
                })
                    .then(() => {
                        setUser(filterUser(data))
                        setError(false)
                        localStorage.setItem('pro-fashion-user-id', data.accessToken)
                        pathRedirect()
                        setAuthLoading(false)
                    })
                    .catch((updateNameError) => {
                        setAuthLoading(false)
                        console.log(updateNameError)
                    })
            })
            .catch(error => {
                setAuthLoading(false)
                setError(true)
                setSignUpErrMsg(error)
            })
    }


    // Password Sign In auth method
    const passSignIn = (email, pass) => {
        setAuthLoading(true)
        signInWithEmailAndPassword(fireAuth, email, pass)
            .then(userCredential => {
                const data = userCredential?.user
                setUser(filterUser(data))
                setError(false)
                localStorage.setItem('pro-fashion-user-id', data.accessToken)
                pathRedirect()
                setAuthLoading(false)
            })
            .catch(error => {
                setAuthLoading(false)
                setError(true)
                setSignInErrMsg(error.message.replace("Firebase: Error (auth/", "").replace(").", "").replace("-", " "))
            })
    }

    // Update user info
    const updateUserInfo = (updateInfo) => {
        setUpdateProfileErr(null)
        console.log(updateInfo)
        console.log(fireAuth?.currentUser)
        updateProfile(fireAuth?.currentUser, updateInfo)
            .then(updatedSData => {
                const data = updatedSData?.user
                console.log("local", currentUser?.accessToken)
                // localStorage.setItem('pro-fashion-user-id', currentUser?.accessToken)
                setUser(filterUser(data))
                window.location.reload()
                console.log(data)
            })
            .catch((updateNameError) => {
                setUpdateProfileErr(updateNameError.message)
                console.log(updateNameError)
            })
    }

    // Path Redirect
    const pathRedirect = () => {
        if (redirectUrl) {
            history.replace(redirectUrl)
        } else {
            history.replace('/')
        }
    }

    // LogOut
    const logOut = () => {
        if (user) {
            signOut(fireAuth)
                .then(() => {
                    localStorage.removeItem('pro-fashion-user-id')
                    setError(false)
                    window.location.reload()
                })
                .catch((error) => {
                    // An error happened.
                });
        }
    }

    // Menage Logged in data
    useEffect(() => {
        if (localStorage.getItem('pro-fashion-user-id')) {
            const { name, email, picture, email_verified } = jwtDecode(localStorage.getItem('pro-fashion-user-id'))
            setUser({ name, photo: picture, email, verified: email_verified })
        } else {

        }
    }, [])

    console.log(fireAuth.currentUser)

    return {
        user,
        error,
        signInErrMsg,
        signUpErrMsg,
        authLoading,
        updateProfileErr,
        passSignUp,
        passSignIn,
        googleSignIn,
        updateUserInfo,
        logOut
    }
}