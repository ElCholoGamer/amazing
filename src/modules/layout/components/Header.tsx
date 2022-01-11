import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/MenuRounded';
import styles from 'styles/Header.module.scss';
import Typography from '@mui/material/Typography';
import { MouseEvent, useState } from 'react';

export const Header: React.FC = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = anchorEl !== null;

	const links = [
		{ href: '/solve', label: 'Solve a maze' },
		{ href: '/about', label: 'About' },
	];

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<header className={`${styles.container} p-2 p-sm-4`} role="banner">
			<Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
				<Button onClick={handleClick}>
					<MenuIcon fontSize="large" />
				</Button>
				<nav className={styles.navigation} role="navigation">
					<Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
						{links.map(link => (
							<MenuItem key={link.href}>
								<Typography>
									<Link href={link.href}>{link.label}</Link>
								</Typography>
							</MenuItem>
						))}
					</Menu>
				</nav>
			</Box>

			<h1 className="mx-2">
				<Link href="/">Amazing</Link>
			</h1>

			<Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
				<nav className={`${styles.navigation} mx-3`} role="navigation">
					<ul>
						{links.map(link => (
							<li key={link.href}>
								<Link href={link.href}>{link.label}</Link>
							</li>
						))}
					</ul>
				</nav>
			</Box>

			<Link href="https://github.com/ElCholoGamer/amazing" passHref>
				<Button className={`${styles.rightLink} no-transform text-end`}>View on GitHub</Button>
			</Link>
		</header>
	);
};
