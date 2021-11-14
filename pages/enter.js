import { auth, signInWithGoogle, firestore } from '../lib/firebase';
import { writeBatch, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../lib/context.js';
import { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import { debounce } from 'lodash.debounce';

export default function EnterPage({}) {
	const { user, username } = useContext(UserContext);
    console.log(user, username);

	return (
		<main>
			{user ? (
				!username ? (
					<UsernameForm />
				) : (
					<SignOutButton />
				)
			) : (
				<SignInButton />
			)}
		</main>
	);
}

function SignInButton() {
	return (
		<button className="btn-google" onClick={signInWithGoogle}>
			Sign in with Google
		</button>
	);
}

function SignOutButton() {
	return <button onClick={() => auth.signOut()}>Sign out</button>;
}

function UsernameForm() {
	const { user, username } = useContext(UserContext);

	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		checkUsername(formValue);
	}, [formValue]);

	const onChange = (e) => {
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		if (val.length < 3) {
			setFormValue(val);
			setIsLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setIsLoading(true);
			setIsValid(false);
		}
	};

	const checkUsername = useCallback(async (username) => {
		if (username.length >= 3) {
			const ref = doc(firestore, 'usernames', username);
			const docSnap = await getDoc(ref);
			console.log('Firestore read executed!');
			setIsValid(!docSnap.exists());
			setIsLoading(false);
		}
	}, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const userDoc = doc(firestore, 'users', user.id);
        const usernameDoc = doc(firestore, 'usernames', formValue);

        const batch = writeBatch(firestore);
        batch.set(userDoc, { username: formValue, photoUrl: user.photoUrl, displayName: user.displayName});
        batch.set(usernameDoc, { uid: user.id });

        await batch.commit();
    };

	return (
		!username && (
			<section>
				<h3>Choose Username</h3>
				<form onSubmit={onSubmit}>
					<input
						name="username"
						placeholder="username"
						value={formValue}
						onChange={onChange}
					/>
				</form>

                <UsernameMessage username={username} isValid={isValid} isLoading={isLoading} />

				<button type="submit" className="btn-green" disabled={!isValid}>
					Choose
				</button>

				<h3>Debug State</h3>
				<div>
					Username: {formValue}
					<br />
					Loading: {isLoading.toString()}
					<br />
					Username Valid: {isValid.toString()}
				</div>
			</section>
		)
	);
}

function UsernameMessage({ username, isValid, isLoading}) {
    if (isLoading) {
        return <p>Checking...</p>
    } else if(isValid) {
        return <p className='text-success'>The username is avaliable!</p>
    } else if (username && !isValid) {
        return <p className='text-danger'>The username is avaliable!</p>
    } else {
        return <p></p>
    }
}