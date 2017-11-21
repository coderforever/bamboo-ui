import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Label = ({ type, size, className, children, ...props }) => (
	<span
		className={classNames(
			'bmbo-label',
			`bmbo-${type || 'primary'}`,
			`bmbo-${size || 'md'}`,
			className,
		)}
		{...props}
	>
		{children}
	</span>
);

Label.propTypes = {
	children: PropTypes.node,

	type: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	transparent: PropTypes.bool,
	checked: PropTypes.bool,
};

export default Label;
