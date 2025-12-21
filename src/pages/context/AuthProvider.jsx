import React, { useEffect, useState } from 'react';

import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
;
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    
const [ user, setUser ] = useState(null);
const [loading, setLoading] = useState(true);
    


// register
    const registerUser = (email, password) => {
        setLoading(true)
        console.log(email,password)
        return createUserWithEmailAndPassword(auth, email, password);
    }


// signin
    const signInUser = (email, password) => {
         setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }


   

// google log in
const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);  
};



    const logOut = () => {
        setLoading(true)
        return signOut(auth);
}

    // profile photo
    const updateUserProfile = (profile) => {
        console.log(profile)
        return updateProfile(auth.currentUser,profile)
    }




    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            console.log(currentUser)
        })
        return () => {
            unSubscribe();
    }
},[])

    
    
    
    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut,
       updateUserProfile,
    
    
    }




    return (
        <AuthContext value={authInfo}>
            {children}
       </AuthContext>
    );
};

export default AuthProvider;