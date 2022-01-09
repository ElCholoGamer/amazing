import Link from 'next/link';
import Button from '@mui/material/Button';
import placeholderImage from '@public/placeholder.png';
import Layout from 'modules/layout/components/Layout';
import InfoCard from 'common/components/InfoCard';
import BackgroundMaze from 'common/components/BackgroundMaze';
import styles from 'styles/Home.module.css';

const Home: React.FC = () => (
	<Layout>
		<BackgroundMaze />

		<main className={styles.main}>
			<h1 className={styles.head} title="Heh, get it?">
				Amazing
			</h1>
			<h2 className={styles.subtitle}>The tool for all of your maze-solving needs</h2>

			<div className={styles.mainButtons}>
				<Button variant="contained">Get started!</Button>
				<Link href="https://github.com/ElCholoGamer/amazing" passHref>
					<Button>View on GitHub</Button>
				</Link>
			</div>

			<div className={styles.info}>
				<h3 style={{ textAlign: 'center' }}>It&apos;s just 3 simple steps:</h3>

				<InfoCard image={placeholderImage}>Upload your maze image</InfoCard>
				<InfoCard image={placeholderImage} imageSide="left">
					Adjust some parameters
				</InfoCard>
				<InfoCard image={placeholderImage}>Done!</InfoCard>
			</div>
		</main>
	</Layout>
);

export default Home;
