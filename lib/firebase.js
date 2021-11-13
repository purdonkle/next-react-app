import { initializeApp } from 'firebase/app'
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCfm8EOiKxv4VwRrCIUS0N68-wRVooddH4",
    authDomain: "purdonkle-react-next-app.firebaseapp.com",
    projectId: "purdonkle-react-next-app",
    storageBucket: "purdonkle-react-next-app.appspot.com",
    messagingSenderId: "1089765426929",
    appId: "1:1089765426929:web:0b5357773aee9894378b50",
    measurementId: "G-9STDD7Z72K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider(); 
export const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
}

export const firestore = getFirestore();
export const storage = getStorage();