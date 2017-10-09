import { canUseDOM } from './envUtil';

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

export const requestAnimationFrame = (func) => {
	if (window.requestAnimationFrame) {
		window.requestAnimationFrame(func);
	} else {
		setTimeout(func, ANIMATION_INTERVAL);
	}
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
	const bodyWidth = window.document.body.clientWidth;
	const bodyHeight = window.document.body.clientHeight;
	const scrollX = window.scrollX;
	const scrollY = window.scrollY;

	if (winHeight < bodyHeight) winWidth -= getScrollbarWidth();
	if (winWidth < bodyWidth) winHeight -= getScrollbarWidth();

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
