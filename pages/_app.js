import '../styles/globals.css';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
			<Navbar></Navbar>
		</>
	);
}

export default MyApp;
