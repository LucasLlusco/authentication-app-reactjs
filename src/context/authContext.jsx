import { createUserWithEmailAndPassword, 
    FacebookAuthProvider, 
    GithubAuthProvider, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateEmail, 
    updatePassword,  
    updateProfile
} from "firebase/auth"; 
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase"; 

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({}); 
    const [currentUserImpl, setCurrentUserImpl] = useState({}) 
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const createUser = async (email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            bio: "",
            phone: ""
        }); 
    }
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => { 
        return signOut(auth) 
    }
    const loginWithSocialNetwork = async (provider) => {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q); 
        if(docs.docs.length === 0) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email, 
                bio: "",
                phone: ""
            }); 
        }
    }
    const resetPassword = (email) => { 
        return sendPasswordResetEmail(auth, email)
    }
    const changePhoto = async (newPhoto) => {
        const storageRef = ref(storage, currentUser.uid) 
        await uploadBytes(storageRef, newPhoto)
        const photoUrl = await getDownloadURL(storageRef)
        await updateProfile(currentUserImpl, {photoURL: photoUrl})
        return photoUrl
    }
    const changeName = (newName) => {
        return updateProfile(currentUserImpl, {displayName: newName} )
    }
    const changeBio = (newBio)  => { 
        const userRef = doc(db, "users", currentUser.uid);
        return updateDoc(userRef, { bio: newBio }) 
    }
    const changePhone = (newPhone) => {  
        const userRef = doc(db, "users", currentUser.uid);
        return updateDoc(userRef, { phone: newPhone })
    }
    const changeEmail = (newEmail) => {
        return updateEmail(currentUserImpl, newEmail); 
    }
    const changePassword = (newPassword) => {
        return updatePassword(currentUserImpl, newPassword)
    }

    useEffect(() => {  
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user) { 
                const data = await getDoc(doc(db, "users", user.uid)); 
                setCurrentUser({
                    name: user.displayName, 
                    email: user.email,
                    image: user.photoURL,
                    bio: data.data()?.bio, 
                    phone: data.data()?.phone,
                    uid: user.uid 
                });
                setCurrentUserImpl(user);
            } else {
                setCurrentUser(user) 
            }
        });

        return () => { 
            unsubscribe()
        }
    }, [])
    
    return ( 
        <UserContext.Provider 
            value={{ createUser, 
                loginUser,
                currentUser, 
                setCurrentUser,
                logout, 
                googleProvider,
                facebookProvider,
                githubProvider,
                loginWithSocialNetwork,
                resetPassword,
                changePhoto,
                changeEmail,
                changePassword,
                changePhone,
                changeName,
                changeBio
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(UserContext);
}