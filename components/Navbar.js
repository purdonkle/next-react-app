import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
	const user = true;
	const username = true;

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link href="/">
						<button className="btn-logo">FEED</button>
					</Link>
				</li>

				{username && (
					<>
						<li className="push-left">
							<Link href="/admin">
								<button className="btn-blue">Write Posts</button>
							</Link>
						</li>
						<li>
							<Link href={`/${username}`}>
								<img src={user?.photoUrl} alt="profile" />
							</Link>
						</li>
					</>
				)}

				{!username && (
					<Link href="/enter">
						<button className="btn-blue">Sign-in</button>
					</Link>
				)}
			</ul>
		</nav>
	);
}
