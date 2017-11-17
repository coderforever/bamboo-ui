import { createPortal as oriCreatePortal } from 'react-dom';
import { canUseDOM } from './envUtil';

export const ANIMATE_STATUS_NONE = 0;
export const ANIMATE_STATUS_INIT = 1;
export const ANIMATE_STATUS_SHOWING = 2;
export const ANIMATE_STATUS_SHOWN = 3;
export const ANIMATE_STATUS_HIDING = 4;

const BAMBOO_PORTALS_HOLDER = 'bmbo_portals_holder';
let $bambooHolder;

// =====================================================================================
// =                                   Window Holder                                   =
// =====================================================================================
if (canUseDOM) {
	// Clean up menu holder for hot module reload
	window.document.querySelectorAll(`#${BAMBOO_PORTALS_HOLDER}`).forEach((ele) => {
		ele.remove();
	});

	// Set up menu holder
	$bambooHolder = window.document.createElement('div');
	$bambooHolder.id = BAMBOO_PORTALS_HOLDER;
	$bambooHolder.className = 'bmbo-portals-holder';
	// $bambooHolder.dataset.timestamp = Date.now();
	window.document.body.appendChild($bambooHolder);
}
export function getHolder() {
	return $bambooHolder;
}

// =====================================================================================
// =                                     Animation                                     =
// =====================================================================================
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

// =====================================================================================
// =                                        UI                                         =
// =====================================================================================
export const createPortal = (node) => {
	if (!canUseDOM) return null;

	return oriCreatePortal(node, $bambooHolder);
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


export const getWinWidth = () => {
	let winWidth = window.innerWidth;
	if (hasVerticalScroll()) winWidth -= getScrollbarWidth();
	return winWidth;
};

export const getWinHeight = () => {
	let winHeight = window.innerHeight;
	if (hasHorizontalScroll()) winHeight -= getScrollbarWidth();
	return winHeight;
};

/**
 * Get enabled position for element.
 * @param surroundRect
 * @param targetRect
 * @param position
 * @param switchPos		Switch position when position has no space left
 * @returns {{x: number, y: number}}
 */
export const getEnablePosition = (surroundRect, targetRect, position = 'dr', switchPos = true) => {
	if (typeof window === 'undefined') return { x: 0, y: 0 };

	const { width: sw = 0, height: sh = 0 } = surroundRect;
	const sx = surroundRect.left || 0;
	const sy = surroundRect.top || 0;
	const { width: tw = 0, height: th = 0 } = targetRect;

	const winWidth = getWinWidth();
	const winHeight = getWinHeight();
	const scrollX = window.scrollX;
	const scrollY = window.scrollY;

	const isR = position.includes('r');
	const isB = position.includes('b');
	const isT = position.includes('t');
	const isL = position.includes('l');

	const target = {
		x: sx + scrollX,
		y: sy + scrollY,
		direct: '',
	};

	if (isL && !isR) target.x = (sx - tw) + scrollX;
	if (isR && !isL) target.x = (sx + sw) + scrollX;
	if (isT && !isB) target.y = (sy - th) + scrollY;
	if (isB && !isT) target.y = (sy + sh) + scrollY;

	if (isL && isR) target.x = (sx - ((tw - sw) / 2)) + scrollX;
	if (isT && isB) target.y = (sy - ((th - sh) / 2)) + scrollY;

	target._x = target.x;
	target._y = target.y;

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
	// Top out of the window
	if ((target.y - scrollY) < 0) {
		if (switchPos) {
			target.y = sy + sh + scrollY;
		} else {
			target.y = scrollY;
		}
	}

	// Left out of the window
	if (target.x - scrollX < 0) {
		if (switchPos) {
			target.x = sx + sw;
		} else {
			target.x = scrollX;
		}
	}

	// Right out of the window
	if ((target.x - scrollX) + tw > winWidth) {
		if (switchPos) {
			target.x = sx - tw;
		} else {
			target.x = (winWidth + scrollX) - tw;
		}
	}

	return target;
};

export function isInRect(x, y, rect) {
	return (
		rect.left < x &&
		x < rect.right &&
		rect.top < y &&
		y < rect.bottom
	);
}
