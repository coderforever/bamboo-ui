import { getValue } from './pathUtil';

export const equals = (list1 = [], list2 = [], path = []) => {
	const len = list1.length;
	if (len !== list2.length) return false;

	for (let i = 0; i < len; i += 1) {
		const item1 = getValue(list1[i], path);
		const item2 = getValue(list2[i], path);
		if (item1 !== item2) return false;
	}

	return true;
};

export default {};
