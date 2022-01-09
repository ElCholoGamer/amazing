import { AppProps } from 'next/app';
import Layout from 'components/Layout';
import 'styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
	<Layout>
		<Component {...pageProps} />
	</Layout>
);

export default App;
