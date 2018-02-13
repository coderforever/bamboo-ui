import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BAMBOO_COMPONENT } from '../utils/componentUtil';

import Checkbox from './Checkbox';

export const BAMBOO_FORM_SELECT_OPTION = 'BAMBOO_FORM_SELECT_OPTION';

class SelectOption extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	onClick = (...args) => {
		const { onClick, value, children } = this.props;
		const { bmboOnSelectValue } = this.context;

		const myVal = value !== undefined ? value : children;

		if (bmboOnSelectValue) bmboOnSelectValue(myVal, ...args);
		if (onClick) onClick(...args);
	};

	render() {
		const { disabled, value, children, ...props } = this.props;
		const {
			bmboSelectMulti, bmboSelectDisabled,
			bmboSelectSize, bmboSelectIsChecked,
		} = this.context;

		let myDisabled;
		if (disabled !== undefined) {
			myDisabled = disabled;
		} else if (bmboSelectDisabled !== undefined) {
			myDisabled = bmboSelectDisabled;
		}

		let $children = children;
		if (bmboSelectMulti) {
			$children = (
				<Checkbox
					size={bmboSelectSize}
					checked={bmboSelectIsChecked(value === undefined ? children : value)}
					disabled={myDisabled}
				>
					{children}
				</Checkbox>
			);
		}

		return (
			<li
				role="button"
				tabIndex={-1}
				className={classNames(
					'bmbo-select-item bmbo-padding',
					myDisabled && 'bmbo-disabled',
				)}
				{...props}
				onClick={myDisabled ? null : this.onClick}
			>
				{$children}
			</li>
		);
	}
}

SelectOption.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node,
	value: PropTypes.node,
	disabled: PropTypes.bool,
};

SelectOption.contextTypes = {
	bmboSelectSize: PropTypes.string,
	bmboSelectMulti: PropTypes.bool,
	bmboSelectDisabled: PropTypes.bool,
	bmboOnSelectValue: PropTypes.func,
	bmboSelectIsChecked: PropTypes.func,
};

SelectOption[BAMBOO_COMPONENT] = BAMBOO_FORM_SELECT_OPTION;

export default SelectOption;
