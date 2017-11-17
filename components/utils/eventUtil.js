import { canUseDOM } from './envUtil';

const events = {};

export function addUniqueListener(event, listener) {
	if (!canUseDOM) return;

	if (events[event] === undefined) {
		window.addEventListener(event, (...args) => {
			if (events[event]) {
				events[event](...args);
			}
		});
	}

	events[event] = listener;
}

export function removeUniqueListener(event, listener) {
	const currentListener = events[event];

	if (currentListener === listener) {
		events[event] = null;
		return true;
	}

	return false;
}

export function isSameSource(event, target) {
	let current = event.target;

	while (current) {
		if (current === target || current._bmbo_ignore) {
			return true;
		}

		current = current.parentElement;
	}

	return false;
}

export const wrapperEventValue = (originEvent, target, value) => {
	target.value = value; // eslint-disable-line no-param-reassign

	return (
		new Proxy(originEvent, {
			get(tgt, key) {
				if (key === 'target') return target;
				return tgt[key];
			},
		})
	);
};
