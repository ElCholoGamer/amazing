import { useRef } from 'react';
import { useAnimationFrame } from '@common/hooks/use-animation-frame';
import styles from '@styles/BackgroundMaze.module.css';

const points = [
	[-1, 1],
	[1, 0],
	[1, 0],
	[1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[1, 0],
	[1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[-1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[0, 1],
	[1, 0],
	[1, 0],
	[1, 0],
	[0, -1],
	[0, -1],
	[1, 0],
	[1, 0],
	[1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[-1, 0],
	[0, 1],
	[1, 0],
	[1, 0],
	[0, -1],
	[1, 0],
	[0, 1],
	[0, 1],
	[1, 0],
	[1, 0],
	[0, -1],
	[1, 0],
	[1, 0],
	[1, 0],
	[0, -1],
	[1, 0],
	[0, 1],
	[0, 1],
	[0, 1],
	[1, 0],
	[0, 1],
	[0, 1],
	[1, 0],
	[1, 0],
	[1, 0],
].map(p => p.map(v => v * 50));

for (let p = 1; p < points.length; p++) {
	points[p][0] += points[p - 1][0];
	points[p][1] += points[p - 1][1];
}

const BackgroundMaze: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const progress = useRef(0);

	useAnimationFrame(delta => {
		progress.current = Math.min(1, progress.current + 0.15 * delta);

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const sizeRatio = canvas.width / canvas.clientWidth;

		ctx.lineWidth = 5 * sizeRatio;
		ctx.shadowBlur = 5 * sizeRatio;
		ctx.shadowColor = ctx.strokeStyle = '#0e2238';
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.beginPath();

		ctx.moveTo(-100, -100);

		const pointProgress = progress.current * (points.length - 1);
		const pointIndex = Math.floor(pointProgress);
		const extra = pointProgress % 1;

		for (let p = 0; p <= pointIndex; p++) {
			ctx.lineTo(points[p][0], points[p][1]);
		}

		const cursor = [points[pointIndex][0], points[pointIndex][1]];

		if (pointIndex < points.length - 1) {
			const diff = [points[pointIndex + 1][0] - cursor[0], points[pointIndex + 1][1] - cursor[1]];

			cursor[0] += diff[0] * extra;
			cursor[1] += diff[1] * extra;
		}

		if (extra > 0) {
			ctx.lineTo(cursor[0], cursor[1]);
		}

		ctx.stroke();

		if (progress.current < 1) {
			ctx.fillStyle = ctx.shadowColor = ctx.strokeStyle = '#fbfd75';
			ctx.shadowBlur = 15 * sizeRatio;
			ctx.beginPath();
			ctx.arc(cursor[0], cursor[1], ctx.lineWidth / 2, 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();
		}
	});

	return <canvas className={styles.canvas} ref={canvasRef} width={1000} height={1000}></canvas>;
};

export default BackgroundMaze;
