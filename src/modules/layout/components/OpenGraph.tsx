import Head from 'next/head';

export interface Props {
	title: string;
	type: string;
	image: {
		url: string;
		alt?: string;
	};
	description?: string;
}

export const OpenGraph: React.FC<Props> = ({ title, type, image, description }) => (
	<Head>
		<meta property="og:title" content={title} />
		<meta property="og:type" content={type} />
		<meta property="og:image" content={image.url} />

		{image.alt && <meta property="og:image:alt" content={image.alt} />}
		{description && <meta property="og:description" content={description} />}
	</Head>
);
