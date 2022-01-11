import { useMemo } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import { createAppTheme } from 'modules/layout/theme';
import 'bootstrap/dist/css/bootstrap-utilities.css';
import 'styles/globals.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	const theme = useMemo(() => createAppTheme(), []);

	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default App;
