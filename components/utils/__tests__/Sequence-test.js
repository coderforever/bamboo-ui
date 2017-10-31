import Sequence from '../Sequence';

describe('Sequence', () => {
	test('Sequence tasks', () => {
		let value = 0;
		let timestamp = 0;
		let done = false;

		const seq = new Sequence();
		return seq
			.next(() => {
				expect(value).toBe(0);
				value = 1;
				timestamp = Date.now();
			})
			.next(() => {
				expect(value).toBe(1);
				expect(Date.now() - timestamp >= 1000).toBeTruthy();
				value = 2;
				timestamp = Date.now();
			}, { delay: 1000 })
			.next(() => {
				expect(value).toBe(2);
				expect(Date.now() - timestamp >= (1000 / 60) * 4).toBeTruthy();
				value = 3;
			}, { frame: 10 })
			.next(() => {
				expect(value).toBe(3);
				done = true;
			}).promise.then(() => {
				expect(done).toBe(true);
			});
	});

	test('Sequence tasks occupy', () => {
		const seq = new Sequence();

		let value;
		const promise1 = seq.next(() => {
			value = 111;
		}).promise;
		const promise2 = seq.next(() => {
			value = 222;
		}).promise;
		const promise3 = seq.next(() => {
			value = 333;
		}, { priority: -1 }).promise;

		return Promise.race([promise1, promise2, promise3]).then(() => {
			expect(value).toBe(222);
		});
	});

	test('Sequence tasks interrupt', () => {
		const seq = new Sequence();

		let value;
		const promise1 = seq.next(() => {
			value = 111;
		}).next(() => {
			value = 222;
		}, { delay: 1000 }).promise;

		// Never then
		promise1.then(() => {
			expect(true).toBe(false);
		});

		return Promise.resolve().then(() => {
			setTimeout(() => {
				const promise2 = seq.next(() => {
					expect(value).toBe(111);
					value = 333;
				}).promise;

				expect(value).toBe(111);

				return promise2.then(() => {
					expect(value).toBe(333);
				});
			}, 500);
		});
	});

	test('Sequence tasks destroy', (done) => {
		const seq = new Sequence();
		let value = 0;

		seq.next(() => {
			value = 111;
		}, { delay: 100 }).next(() => {
			value = 222;
		}, { delay: 1000 }).promise.then(() => {
			expect(true).toBe(false);
		});

		setTimeout(() => {
			seq.destroy();
		}, 800);

		setTimeout(() => {
			expect(value).toBe(111);
			done();
		}, 2000);
	});

	test('Sequence task loop', () => {
		const seq = new Sequence();
		let value = 0;
		let times = 0;

		return seq.next(() => {
			value += 10;
		}).next(() => {
			value += 1;
			times += 1;

			if (times >= 10) {
				return false;
			}
		}, {
			loop: true,
		}).promise.then(() => {
			expect(value).toBe(20);
			expect(times).toBe(10);
		});
	});
});
