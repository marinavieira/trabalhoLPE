// Import the functions you need from the SDKs you need
import { GitHub } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,GithubAuthProvider ,getAuth, signInWithPopup, signOut } from
    "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from
    "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZ0yWH2mdXhwvdmKJUDtCjdVq9sOXgdpc",
    authDomain: "projetolpe-cb270.firebaseapp.com",
    projectId: "projetolpe-cb270",
    storageBucket: "projetolpe-cb270.appspot.com",
    messagingSenderId: "586425416647",
    appId: "1:586425416647:web:3af484dcd42d8f9378f7e2"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
//export default firebaseApp;
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, githubProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "github",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGoogle,
    logout,
};
