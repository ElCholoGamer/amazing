import Button from '@mui/material/Button';
import placeholderImage from '@public/placeholder.png';
import { Layout } from 'modules/layout/components/Layout';
import { InfoCard } from 'common/components/InfoCard';
import { BackgroundMaze } from 'modules/background-maze/components/BackgroundMaze';
import styles from 'styles/Home.module.scss';

const Home: React.FC = () => (
	<Layout>
		<BackgroundMaze />

		<main className={styles.main}>
			<h2>
				The <em>tool</em> for all of your <em>maze-solving</em> needs
			</h2>

			<Button variant="contained">Get started!</Button>

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
