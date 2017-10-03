import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import HorizontalNav from './HorizontalNav';
import Item, { BAMBOO_NAVIGATION_ITEM } from './FakeItem';

import { mapChildrenByType } from '../utils/componentUtil';

class Navigation extends React.Component {
	render() {
		const { vertical } = this.props;

		if (!vertical) {
			return <HorizontalNav {...this.props} />;
		}
		return null;
	}
}

Navigation.propTypes = {
	type: PropTypes.string,
	active: PropTypes.number,
	children: PropTypes.node,

	vertical: PropTypes.bool,
};

/* Navigation.childContextTypes = {
	// navigationVertical: PropTypes.bool,
}; */

Navigation.Item = Item;

export default Navigation;
