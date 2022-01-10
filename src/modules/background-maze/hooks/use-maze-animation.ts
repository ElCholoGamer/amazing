import { useAnimationFrame } from 'common/hooks/use-animation-frame';
import { Coordinate } from 'common/types/coordinate';
import { randomRange } from 'common/utils/random-range';
import { RefObject, useRef } from 'react';
import { moves } from '../constants';
import { Spark } from '../types/spark';

function tickSpark(spark: Spark, delta: number) {
	spark.size -= 3 * delta;

	spark.position.x += spark.velocity.x * delta;
	spark.position.y += spark.velocity.y * delta;
}

export function useMazeAnimation(canvasRef: RefObject<HTMLCanvasElement>) {
	const progress = useRef(0);
	const sparks = useRef<Spark[]>([]);

	function drawPath(ctx: CanvasRenderingContext2D, sizeRatio: number): Coordinate {
		ctx.lineWidth = 5 * sizeRatio;
		ctx.shadowBlur = 5 * sizeRatio;
		ctx.shadowColor = ctx.strokeStyle = '#0e2238';
		ctx.lineCap = ctx.lineJoin = 'round';
		ctx.beginPath();

		const pos = { ...moves[0] };
		ctx.moveTo(pos.x, pos.y);

		const moveProgress = progress.current * (moves.length - 1);
		const moveIndex = Math.floor(moveProgress);
		const extraMove = moveProgress % 1;

		for (let p = 1; p <= moveIndex; p++) {
			pos.x += moves[p].x;
			pos.y += moves[p].y;
			ctx.lineTo(pos.x, pos.y);
		}

		if (extraMove > 0) {
			pos.x += moves[moveIndex + 1].x * extraMove;
			pos.y += moves[moveIndex + 1].y * extraMove;
			ctx.lineTo(pos.x, pos.y);
		}

		ctx.stroke();
		return pos;
	}

	useAnimationFrame(delta => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const sizeRatio = canvas.width / canvas.clientWidth;

		progress.current += 0.15 * delta * sizeRatio;
		progress.current = Math.min(1, progress.current);

		sparks.current.forEach(spark => tickSpark(spark, delta));
		sparks.current = sparks.current.filter(s => s.size > 0);

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const cursor = drawPath(ctx, sizeRatio);

		if (progress.current < 1) {
			const velRange = 120 * sizeRatio;
			sparks.current.push({
				position: { ...cursor },
				velocity: { x: randomRange(-velRange, velRange), y: randomRange(-velRange, velRange) },
				size: 1,
			});
		}

		// Draw sparks
		ctx.fillStyle = ctx.shadowColor = '#fbfd75';
		for (const { position, size } of sparks.current) {
			ctx.shadowBlur = 6 * sizeRatio * size;
			ctx.beginPath();
			ctx.arc(position.x, position.y, 2.5 * sizeRatio * size, 0, Math.PI * 2);
			ctx.fill();
		}

		// Draw cursor
		if (progress.current < 1) {
			ctx.shadowBlur = 15 * sizeRatio;
			ctx.beginPath();
			ctx.arc(cursor.x, cursor.y, 6 * sizeRatio, 0, Math.PI * 2);
			ctx.fill();
		}
	});
}
