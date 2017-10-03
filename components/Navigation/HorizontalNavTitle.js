import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mapChildrenByType, mapChildrenByNotType } from '../utils/componentUtil';

import { BAMBOO_NAVIGATION_ITEM } from './FakeItem';
import Item from './Item';

class HorizontalNavTitle extends React.Component {
	getTitle = () => {
		const { children } = this.props;

		return mapChildrenByNotType(children, BAMBOO_NAVIGATION_ITEM);
	};

	getList = () => {
		const { children } = this.props;

		return mapChildrenByType(children, BAMBOO_NAVIGATION_ITEM, (node) => (
			<Item key={node.key} {...node.props} />
		));
	};

	render() {
		const { active, onClick } = this.props;
		const title = this.getTitle();
		const list = this.getList();

		const clickProps = onClick ? {
			role: 'button',
			tabIndex: 0,
			onClick,
		} : {};

		return (
			<li className={classNames('bmbo-nav-head', active && 'bmbo-active')}>
				<div className="bmbo-nav-head-title" {...clickProps}>
					<div className="bmbo-nav-head-title-span">
						{title}
					</div>
				</div>
				<ul className="bmbo-nav-head-list">
					{list}
				</ul>
			</li>
		);
	}
}

HorizontalNavTitle.propTypes = {
	children: PropTypes.node,
	active: PropTypes.bool,
	onClick: PropTypes.func,
};

export default HorizontalNavTitle;
