import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavItem from './NavItem';

const HorizontalNav = ({ type, children, className, ...props }) => (
	<ul
		className={classNames('bmbo-horizontal-nav',
			`bmbo-${type || 'lead'}`,
			className,
		)}
		{...props}
	>
		{children}
	</ul>
);


HorizontalNav.propTypes = {
	type: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default HorizontalNav;
