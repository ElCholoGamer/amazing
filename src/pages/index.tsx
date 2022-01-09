import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import placeholderImage from '@public/placeholder.png';
import InfoCard from 'components/InfoCard';
import BackgroundMaze from 'components/BackgroundMaze';
import styles from 'styles/Home.module.css';

const Home: React.FC = () => {
	return (
		<>
			<main className={styles.main}>
				<Head>
					<title>Maze Solver</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<BackgroundMaze />

				<h1 className={styles.head}>Maze Solver</h1>
				<h3 className={styles.subtitle}>The tool for all of your maze-solving needs</h3>

				<div className={styles.mainButtons}>
					<Button variant="contained">Get started!</Button>
					<Link href="https://github.com/ElCholoGamer/maze-solver" passHref>
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

				{/* <svg className={styles.anim} width={200} height={200} xmlns="http://www.w3.org/2000/svg">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					fill="none"
					strokeWidth={5}
					pathLength={1}
					d="M 10 10 H 30 V 50 H 130 V 90 H 110 V 70 H 90 V 110 H 180 V 150"
				/>
			</svg> */}
			</main>
		</>
	);
};

export default Home;
