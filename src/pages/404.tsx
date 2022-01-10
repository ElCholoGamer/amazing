import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { Layout } from 'modules/layout/components/Layout';

const NotFound: React.FC = () => {
	const router = useRouter();

	return (
		<Layout title="Not found">
			<main className="m-5">
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
		</Layout>
	);
};

export default NotFound;
