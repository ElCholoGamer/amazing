import Link from 'next/link';
import Button from '@mui/material/Button';
import styles from 'styles/Header.module.scss';

export const Header: React.FC = () => (
	<header className={styles.container} role="banner">
		<h1>
			<Link href="/">Amazing</Link>
		</h1>
		<nav className={styles.navigation} role="navigation">
			<ul>
				<li>
					<Link href="/solve">Solve a maze</Link>
				</li>
				<li>
					<Link href="/about">About</Link>
				</li>
			</ul>
		</nav>
		<Link href="https://github.com/ElCholoGamer/amazing" passHref>
			<Button className={styles.rightLink}>View on GitHub</Button>
		</Link>
	</header>
);
