import { firestore, auth } from '../lib/firebase'
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export function UseUserData() {
	const [user] = useAuthState(auth);
	const [username, setUsername] = useState(null);

	useEffect(() => {
        const getUserData = async () => {
            let docSnap;
            if (user) {
                const docRef = doc(firestore, 'users', 'hello');
                docSnap = await getDoc(docRef);
                docSnap ? setUsername(docSnap.data()?.username) : null;
            } else {
                setUsername(null);
            }
    
            return docSnap;    
        }

        return getUserData();
	}, [user]);

    return { user, username };
}
