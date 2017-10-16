import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isInRect } from '../utils/uiUtil';
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
		const rect = this.$item.getBoundingClientRect();
		this.setState({ hover: true, rect });
	};
	onMouseLeave = (event) => {
		const { clientX, clientY } = event;

		if (this.$list) {
			const rect = this.$list.getBoundingClientRect();

			// Chrome has the bug of click event will trigger mouse leave event
			// ref: https://stackoverflow.com/questions/45266854/mouseleave-triggered-by-click
			if (isInRect(clientX, clientY, rect)) {
				console.log('Fake leave!');
				return;
			}
		}

		this.setState({ hover: false });
	};

	setItemRef = (ele) => {
		this.$item = ele;
	};

	setListRef = (ele) => {
		this.$list = ele;
	};

	render() {
		const { title, children, active } = this.props;
		const { hover, rect } = this.state;

		return (
			<li
				className={classNames('bmbo-nav-group', hover && 'bmbo-hover', active && 'bmbo-active')}
				ref={this.setItemRef}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				<div
					className="bmbo-nav-title"
				>
					{title}
				</div>

				<NavList
					visible={hover}
					rect={rect}
					setRef={this.setListRef}
				>
					{children}
				</NavList>
			</li>
		);
	}
}

NavGroup.propTypes = {
	title: PropTypes.node,
	children: PropTypes.node,
	active: PropTypes.bool,
};

export default NavGroup;
