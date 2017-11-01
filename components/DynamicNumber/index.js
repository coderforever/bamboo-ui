import React from 'react';
import PropTypes from 'prop-types';

import Sequence from '../utils/Sequence';

class DynamicNumber extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 0,
		};

		// Not affect render, just use as inner variable
		this.origin = 0;
		this.target = 0;
		this.passTime = 0;

		this.seq = new Sequence();
	}

	componentWillMount() {
		this.doAnimation(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.doAnimation(nextProps);
	}

	componentWillUnmount() {
		this.seq.destroy();
	}

	doAnimation = (props) => {
		const { value, duration, step, decimal } = props;

		// Ignore if value not change
		if (value === this.state.target) return;

		const currentValue = Number(this.state.current);
		const startValue = isNaN(currentValue) ? 0 : currentValue;

		if (step) {
			// Use step
			let myStep = Math.abs(step);
			if (isNaN(myStep) || myStep === 0) myStep = 1;

			const frameStep = currentValue < value ? myStep : -myStep;
			let current = currentValue;

			this.seq.next(() => {
				if (Math.abs(current - value) <= myStep) {
					this.setState({ current: value.toFixed(decimal) });
					return false;
				}

				current += frameStep;
				this.setState({ current: current.toFixed(decimal) });

				return true;
			}, {
				loop: true,
			});
		} else {
			// Use duration
			const startTime = Date.now();

			this.seq.next(() => {
				const currentTime = Date.now();
				const distance = currentTime - startTime;

				if (distance >= duration) {
					this.setState({ current: value.toFixed(decimal) });
					return false;
				}

				const current = (startValue + ((value - startValue) * (distance / duration)))
					.toFixed(decimal);
				this.setState({ current });

				return true;
			}, {
				loop: true,
			});
		}
	};

	render() {
		const { current } = this.state;
		const props = { ...this.props };
		delete props.value;
		delete props.duration;
		delete props.decimal;
		delete props.step;

		return (
			<span {...props}>{current}</span>
		);
	}
}

DynamicNumber.propTypes = {
	value: PropTypes.number,
	duration: PropTypes.number,
	decimal: PropTypes.number,
	step: PropTypes.number,
};

DynamicNumber.defaultProps = {
	duration: 1000,
	decimal: 0,
};

export default DynamicNumber;
