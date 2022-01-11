import Link from 'next/link';
import Button from '@mui/material/Button';
import { Navigation } from './Navigation';
import styles from 'styles/Header.module.scss';

export const Header: React.FC = () => (
	<header className={styles.container} role="banner">
		<h1>
			<Link href="/">Amazing</Link>
		</h1>

		<Navigation className={styles.navigation}>
			<Link href="/solve">Solve a maze</Link>
			<Link href="/about">About</Link>
		</Navigation>

		<Link href="https://github.com/ElCholoGamer/amazing" passHref>
			<Button className={`${styles.rightLink} no-transform`}>View on GitHub</Button>
		</Link>
	</header>
);
