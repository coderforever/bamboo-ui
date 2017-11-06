import React from 'react';
import PropTypes from 'prop-types';

import HorizontalNav from './HorizontalNav';
import VerticalNav from './VerticalNav';
import NavGroup from './NavGroup';
import NavItem from './NavItem';

class Nav extends React.Component {
	getChildContext() {
		return {
			navType: this.props.type,
			navVertical: this.props.vertical,
			navInline: this.props.inline,
		};
	}

	render() {
		const { vertical, ...props } = this.props;
		delete props.inline;

		if (vertical) return <VerticalNav {...props} />;
		return <HorizontalNav {...props} />;
	}
}

Nav.propTypes = {
	vertical: PropTypes.bool,
	type: PropTypes.string,
};

Nav.childContextTypes = {
	navType: PropTypes.string,
	navVertical: PropTypes.bool,
	navInline: PropTypes.bool,
};

Nav.Group = NavGroup;
Nav.Item = NavItem;

export default Nav;
