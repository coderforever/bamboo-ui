import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import NavList from './NavList';

class NavGroup extends React.Component {
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
		const { title, children } = this.props;
		const { hover, rect } = this.state;

		return (
			<li
				className={classNames('bmbo-nav-group', hover && 'bmbo-hover')}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				<a ref={this.setTitleRef}>
					{title}
				</a>

				<NavList visible={hover} rect={rect}>
					{children}
				</NavList>
			</li>
		);
	}
}

NavGroup.propTypes = {
	title: PropTypes.node,
	children: PropTypes.node,
};

export default NavGroup;
