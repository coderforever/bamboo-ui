import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isDev } from '../utils/envUtil';
import { requestAnimationFrame } from '../utils/uiUtil';
import { addUniqueListener, removeUniqueListener, isSameSource, wrapperEventValue } from '../utils/eventUtil';
import { toArray } from '../utils/arrayUtil';

import Caret from '../Icon/Caret';
import CheckBox from '../Form/Checkbox';
import SelectList from './SelectList';
import SelectOption, { BAMBOO_FORM_SELECT_OPTION } from './SelectOption';
import SelectGroup, { BAMBOO_FORM_SELECT_GROUP, getValueList } from './SelectGroup';

class Select extends React.Component {
	constructor() {
		super();
		this.state = {
			open: false,
		};
	}

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

	onWindowHide = (event) => {
		if (isSameSource(event, this.$ele)) return;

		removeUniqueListener('mousedown', this.onWindowHide);
		removeUniqueListener('blur', this.onWindowHide);

		this.setState({ open: false });
	};

	onTitleMouseDown = () => {
		this.setState(({ open }) => {
			const newState = {
				open: !open,
			};

			// Show animation
			if (newState.open) {
				if (!this.$ele) return null;

				newState.rect = this.$ele.getBoundingClientRect();

				requestAnimationFrame(() => {
					addUniqueListener('mousedown', this.onWindowHide);
					if (!isDev) addUniqueListener('blur', this.onWindowHide);
				});
			}

			return newState;
		});
	};

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

		if (!multi) {
			this.setState({ open: false });
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
		const { size, className, value, multi, children, ...props } = this.props;
		const { open, rect } = this.state;

		delete props.onChange;

		let $value;
		if (multi) {
			const valueList = toArray(value);
			$value = (
				<ul className="bmbo-list-inline">
					{valueList.map(val => (
						<li key={val}>{val}</li>
					))}
					{!valueList.length && <li>{'\u00A0'}</li>}
				</ul>
			);
		} else {
			$value = (
				<ul className="bmbo-list-inline">
					<li>{value || '\u00A0'}</li>
				</ul>
			);
		}

		return (
			<div
				className="bmbo-select"
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
					onMouseDown={this.onTitleMouseDown}
				>
					{$value}
					<Caret direct="down" />
				</div>

				<SelectList size={size} open={open} rect={rect}>
					{multi && <li
						className="bmbo-select-item bmbo-padding bmbo-select-item-all"
						onClick={this.onSelectAllValue}
						role="button"
						tabIndex={-1}
					>
						<CheckBox checked={this.isAllValueChecked()}>
							Select All
						</CheckBox>
					</li>}
					{children}
				</SelectList>
			</div>
		);
	}
}

Select.propTypes = {
	onChange: PropTypes.func,
	size: PropTypes.string,
	className: PropTypes.string,
	value: PropTypes.any,
	children: PropTypes.node,
	multi: PropTypes.bool, // TODO: Support number if necessary
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
