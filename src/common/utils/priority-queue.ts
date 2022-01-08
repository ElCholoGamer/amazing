export interface Node<T> {
	data: T;
	priority: number;
}

export class PriorityQueue<T> {
	public readonly items: Node<T>[] = [];

	public enqueue(data: T, priority: number): void {
		const node: Node<T> = { data, priority };

		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i].priority > node.priority) {
				this.items.splice(i, 0, node);
				return;
			}
		}

		this.items.push(node);
	}

	public dequeueLowest(): T | undefined {
		return this.items.shift()?.data;
	}

	public dequeue(): T | undefined {
		return this.items.pop()?.data;
	}

	public setNodePriority(node: Node<T>, priority: number) {
		if (node.priority === priority) return;

		const index = this.items.indexOf(node);
		if (index === -1) throw new Error('Could not find node');

		const direction = Math.sign(priority - node.priority);
		this.items.splice(index, 1);

		for (let i = index; i >= 0 && i < this.items.length; i += direction) {
			if (this.items[i].priority > node.priority) {
				this.items.splice(i, 0, node);
				return;
			}
		}

		this.items.push(node);
	}

	public findNode(data: T): Node<T> | undefined {
		return this.items.find(item => item.data === data);
	}

	public get size() {
		return this.items.length;
	}
}
