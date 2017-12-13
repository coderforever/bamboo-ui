export const getValue = (unit, path, defaultValue) => {
	if (!path) return unit;

	const desList = Array.isArray(path) ? path : [path];
	let current = unit;
	const len = desList.length;

	for (let i = 0; i < len; i += 1) {
		const des = desList[i];
		current = current[des];

		if (current === undefined || (i !== len - 1 && current === null)) {
			current = defaultValue;
			break;
		}
	}

	return current;
};

export const setValueByFn = (unit, path, func) => {
	const desList = Array.isArray(path) ? path : [path];
	const preLen = desList.length - 1;
	let current = unit;

	for (let i = 0; i < preLen; i += 1) {
		const des = desList[i];
		const tmp = current[des];
		if (tmp === null || tmp === undefined) {
			current = current[des] = typeof des === 'number' ? [] : {};
		} else if (typeof tmp === 'object') {
			current = current[des];
		} else {
			throw new Error(`${des} is not an object!`);
		}
	}

	current[desList[preLen]] = func(current[desList[preLen]]);

	return unit;
};

export const setValue = (unit, path, value) => (
	setValueByFn(unit, path, () => value)
);

export const updateValue = (unit, path, updateFunc) => {
	const desList = Array.isArray(path) ? path : [path];
	const preLen = desList.length - 1;
	const instance = Array.isArray(unit) ? [...unit] : { ...unit };
	let current = instance;
	let des;

	for (let i = 0; i < preLen; i += 1) {
		des = desList[i];
		const value = current[des];
		current = current[des] = Array.isArray(value) ? [...value] : { ...value };
	}

	current[desList[preLen]] = typeof updateFunc === 'function' ? updateFunc(current[desList[preLen]]) : updateFunc;

	return instance;
};

export const merge = (origin = {}, target = {}) => {
	const myOrigin = origin;

	Object.keys(target).forEach((key) => {
		const value = target[key];
		if (typeof value === 'object' && value !== null) {
			if (typeof myOrigin[key] !== 'object' || myOrigin[key] === null) {
				myOrigin[key] = Array.isArray(value) ? [] : {};
			}

			merge(myOrigin[key], value);
		} else {
			myOrigin[key] = value;
		}
	});

	return myOrigin;
};
