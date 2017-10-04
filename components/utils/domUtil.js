const REGEX_NUMBER = /^(\d*(\.\d+)?)(px)?$/;

export const toNumber = (str = '') => {
	const match = str.match(REGEX_NUMBER);
	if (!match) return 0;
	return Number(match[1]);
};

export default {};
