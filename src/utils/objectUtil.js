export const toString = obj => {
	const maps = {};
	let id = 0;

	const str = JSON.stringify(obj, (key, value) => {
		if (typeof value === 'function') {
			const myId = id;
			id += 1;

			maps[myId] = value.toString()
				.replace(/\t/g, '   ');
			return `[__${myId}__]`;
		}

		return value;
	}, 3);

	const lines = str.split(/\n/);

	for (let i = 0; i < id; i += 1) {
		const key = `"[__${i}__]"`;

		lines.some((line, index) => {
			if (line.includes(key)) {
				const preSpaceMatch = line.match(/^\s+/);
				let preSpace = (preSpaceMatch || [])[0] || '';
				preSpace = preSpace.slice(3);
				lines[index] = line
					.replace(key, maps[i])
					.split(/\n/)
					.map((l, j) => (j === 0 ? l : `${preSpace}${l}`))
					.join('\n');

				return true;
			}
			return false;
		});
	}

	return lines.join('\n');
};

export default {};
