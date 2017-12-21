import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { wrapperEventValue } from '../utils/eventUtil';
import { toArray } from '../utils/arrayUtil';

import Caret from '../Icon/Caret';
import CheckBox from '../Form/Checkbox';
import PinBox from '../PinBox';
import SelectOption from './SelectOption';
import SelectGroup, { getValueList, getNodeList } from './SelectGroup';

function getTitle(optionList, value) {
	const option = optionList.find(opt => opt.value === value);
	if (!option) return null;

	return option.title;
}

class Select extends React.Component {
	getChildContext() {
		return {
			bmboSelectSize: this.props.size,
			bmboSelectMulti: this.props.multi,
			bmboOnSelectValue: this.onSelectValue,
			bmboOnSelectValues: this.onSelectValues,
			bmboSelectIsChecked: this.isValueChecked,
			bmboSelectIsAllChecked: this.isAllValueChecked,
		};
	}

	onSelectValue = (value, event) => {
		const { onChange, multi, value: oriValue } = this.props;

		let newValue;
		if (multi) {
			newValue = oriValue;
			if (!Array.isArray(newValue)) {
				newValue = newValue ? [newValue] : [];
			}

			if (newValue.includes(value)) {
				newValue = newValue.filter(v => v !== value);
			} else {
				newValue = [...newValue, value];
			}
		} else {
			newValue = value;
		}

		if (onChange) {
			onChange(wrapperEventValue(event, this.$ele, newValue));
		}

		if (!multi && this.$pin) {
			this.$pin.setVisible(false);
		}
	};

	onSelectValues = (event, valueList, checked) => {
		const { children, value, onChange } = this.props;
		const myList = valueList || getValueList(children);
		const myChecked = checked !== undefined ? checked : !this.isAllValueChecked();
		let newValue = [...toArray(value)];

		if (myChecked) {
			myList.forEach((val) => {
				if (!newValue.includes(val)) {
					newValue.push(val);
				}
			});
		} else {
			newValue = newValue.filter(val => !myList.includes(val));
		}

		if (onChange) {
			onChange(wrapperEventValue(event, this.$ele, newValue));
		}
	};

	onSelectAllValue = (event) => {
		this.onSelectValues(event);
	};

	setRef = (ele) => {
		this.$ele = ele;
	};

	setPinRef = (ele) => {
		this.$pin = ele;
	};

	isValueChecked = (val) => {
		const { value } = this.props;
		return toArray(value).includes(val);
	};

	isAllValueChecked = () => {
		const { value, children } = this.props;
		const myValue = toArray(value);

		const allValueList = getValueList(children);
		return allValueList.every(val => myValue.includes(val));
	};

	render() {
		const { disabled, size, className, value, multi, children, ...props } = this.props;
		delete props.onChange;

		// =============================== Value ===============================
		const optionList = getNodeList(children);

		let $value;
		if (multi) {
			const valueList = toArray(value);
			$value = (
				<ul className="bmbo-list-inline">
					{valueList.map(val => (
						<li key={val}>
							{getTitle(optionList, val)}
						</li>
					))}
					{!valueList.length && <li>{'\u00A0'}</li>}
				</ul>
			);
		} else {
			$value = (
				<ul className="bmbo-list-inline">
					<li>{getTitle(optionList, value) || '\u00A0'}</li>
				</ul>
			);
		}

		// ================================ List ===============================
		const canSelectAll = optionList.every(opt => !opt.disabled);

		const $list = disabled ? null : (
			<ul
				className={classNames(
					'bmbo-select-list',
					'bmbo-list-unstyled',
					`bmbo-${size || 'md'}`,
				)}
			>
				{multi && canSelectAll && <li
					className="bmbo-select-item bmbo-padding bmbo-select-item-all"
					onClick={this.onSelectAllValue}
					role="button"
					tabIndex={-1}
				>
					<CheckBox size={size} checked={this.isAllValueChecked()}>
						Select All
					</CheckBox>
				</li>}
				{children}
			</ul>
		);

		// =============================== Render ==============================
		return (
			<PinBox pin={$list} ref={this.setPinRef} backdrop stretch>
				<div
					className={classNames(
						'bmbo-select',
						disabled && 'bmbo-disabled',
					)}
					{...props}
					ref={this.setRef}
				>
					<div
						className={classNames(
							'bmbo-select-value',
							`bmbo-${size || 'md'}`,
							className,
						)}

						role="button"
						tabIndex={0}
					>
						{$value}
						<Caret direct="down" />
					</div>
				</div>
			</PinBox>
		);
	}
}

Select.propTypes = {
	onChange: PropTypes.func,
	size: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.any,
	children: PropTypes.node,
	multi: PropTypes.bool,
	disabled: PropTypes.bool,
};

Select.childContextTypes = {
	bmboSelectSize: PropTypes.string,
	bmboSelectMulti: PropTypes.bool,
	bmboSelectIsChecked: PropTypes.func,
	bmboSelectIsAllChecked: PropTypes.func,
	bmboOnSelectValue: PropTypes.func,
	bmboOnSelectValues: PropTypes.func,
};

Select.Option = SelectOption;
Select.Group = SelectGroup;

export default Select;
