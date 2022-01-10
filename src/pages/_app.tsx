import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap-utilities.css';
import 'styles/globals.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
