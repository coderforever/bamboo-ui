import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Button extends React.Component {
	onClick = (...args) => {
		const { onClick, disabled } = this.props;

		if (disabled) return;
		if (onClick) onClick(...args);
	};

	render() {
		const { children, type, disabled, size, transparent } = this.props;

		return (
			<button
				className={classNames(
					'bmbo-button',
					type && `bmbo-${type}`,
					disabled && 'bmbo-disabled',
					size && `bmbo-${size}`,
					transparent && 'bmbo-transparent',
				)}
			>
				{children}
			</button>
		);
	}
}

Button.propTypes = {
	children: PropTypes.node,

	type: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	size: PropTypes.string,
	transparent: PropTypes.bool,
};

export default Button;
