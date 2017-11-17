import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import { BAMBOO_COMPONENT } from '../utils/componentUtil';

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
		const { value, children, ...props } = this.props;
		const { bmboSelectMulti, bmboSelectSize, bmboSelectIsChecked } = this.context;

		let $children = children;
		if (bmboSelectMulti) {
			$children = (
				<Checkbox size={bmboSelectSize} checked={bmboSelectIsChecked(value || children)}>
					{children}
				</Checkbox>
			);
		}

		return (
			<li
				role="button"
				tabIndex={-1}
				className={`bmbo-${bmboSelectSize || 'md'} bmbo-select-item`}
				{...props}
				onClick={this.onClick}
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
};

SelectOption.contextTypes = {
	bmboSelectSize: PropTypes.string,
	bmboSelectMulti: PropTypes.bool,
	bmboOnSelectValue: PropTypes.func,
	bmboSelectIsChecked: PropTypes.func,
};

SelectOption[BAMBOO_COMPONENT] = BAMBOO_FORM_SELECT_OPTION;

export default SelectOption;
