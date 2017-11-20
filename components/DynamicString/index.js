import React from 'react';
import PropTypes from 'prop-types';

import Sequence from '../utils/Sequence';

class DynamicString extends React.Component {
	constructor() {
		super();
		this.state = {
			current: '',
		};

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
		const { value, duration, step } = props;
		const currentValue = this.state.current;

		// Ignore if value not change
		if (value === currentValue) {
			this.seq.stop();
			return;
		}

		const totalLen = currentValue.length + value.length;
		if (totalLen === 0) {
			// Skip if not word left
			this.seq.stop();
			this.setState({ current: '' });
			return;
		}

		const hidePtg = currentValue.length / totalLen;

		if (step) {
			// Use step
			let myStep = Math.ceil(Math.abs(step));
			if (isNaN(myStep) || myStep === 0) myStep = 1;

			let hiding = true;
			let current = currentValue;
			this.seq.next(() => {
				if (hiding) {
					const len = Math.max(0, current.length - step);
					current = current.slice(0, len);
					this.setState({ current });

					if (len === 0) hiding = false;
				} else {
					current = value.slice(0, current.length + step);
					this.setState({ current });

					if (current.length === value.length) return false;
				}

				return null;
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
					this.setState({ current: value });
					return false;
				}

				const ptg = distance / duration;
				if (ptg < hidePtg) {
					const desPtg = (hidePtg - ptg) / hidePtg;
					this.setState({
						current: currentValue.slice(0, Math.floor(currentValue.length * desPtg)),
					});
				} else {
					const desPtg = (ptg - hidePtg) / (1 - hidePtg);
					this.setState({ current: value.slice(0, Math.floor(value.length * desPtg)) });
				}

				return null;
			}, {
				loop: true,
			});
		}
	};

	render() {
		const { current } = this.state;
		const { cursor, ...props } = this.props;
		delete props.value;
		delete props.duration;
		delete props.step;

		return (
			<span {...props}>
				{current}
				{cursor && <span className="bmbo-text-cursor" />}
			</span>
		);
	}
}

DynamicString.propTypes = {
	value: PropTypes.string,
	duration: PropTypes.number,
	step: PropTypes.number,
	cursor: PropTypes.bool,
};

DynamicString.defaultProps = {
	duration: 1000,
};

export default DynamicString;
