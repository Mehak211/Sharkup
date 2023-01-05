import { createContext, useState, useEffect } from 'react'
import firebase from 'firebase'

const AuthenticationContex = createContext({
    isAuth: false,
    
    authDetails: null,
    authTriggered: function () { }
})

export default AuthenticationContex;

export const AuthContextProvider = (props) => {

    const [isauth, setisauth] = useState(false)
    const [authdata, setauthdata] = useState({})
    const db = firebase.firestore()
    const auth = firebase.auth()

    useEffect(() => {
        auth.onAuthStateChanged((userCredentials) => {
            if (userCredentials) {
                if (userCredentials.uid) {
                    setisauth(true);
                    getUserData(userCredentials.uid);
                } else {
                    setisauth(false);
                }
            } else {
                setisauth(false);
            }
        });
    }, [])

    const getUserData = (uid) => {
        db.collection("Users")
            .doc(uid)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.data()) {
                    setauthdata(querySnapshot.data());
                }
            });
    };

    const authTriggered = () => {
        auth.onAuthStateChanged((userCredentials) => {
            if (userCredentials) {
                if (userCredentials.uid) {
                    setisauth(true);
                    setauthdata(userCredentials.uid);
                } else {
                    setisauth(false);
                    setauthdata();
                    console.log("fdfs");
                }
            } else {
                setisauth(false);
                setauthdata()
            }
        });

    }

    const context = {
        isAuth: isauth,
        authDetails: authdata,
        authTriggered: authTriggered
    }

    return (
        <AuthenticationContex.Provider value={context}>
            {props.children}
        </AuthenticationContex.Provider>
    )
}