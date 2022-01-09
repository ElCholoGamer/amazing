import Head from 'next/head';
import Footer from 'modules/layout/components/Footer';

export interface Props {
	title?: string;
	seo?: boolean;
}

const Layout: React.FC<Props> = ({ title, children }) => (
	<>
		<Head>
			<title>{title && `${title} | `}Amazing</title>
		</Head>
		{children}
		<Footer />
	</>
);

export default Layout;
