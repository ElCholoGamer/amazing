import { Children, ComponentProps } from 'react';
import styles from 'styles/Navigation.module.scss';

export interface Props extends ComponentProps<'nav'> {}

export const Navigation: React.FC<Props> = ({ children, ...props }) => {
	const fullClassName = props.className
		? `${props.className} ${styles.container}`
		: styles.container;

	return (
		<nav role="navigation" {...props} className={fullClassName}>
			<ul>
				{Children.map(children, element => (
					<li>{element}</li>
				))}
			</ul>
		</nav>
	);
};
