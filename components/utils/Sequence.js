import { requestAnimationFrame } from './uiUtil';

class TaskHolder {
	constructor(config) {
		this.config = config;
		this.list = [];
		this.index = 0;
		this.promise = null;
	}

	weakThan(config = {}) {
		return (this.config.priority || 0) <= (config.priority || 0);
	}

	next(callback, config = {}) {
		this.list.push({ callback, config });
		return this;
	}

	getCurrent() {
		return this.list[this.index];
	}

	nextStep() {
		this.index += 1;
	}
}

class Sequence {
	taskHolder = null;
	_destroy = false;

	next(callback, config = {}) {
		const taskHolder = new TaskHolder(config);
		taskHolder.next(callback, config);

		if (!this.taskHolder || this.taskHolder.weakThan(config)) {
			this.taskHolder = taskHolder;
		}

		taskHolder.promise = this._doAction(taskHolder);

		return taskHolder;
	}

	destroy() {
		this._destroy = true;
	}

	_doAction(taskHolder) {
		return new Promise((resolve, reject) => {
			if (this._destroy) return;

			const step = () => {
				const task = taskHolder.getCurrent();
				if (!task) {
					this.taskHolder = null;
					resolve();
					return;
				}

				const exec = () => {
					try {
						if (this.taskHolder !== taskHolder || this._destroy) return;
						task.callback();
						taskHolder.nextStep();
						step();
					} catch (err) {
						reject(err);
					}
				};

				if (task.config.delay !== undefined) {
					setTimeout(exec, task.config.delay);
				} else {
					requestAnimationFrame(exec, task.config.frame || 2);
				}
			};

			step();
		});
	}
}

export default Sequence;
