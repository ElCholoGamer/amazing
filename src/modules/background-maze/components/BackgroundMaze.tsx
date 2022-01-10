import { useRef } from 'react';
import styles from 'styles/BackgroundMaze.module.scss';
import { useMazeAnimation } from '../hooks/use-maze-animation';

export const BackgroundMaze: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	useMazeAnimation(canvasRef);

	return <canvas className={styles.canvas} ref={canvasRef} width={1000} height={1000}></canvas>;
};
