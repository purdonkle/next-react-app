import { auth, signInWithGoogle } from "../lib/firebase";

export default function EnterPage({}) {
    const user = null;
    const username = null;

    return (
        <main>
            {user ? 
                !username ? <UsernameForm /> : <SignOutButton /> 
                :
                <SignInButton />
            }
        </main>
    )
}

function SignInButton() {
    return (
        <button className='btn-google' onClick={signInWithGoogle}>
            Sign in with Google
        </button>
    );
}

function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign out</button>
}

function UsernameForm() {

}