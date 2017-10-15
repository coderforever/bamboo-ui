import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavItem from './NavItem';

class HorizontalNav extends React.Component {
	render() {
		const { type, children } = this.props;

		return (
			<ul
				className={classNames('bmbo-horizontal-nav',
					`bmbo-${type || 'default'}`,
				)}
			>
				{children}
			</ul>
		);
	}
}

HorizontalNav.propTypes = {
	type: PropTypes.string,
	children: PropTypes.node,
};

export default HorizontalNav;
