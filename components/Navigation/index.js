import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import HorizontalNav from './HorizontalNav';
import VerticalNav from './VerticalNav';
import FakeItem from './FakeItem';

const Navigation = (props) => {
	if (props.vertical) {
		return <VerticalNav {...props} />;
	}
	return <HorizontalNav {...props} />;
};

Navigation.propTypes = {
	type: PropTypes.string,
	active: PropTypes.number,
	children: PropTypes.node,

	vertical: PropTypes.bool,
};

Navigation.Item = FakeItem;

export default Navigation;
