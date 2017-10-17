import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Progress extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	getPercentage = () => {
		const { min, max, value } = this.props;
		let myValue = value;
		if (myValue > max) myValue = max;
		if (myValue < min) myValue = min;
		return Math.floor(((myValue - min) * 100) / (max - min));
	};

	render() {
		const { type, size, active, showMark } = this.props;
		const ptg = this.getPercentage();

		return (
			<div
				className={classNames(
					'bmbo-progress',
					`bmbo-${type || 'primary'}`,
					`bmbo-${size || 'md'}`,
					active && 'bmbo-active',
				)}
				role="progressbar"
			>
				<div className="bmbo-progress-bar" style={{ width: `${ptg}%` }}>
					{showMark && <span className="bmbo-mark">{ptg}%</span>}
				</div>
			</div>
		);
	}
}

Progress.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	value: PropTypes.number,

	type: PropTypes.string,
	size: PropTypes.string,
	active: PropTypes.bool,
	showMark: PropTypes.bool,
};

Progress.defaultProps = {
	min: 0,
	max: 100,
	value: 100,
};

export default Progress;
