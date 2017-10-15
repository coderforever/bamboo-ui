import React from 'react';
import PropTypes from 'prop-types';

import HorizontalNav from './HorizontalNav';
import NavItem from './NavItem';

const Nav = ({ vertical, ...props }) => {
	if (vertical) return null;
	return <HorizontalNav {...props} />;
};

Nav.propTypes = {
	vertical: PropTypes.bool,
};

Nav.Item = NavItem;

export default Nav;
