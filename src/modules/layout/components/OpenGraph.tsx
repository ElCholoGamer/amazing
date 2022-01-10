import Head from 'next/head';

export interface Props {
	title: string;
	description: string;
	type?: string;
	image?: {
		url: string;
		alt?: string;
	};
}

const OpenGraph: React.FC<Props> = ({ title, description, type = 'website', image }) => (
	<Head>
		<meta property="og:type" content={type} />
		{title && <meta property="og:title" content={title} />}
		{description && <meta property="og:description" content={description} />}
		{image && (
			<>
				<meta property="og:image" content={image.url} />
				{image.alt && <meta property="og:image:alt" content={image.alt} />}
			</>
		)}
	</Head>
);

export default OpenGraph;
