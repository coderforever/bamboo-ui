import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavList from './NavList';

class NavItem extends React.Component {
	render() {
		const { children } = this.props;

		return (
			<li
				className={classNames('bmbo-nav-item')}
			>
				<a>
					{children}
				</a>
			</li>
		);
	}
}

NavItem.propTypes = {
	children: PropTypes.node,
};

export default NavItem;
