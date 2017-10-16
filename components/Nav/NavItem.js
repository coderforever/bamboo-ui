import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavList from './NavList';

class NavItem extends React.Component {
	render() {
		const { children, onClick, active } = this.props;

		return (
			<li
				className={classNames('bmbo-nav-item', active && 'bmbo-active')}
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
};

export default NavItem;
