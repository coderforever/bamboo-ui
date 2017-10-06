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

function valueSort(a, b) {
	return a - b;
}

if (canUseDOM) {
	window.addEventListener('mousemove', (event) => {
		if (!currentSlider) return;

		const ptg = getEventPercentage(currentSlider.$pinHolder, event);

		currentSlider.setValuePtg(ptg, event);
		event.preventDefault();
	});

	window.addEventListener('mouseup', () => {
		if (currentSlider) {
			currentSlider.pinIndex = undefined;
			currentSlider.finishUpdate();
			currentSlider = null;
		}
	});
}

class Pin extends React.Component {
	onMouseDown = (event) => {
		const { onMouseDown, index } = this.props;
		if (onMouseDown) onMouseDown(event, index);
	};

	setRef = (ele) => {
		const { setRef, index } = this.props;
		if (setRef) setRef(ele, index);
	};

	render() {
		const { left, index, isMark, isActive } = this.props;

		return (
			<div
				className={classNames('bmbo-slider-pin', isMark && 'bmbo-mark', isActive && 'bmbo-active')}
				onMouseDown={this.onMouseDown}
				style={{ left }}
				role="button"
				tabIndex={-1}
				ref={this.setRef}
				data-index={index}
			/>
		);
	}
}

Pin.propTypes = {
	setRef: PropTypes.func,
	left: PropTypes.string,
	index: PropTypes.number,
	onMouseDown: PropTypes.func,
	isMark: PropTypes.bool,
	isActive: PropTypes.bool,
};

class Slider extends React.Component {
	constructor() {
		super();
		this.$pins = {};
		this.state = {
			value: null, // Component handle value when user is operating
		};
	}

	onBarMouseDown = (...args) => {
		const { disabled, onMouseDown, value } = this.props;
		if (disabled || this.getPinCount() > 1) return;

		if (onMouseDown) onMouseDown(...args);

		const event = args[0].nativeEvent;

		this.setState({
			value,
		}, () => {
			this.pinIndex = 0;
			currentSlider = this;
			this.setValuePtg(getEventPercentage(this.$pinHolder, event), event);
		});
	};

	onPinMouseDown = (event, index) => {
		const { disabled, value } = this.props;
		if (disabled) return;

		this.setState({
			value,
		}, () => {
			this.pinIndex = index;
			currentSlider = this;
		});

		event.stopPropagation();
	};

	setPinRef = (ele, index) => {
		this.$pins[index] = ele;
	};

	setPinHolderRef = (ele) => {
		this.$pinHolder = ele;
	};

	setValuePtg = (ptg, event) => {
		if (this.pinIndex === undefined) return;

		const { onChange } = this.props;
		const value = this.getValue();
		let { min = 0, max = 100, step = 1 } = this.props;

		min = Number(min);
		max = Number(max);
		step = Number(step);

		const len = max - min;
		const offset = Math.round((len * ptg) / step) * step;
		const pinValue = offset + min;

		let newValue;
		if (Array.isArray(value)) {
			newValue = value.concat();
			newValue[this.pinIndex] = pinValue;
		} else if (this.getPinCount() === 1) {
			newValue = pinValue;
		} else {
			newValue = [];
			newValue[this.pinIndex] = pinValue;
		}

		let outputValue = newValue;

		// Clean up empty value
		if (Array.isArray(newValue)) {
			for (let i = newValue.length - 1; i >= 0; i -= 1) {
				const val = newValue[i];
				if (val === null || val === undefined) {
					newValue[i] = min;
				}
			}

			outputValue = newValue.concat().sort(valueSort);
		}

		// Sync local value
		this.setState({
			value: newValue,
		});

		const newEvent = wrapperEventValue(
			event,
			this.$pins[this.pinIndex],
			outputValue,
		);

		if (onChange) {
			onChange(newEvent);
		}
	};

	getPinCount = () => {
		const { multi } = this.props;
		if (!multi) return 1;
		return multi === true ? 2 : Math.max(multi, 1);
	};

	getValue = () => {
		if (this.isOperating()) {
			return this.state.value;
		}
		return this.props.value;
	};

	getPinValue = (index) => {
		const value = this.getValue();
		let { min = 0, max = 100 } = this.props;
		let current;

		if (Array.isArray(value)) {
			current = value[index];
		} else if (this.getPinCount() === 1) {
			current = value;
		} else {
			current = min;
		}

		min = Number(min);
		max = Number(max);
		current = Number(current);

		if (current === null || current === undefined || isNaN(current) || current < min) current = min;
		if (current > max) current = max;

		return current;
	};

	isOperating = () => currentSlider === this;

	finishUpdate = () => {
		// Sync slider value with props value when user finish dragging
		Promise.resolve().then(() => {
			this.forceUpdate();
		});
	};

	render() {
		const { min = 0, max = 100, type, disabled, transparent, marks = {} } = this.props;

		const pinCount = this.getPinCount();

		const $pinList = [];
		let rangeMin = Number.MAX_VALUE;
		let rangeMax = Number.MIN_VALUE;

		for (let i = 0; i < pinCount; i += 1) {
			const value = this.getPinValue(i);

			// Pin list
			const left = getLeft(value, min, max);
			$pinList.push(
				<Pin
					key={i}
					index={i}
					setRef={this.setPinRef}
					onMouseDown={this.onPinMouseDown}
					left={left}
				/>,
			);

			// Get limitation
			if (pinCount > 1) {
				rangeMin = Math.min(rangeMin, value);
			} else {
				rangeMin = min;
			}
			rangeMax = Math.max(rangeMax, value);
		}

		// Pin range
		const rangeWidthPtg = (rangeMax - rangeMin) / (max - min);

		// Marks
		const $markList = Object.keys(marks).map((markValue) => {
			const value = Number(markValue);
			if (isNaN(value) || value < min || value > max) {
				console.warn('[Bamboo - Slider] Mark is out of range:', markValue, `(Range: ${min} ~ ${max}`);
				return null;
			}

			const left = getLeft(value, min, max);

			return (
				<Pin
					key={`mark_${markValue}`}
					left={left}
					isMark
					isActive={rangeMin <= value && value <= rangeMax}
				/>
			);
		});

		return (
			<div
				className={classNames(
					'bmbo-slider',
					pinCount === 1 && 'bmbo-single',
					type && `bmbo-${type}`,
					disabled && 'bmbo-disabled',
					transparent && 'bmbo-transparent',
				)}

				onMouseDown={this.onBarMouseDown}
			>
				<div className="bmbo-slider-bar" ref={this.setPinHolderRef} />

				<div
					className="bmbo-slider-range"
					style={{
						left: getLeft(rangeMin, min, max),
						width: `${rangeWidthPtg * 100}%`,
					}}
				/>

				{$markList}

				{$pinList}
			</div>
		);
	}
}

Slider.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	type: PropTypes.string,
	transparent: PropTypes.bool,
	disabled: PropTypes.bool,
	multi: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	marks: PropTypes.object,

	onMouseDown: PropTypes.func,
	onChange: PropTypes.func,
};

export default Slider;
