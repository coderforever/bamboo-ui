const FUNC_LIST = [
	'getFullYear',
	'getMonth',
	'getDate',
	'getDay',
	'getHours',
	'getMinutes',
	'getTime',

	{ name: 'setFullYear', returnThis: true },
	{ name: 'setMonth', returnThis: true },
	{ name: 'setDate', returnThis: true },
	{ name: 'setHours', returnThis: true },
	{ name: 'setMinutes', returnThis: true },
	{ name: 'setSeconds', returnThis: true },

	'toString',
	'toISOString',
];

export function toDate(date) {
	if (date === undefined || date === null) return null;

	let myDate = date;
	const type = typeof date;

	switch (type) {
		case 'number':
		case 'string':
			if (date === '') {
				myDate = new Date();
			} else {
				myDate = new Date(date);
			}
			break;
	}

	if (myDate._isAMomentObject) {
		// Process if is moment object
		myDate = new Date();
		myDate.setFullYear(myDate.year(), myDate.month(), myDate.date());
		myDate.setHours(myDate.hour(), myDate.minute(), myDate.second());

		return myDate;
	} else if (myDate instanceof Date) {
		return myDate;
	}

	return null;
}

/**
 * Wrap a simple Date class like light version of moment.
 */
export class BambooDate {
	constructor(...args) {
		const myArgs = args.length === 0 ? [''] : args;
		this.date = toDate(...myArgs);
	}

	setDay(target) {
		const currentDay = this.date.getDay();
		const distance = target - currentDay;
		this.date.setDate(this.date.getDate() + distance);
		return this;
	}

	clone() {
		return new BambooDate(this.getTime());
	}
}

// Pass origin date function
FUNC_LIST.forEach((func) => {
	const config = typeof func === 'string' ? { name: func } : func;

	BambooDate.prototype[config.name] = function dateFunc(...args) {
		const returnValue = this.date[config.name](...args);

		if (config.returnThis) return this;
		return returnValue;
	};
});

export function parseDate(date) {
	const myDate = toDate(date);
	if (myDate === null) return null;

	return {
		year: myDate.getFullYear(),
		month: myDate.getMonth(),
		date: myDate.getDate(),
		hour: myDate.getHours(),
		minute: myDate.getMinutes(),
	};
}
