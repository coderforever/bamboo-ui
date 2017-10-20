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
		const { children, className, disabled, size, transparent, checked, ...props } = this.props;
		const type = this.props.type || 'primary';

		delete props.type;
		delete props.onClick;

		return (
			<button
				className={classNames(
					'bmbo-button',
					type && `bmbo-${type}`,
					disabled && 'bmbo-disabled',
					`bmbo-${size || 'md'}`,
					transparent && 'bmbo-transparent',
					checked && 'bmbo-checked',
					className,
				)}
				onClick={this.onClick}

				{...props}
			>
				{children}
			</button>
		);
	}
}

Button.propTypes = {
	children: PropTypes.node,

	type: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	transparent: PropTypes.bool,
	checked: PropTypes.bool,
};

export default Button;
