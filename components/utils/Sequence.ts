import { Config, TaskHolder, Task } from './TaskHolder';

class Sequence {
	taskHolder: TaskHolder;

	next(callback: Function, config: Config = {}) {
		const taskHolder = new TaskHolder(config);
		taskHolder.next(callback, config);

		if (!this.taskHolder || this.taskHolder.weakThan(config)) {
			this.taskHolder = taskHolder;

			setTimeout(() => {
				this.doAction(taskHolder);
			}, 1);
		}

		return taskHolder;
	}

	private doAction(taskHolder: TaskHolder): void {
		const step = () => {
			const task: Task = taskHolder.current;
			if (!task) return;


			setTimeout(() => {
				if (this.taskHolder !== taskHolder) return;
				task.callback();
				taskHolder.index += 1;
				step();
			}, task.config.delay || 1);
		};

		step();
	}
}

export default Sequence;
