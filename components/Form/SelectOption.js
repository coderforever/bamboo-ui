import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

class SelectOption extends React.PureComponent {
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
		const { children, ...props } = this.props;
		const { bmboSelectSize = 'md' } = this.context;

		return (
			<li
				role="button"
				tabIndex={-1}
				className={`bmbo-${bmboSelectSize}`}
				{...props}
				onClick={this.onClick}
			>
				{children}
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
	bmboOnSelectValue: PropTypes.func,
};

export default SelectOption;
