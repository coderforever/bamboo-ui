import {  } from './uiUtil';

export interface Config {
	priority?: number;
	delay?: number;
}

export interface Task {
	callback: Function,
	config: Config;
}

export class TaskHolder {
	private config: Config;
	private list: Array<Task> = [];
	index: number = 0;

	constructor(config: Config) {
		this.config = config;
	}

	weakThan(config: Config): Boolean {
		return this.config.priority < config.priority;
	}

	next(callback: Function, config: Config = {}):TaskHolder {
		this.list.push({ callback, config });
		return this;
	}

	get current(): Task {
		return this.list[this.index];
	}
}
