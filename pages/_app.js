import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { UseUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
	const userData = UseUserData();

	return (
		<UserContext.Provider value={userData}>
			<Component {...pageProps} />
			<Navbar></Navbar>
			<Toaster />
		</UserContext.Provider>
	);
}

export default MyApp;
