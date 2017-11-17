import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isDev } from '../utils/envUtil';
import { requestAnimationFrame } from '../utils/uiUtil';
import { addUniqueListener, removeUniqueListener, isSameSource, wrapperEventValue } from '../utils/eventUtil';
import { toArray } from '../utils/arrayUtil';

import SelectList from './SelectList';
import SelectOption from './SelectOption';

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
			bmboSelectIsChecked: this.isValueChecked,
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

	setRef = (ele) => {
		this.$ele = ele;
	};

	isValueChecked = (val) => {
		const { value } = this.props;
		return toArray(value).includes(val);
	};

	render() {
		const { size, className, value, multi, children, ...props } = this.props;
		const { open, rect } = this.state;

		delete props.onChange;

		let $value = value;
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
					<span className="bmbo-caret bmbo-caret-down" />
				</div>

				<SelectList size={size} open={open} rect={rect}>
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
	bmboOnSelectValue: PropTypes.func,
};

Select.Option = SelectOption;

export default Select;
