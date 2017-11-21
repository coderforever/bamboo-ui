export function parseDate(date) {
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
		return {
			year: myDate.year(),
			month: myDate.month(),
			date: myDate.date(),
			hour: myDate.hour(),
			minute: myDate.minute(),
		};
	} else if (myDate instanceof Date) {
		return {
			year: myDate.getFullYear(),
			month: myDate.getMonth(),
			date: myDate.getDate(),
			hour: myDate.getHours(),
			minute: myDate.getMinutes(),
		};
	}

	return null;
}

export default {};
