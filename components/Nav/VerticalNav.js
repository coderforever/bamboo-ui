import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavItem from './NavItem';

const VerticalNav = ({ type, children, className, ...props }) => (
	<ul
		className={classNames('bmbo-nav', 'bmbo-vertical-nav',
			`bmbo-${type || 'lead'}`,
			className,
		)}
		{...props}
	>
		{children}
	</ul>
);


VerticalNav.propTypes = {
	type: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default VerticalNav;
