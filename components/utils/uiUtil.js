import { canUseDOM } from './envUtil';

export const ANIMATE_STATUS_NONE = 0;
export const ANIMATE_STATUS_INIT = 1;
export const ANIMATE_STATUS_SHOWING = 2;
export const ANIMATE_STATUS_SHOWN = 3;
export const ANIMATE_STATUS_HIDING = 4;

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
	$bambooHolder.dataset.timestamp = Date.now();
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

	// TODO: use left & top only
	const { width: sw = 0, height: sh = 0 } = surroundRect;
	const sx = surroundRect.left || surroundRect.x || 0;
	const sy = surroundRect.top || surroundRect.y || 0;
	const { width: tw = 0, height: th = 0 } = targetRect;

	let winWidth = window.innerWidth;
	let winHeight = window.innerHeight;
	const scrollX = window.scrollX;
	const scrollY = window.scrollY;

	if (hasVerticalScroll()) winWidth -= getScrollbarWidth();
	if (hasHorizontalScroll()) winHeight -= getScrollbarWidth();

	const isR = position.includes('r');
	const isB = position.includes('b');

	const target = {
		x: sx + scrollX,
		y: sy + scrollY,
		direct: '',
	};

	if (isR) target.x = sx + sw + scrollX;
	if (isB) target.y = sy + sh + scrollY;

	// Bottom out of the window
	if ((target.y - scrollY) + th > winHeight) {
		if (isR) {
			target.y = (winHeight - th) + scrollY;
		} else {
			const ty = (sy + scrollY) - th;
			if (ty >= 0) {
				target.y = (sy + scrollY) - th;
				target.direct = 'up';
			}
		}
	}

	// Right out of the window
	if ((target.x - scrollX) + tw > winWidth) {
		target.x = sx - tw;
	}

	return target;
};

export function isInRect(x, y, rect) {
	return (
		rect.left <= x &&
		x <= rect.right &&
		rect.top <= y &&
		y <= rect.bottom
	);
}
