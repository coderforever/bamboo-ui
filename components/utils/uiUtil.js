import { canUseDOM } from './envUtil';

export const ANIMATE_STATUS_NONE = 0;
export const ANIMATE_STATUS_SHOWING = 1;
export const ANIMATE_STATUS_SHOWN = 2;
export const ANIMATE_STATUS_HIDING = 3;

const BAMBOO_PORTALS_HOLDER = 'bmbo_portals_holder';
let $bambooHolder;

if (canUseDOM) {
	// Clean up menu holder for hot module reload
	window.document.querySelectorAll(`#${BAMBOO_PORTALS_HOLDER}`).forEach((ele) => {
		ele.remove();
	});

	// Set up menu holder
	$bambooHolder = window.document.createElement('div');
	$bambooHolder.id = BAMBOO_PORTALS_HOLDER;
	$bambooHolder.className = 'bmbo-portals-holder';
	window.document.body.appendChild($bambooHolder);
}
export function getHolder() {
	return $bambooHolder;
}


export const ANIMATION_INTERVAL = 1000 / 60;

const delayByFrame = (func) => {
	if (window.requestAnimationFrame) {
		window.requestAnimationFrame(func);
	} else {
		setTimeout(func, ANIMATION_INTERVAL);
	}
};

export const requestAnimationFrame = (func, delayFrame = 1) => {
	let count = delayFrame;

	function doAction() {
		if (count <= 0) {
			func();
			return;
		}

		count -= 1;
		delayByFrame(doAction);
	}

	doAction();
};

function parseWaiterOption(priority = 0) {
	return typeof priority !== 'object' ? {
		priority,
	} : {
		priority: 0,
		...priority,
	};
}

export class Waiter {
	constructor() {
		this.priority = -1;
		this.callback = null;
	}

	/**
	 * Trigger callback after web frame render
	 * @param callback
	 * @param priority
	 */
	next = (callback, priority = 0) => {
		const opt = parseWaiterOption(priority);
		if (this._occupy(callback, opt.priority)) {
			if (!opt.delay) {
				this._doCheck();
			} else {
				setTimeout(this._doCheck, opt.delay);
			}
		}
	};

	/**
	 * Immediately trigger callback without delay
	 * @param callback
	 * @param priority
	 */
	immediate = (callback, priority = 0) => {
		if (this._occupy(callback, priority)) {
			this._doAction();
		}
	};

	destroy = () => {
		this._destroy = true;
	};

	_occupy = (callback, priority = 0) => {
		if (!this.callback || priority >= this.priority) {
			this.priority = priority;
			this.callback = callback;

			return true;
		}
		return false;
	};

	_doAction = () => {
		if (!this.callback || this._destroy) return;

		const callback = this.callback;
		this.callback = null;
		callback();
	};

	_doCheck = (delay = 2) => {
		// Wait 2 frames to make sure UI render refresh
		requestAnimationFrame(() => {
			this._doAction();
		}, delay);
	};
}

/**
 * Get Scroll bar size
 * @type {number}
 */
let scrollbarWidth = 0;
export function getScrollbarWidth() {
	if (scrollbarWidth || !canUseDOM) return scrollbarWidth;

	const $body = window.document.body;
	const scrollDiv = document.createElement('div');
	scrollDiv.className = 'bmbo-scrollbar-measure';
	$body.appendChild(scrollDiv);
	scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	scrollDiv.remove();
	return scrollbarWidth;
}

export const hasHorizontalScroll = () => {
	const winWidth = window.innerWidth;
	const bodyWidth = window.document.body.scrollWidth;
	return winWidth < bodyWidth;
};

export const hasVerticalScroll = () => {
	const winHeight = window.innerHeight;
	const bodyHeight = window.document.body.scrollHeight;
	return winHeight < bodyHeight;
};


/**
 * Get enabled position for element.
 * @param surroundRect
 * @param targetRect
 * @param position
 * @returns {{x: number, y: number}}
 */
export const getEnablePosition = (surroundRect, targetRect, position = 'dr') => {
	if (typeof window === 'undefined') return { x: 0, y: 0 };

	const { x: sx, y: sy, width: sw = 0, height: sh = 0 } = surroundRect;
	const { width: tw = 0, height: th = 0 } = targetRect;

	let winWidth = window.innerWidth;
	let winHeight = window.innerHeight;
	const scrollX = window.scrollX;
	const scrollY = window.scrollY;

	if (hasVerticalScroll()) winWidth -= getScrollbarWidth();
	if (hasHorizontalScroll()) winHeight -= getScrollbarWidth();

	let targetX = sx + scrollX;
	let targetY = sy + scrollY;

	if (position.includes('r')) targetX = sx + sw;
	if (position.includes('b')) targetY = sy + sh;

	// Bottom out of the window
	if ((targetY - scrollY) + th > winHeight) {
		targetY = (winHeight - th) + scrollY;
	}

	// Right out of the window
	if ((targetX - scrollX) + tw > winWidth) {
		targetX = sx - tw;
	}

	return {
		x: targetX,
		y: targetY,
	};
};
