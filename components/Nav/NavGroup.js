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

			open: false,
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
				return;
			}
		}

		this.setState({ hover: false });
	};

	onClick = () => {
		this.setState(({ open }) => ({
			open: !open,
		}));
	};

	setItemRef = (ele) => {
		this.$item = ele;
	};

	setListRef = (ele) => {
		this.$list = ele;
	};

	render() {
		const { title, children, active, disabled, className, ...props } = this.props;
		const { navVertical, navInline } = this.context;
		const { hover, rect, open } = this.state;

		return (
			<li
				className={classNames(
					'bmbo-nav-group',
					hover && 'bmbo-hover',
					active && 'bmbo-active',
					disabled && 'bmbo-disabled',
					className,
				)}
				ref={this.setItemRef}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				{...props}
			>
				<div
					className="bmbo-nav-title"
					role="button"
					tabIndex={-1}
					onClick={this.onClick}
				>
					{title}
					{navVertical && <span
						className={classNames(
							'bmbo-caret',
							navInline && open && 'bmbo-caret-down',
						)}
					/>}
				</div>

				<NavList
					visible={hover}
					rect={rect}
					setRef={this.setListRef}
					open={open}
				>
					{children}
				</NavList>
			</li>
		);
	}
}

NavGroup.propTypes = {
	className: PropTypes.string,
	title: PropTypes.node,
	children: PropTypes.node,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
};

NavGroup.contextTypes = {
	navVertical: PropTypes.bool,
	navInline: PropTypes.bool,
};

export default NavGroup;
