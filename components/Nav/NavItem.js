import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const NavItem = ({ children, onClick, active, disabled, className, ...props }) => (
	<li
		className={classNames(
			'bmbo-nav-item',
			active && 'bmbo-active',
			disabled && 'bmbo-disabled',
			className,
		)}
		role="button"
		tabIndex={-1}
		onClick={onClick}
		{...props}
	>
		{children}
	</li>
);

NavItem.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	className: PropTypes.string,

	active: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default NavItem;
