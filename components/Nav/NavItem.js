import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavList from './NavList';

class NavItem extends React.Component {
	render() {
		const { children, onClick, active, disabled } = this.props;

		return (
			<li
				className={classNames(
					'bmbo-nav-item',
					active && 'bmbo-active',
					disabled && 'bmbo-disabled',
				)}
				role="button"
				tabIndex={-1}
				onClick={onClick}
			>
				{children}
			</li>
		);
	}
}

NavItem.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,

	active: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default NavItem;
