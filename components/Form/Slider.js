import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { wrapperEventValue } from '../utils/componentUtil';
import { canUseDOM } from '../utils/envUtil';

let currentSlider;

function getEventPercentage(holder, event) {
	const { clientX } = event;

	const { left, width } = holder.getBoundingClientRect();
	let ptg = (clientX - left) / width;
	if (ptg < 0) ptg = 0;
	if (ptg > 1) ptg = 1;

	return ptg;
}

function getLeft(value, min, max) {
	const offset = value - min;
	const len = max - min;

	return `${(offset / len) * 100}%`;
}

if (canUseDOM) {
	window.addEventListener('mousemove', (event) => {
		if (!currentSlider) return;

		const ptg = getEventPercentage(currentSlider.$pinHolder, event);

		currentSlider.setValuePtg(ptg, event);
		event.preventDefault();
	});

	window.addEventListener('mouseup', () => {
		if (currentSlider) currentSlider = null;
	});
}

class Slider extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	onBarMouseDown = (...args) => {
		const { disabled, onMouseDown } = this.props;
		if (disabled) return;

		if (onMouseDown) onMouseDown(...args);

		const event = args[0];
		currentSlider = this;
		this.setValuePtg(getEventPercentage(this.$pinHolder, event), event);
	};

	onPinMouseDown = () => {
		const { disabled } = this.props;
		if (disabled) return;

		currentSlider = this;
	};

	setPinHolderRef = (ele) => {
		this.$pinHolder = ele;
	};

	setPinRef = (ele) => {
		this.$pin = ele;
	};

	setValuePtg = (ptg, event) => {
		const { onChange } = this.props;
		let { min = 0, max = 100, step = 1 } = this.props;

		min = Number(min);
		max = Number(max);
		step = Number(step);

		const len = max - min;
		const offset = Math.round((len * ptg) / step) * step;
		const value = offset + min;
		const newEvent = wrapperEventValue(event, this.$pin, value);

		if (onChange) {
			onChange(newEvent);
		}
	};

	getValue = () => {
		let { value, min, max } = this.props;

		min = Number(min);
		max = Number(max);
		value = Number(value);

		if (value < min) value = min;
		if (value > max) value = max;

		return value;
	};

	render() {
		const { min = 0, max = 100, type, disabled, transparent } = this.props;
		const left = getLeft(this.getValue(), min, max);

		return (
			<div
				className={classNames(
					'bmbo-slider',
					type && `bmbo-${type}`,
					disabled && 'bmbo-disabled',
					transparent && 'bmbo-transparent',
				)}

				onMouseDown={this.onBarMouseDown}
			>
				<div className="bmbo-slider-bar" ref={this.setPinHolderRef} />

				<div
					className="bmbo-slider-range"
					style={{ width: left }}
				/>

				<div
					className="bmbo-slider-pin"
					ref={this.setPinRef}
					onMouseDown={this.onPinMouseDown}
					style={{ left }}
					role="button"
					tabIndex={-1}
				/>
			</div>
		);
	}
}

Slider.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
	min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	type: PropTypes.string,
	transparent: PropTypes.bool,
	disabled: PropTypes.bool,

	onMouseDown: PropTypes.func,
	onChange: PropTypes.func,
};

export default Slider;
