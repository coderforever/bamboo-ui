import React from 'react';
import PropTypes from 'prop-types';

import HorizontalNav from './HorizontalNav';
import NavGroup from './NavGroup';
import NavItem from './NavItem';

class Nav extends React.Component {
	getChildContext() {
		return {
			navType: this.props.type,
		};
	}

	render() {
		const { vertical, ...props } = this.props;

		if (vertical) return null;
		return <HorizontalNav {...props} />;
	}
}

Nav.propTypes = {
	vertical: PropTypes.bool,
	type: PropTypes.string,
};

Nav.childContextTypes = {
	navType: PropTypes.string,
};

Nav.Group = NavGroup;
Nav.Item = NavItem;

export default Nav;
