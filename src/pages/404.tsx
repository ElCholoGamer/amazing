import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

const NotFound: React.FC = () => {
	const router = useRouter();

	return (
		<main className="m-5">
			<Head>
				<title>Page not found</title>
			</Head>

			<h1>Page not found :(</h1>
			<br />

			<Link href="/" passHref>
				<Button className="no-transform m-2" variant="contained">
					Home
				</Button>
			</Link>
			<br />
			<Button className="no-transform m-2" onClick={() => router.back()}>
				Go back
			</Button>
		</main>
	);
};

export default NotFound;
