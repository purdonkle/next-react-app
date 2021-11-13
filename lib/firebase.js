import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCfm8EOiKxv4VwRrCIUS0N68-wRVooddH4",
    authDomain: "purdonkle-react-next-app.firebaseapp.com",
    projectId: "purdonkle-react-next-app",
    storageBucket: "purdonkle-react-next-app.appspot.com",
    messagingSenderId: "1089765426929",
    appId: "1:1089765426929:web:0b5357773aee9894378b50",
    measurementId: "G-9STDD7Z72K"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
