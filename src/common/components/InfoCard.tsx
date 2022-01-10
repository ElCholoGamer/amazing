import Image from 'next/image';
import { ComponentProps } from 'react';
import styles from 'styles/InfoCard.module.scss';

interface Props extends ComponentProps<'div'> {
	image?: StaticImageData;
	imageSide?: 'right' | 'left';
}

export const InfoCard: React.FC<Props> = ({ image, imageSide, children, ...props }) => (
	<div {...props} className={`${styles.card} ${imageSide === 'left' ? styles.flexReverse : ''}`}>
		<p>{children}</p>
		{image && (
			<div className={styles.imageWrapper}>
				<Image className={styles.cardImage} src={image} alt="Card" />
			</div>
		)}
	</div>
);
