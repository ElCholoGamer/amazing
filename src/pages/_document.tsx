import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html lang="en">
				<Head />
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat&family=Work+Sans:wght@800&display=swap"
					rel="stylesheet"
				/>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
