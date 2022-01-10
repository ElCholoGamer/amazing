import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { Layout } from 'modules/layout/components/Layout';
import styles from 'styles/NotFound.module.scss';

const NotFound: React.FC = () => {
	const router = useRouter();

	return (
		<Layout title="Not found">
			<main className={styles.container}>
				<h2>404 - Page not found :(</h2>

				<p>(Maybe you mispelled something?)</p>
				<br />

				<Button className="no-transform" variant="contained" onClick={() => router.back()}>
					Go back
				</Button>
			</main>
		</Layout>
	);
};

export default NotFound;
