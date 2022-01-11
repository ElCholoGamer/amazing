import { createTheme } from '@mui/material';
import variables from 'styles/variables.module.scss';

export const createAppTheme = () =>
	createTheme({
		palette: {
			primary: { main: variables.primary },
			secondary: { main: variables.secondary },
			error: { main: variables.danger },
			warning: { main: variables.warning },
			info: { main: variables.info },
			success: { main: variables.success },
			mode: 'dark',
		},
		typography: {
			fontFamily: ['-apple-system', 'Roboto', 'Arial', 'sans-serif'].join(','),
		},
	});
