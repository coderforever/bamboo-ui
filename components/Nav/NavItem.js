import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavList from './NavList';

class NavItem extends React.Component {
	constructor() {
		super();
		this.state = {
			hover: false,
			rect: null,
		};
	}

	onMouseEnter = () => {
		const rect = this.$title.getBoundingClientRect();
		this.setState({ hover: true, rect });
	};
	onMouseLeave = () => {
		this.setState({ hover: false });
	};

	setTitleRef = (ele) => {
		this.$title = ele;
	};

	render() {
		const { title } = this.props;
		const { hover, rect } = this.state;

		return (
			<li
				className={classNames('bmbo-nav-item', hover && 'bmbo-hover')}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				<a ref={this.setTitleRef}>
					{title}
				</a>

				<NavList visible={hover} rect={rect} />
			</li>
		);
	}
}

NavItem.propTypes = {
	title: PropTypes.node,
};

export default NavItem;
