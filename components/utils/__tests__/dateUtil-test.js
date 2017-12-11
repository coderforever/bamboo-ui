import { BambooDate } from '../dateUtils';

describe('Bamboo Date', () => {
	test('parse', () => {
		const date = new BambooDate('2017-09-03');
		expect(date.getFullYear()).toBe(2017);
		expect(date.getMonth()).toBe(8);
		expect(date.getDate()).toBe(3);
		expect(date.getDay()).toBe(0);
	});

	test('set', () => {
		const date = new BambooDate('2017-09-03');
		expect(date.setFullYear(1989)).toBe(date);
		expect(date.getFullYear()).toBe(1989);
	});

	test('setDay', () => {
		const date = new BambooDate('2017-09-03');
		expect(date.setDay(6)).toBe(date);
		expect(date.getDay()).toBe(6);
		expect(date.getDate()).toBe(9);
	});

	test('clone', () => {
		const date = new BambooDate();
		const clone = date.clone();
		expect(clone.toString()).toBe(date.toString());
	});
});
