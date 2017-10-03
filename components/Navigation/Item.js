import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mapChildrenByType, mapChildrenByNotType } from '../utils/componentUtil';

import { BAMBOO_NAVIGATION_ITEM } from './FakeItem';

class Item extends React.Component {
	getChildContext() {
		const { navigationLevel = 0 } = this.context;

		return {
			navigationLevel: navigationLevel + 1,
		};
	}

	getTitle = () => {
		const { children } = this.props;

		return mapChildrenByNotType(children, BAMBOO_NAVIGATION_ITEM);
	};

	getList = () => {
		const { children } = this.props;

		return mapChildrenByType(children, BAMBOO_NAVIGATION_ITEM, node => (
			<Item key={node.key} {...node.props} />
		));
	};

	render() {
		const { onClick } = this.props;
		const { navigationLevel = 0 } = this.context;

		const title = this.getTitle();
		const list = this.getList();

		const clickProps = onClick ? {
			role: 'button',
			tabIndex: 0,
			onClick,
		} : {};

		return (
			<li className="bmbo-nav-item">
				<div className="bmbo-nav-item-title" {...clickProps}>
					<span
						className="bmbo-nav-item-title-offset"
						style={{ width: `${navigationLevel * 15}px` }}
					/>
					{title}
				</div>
				<ul className="bmbo-nav-item-list">
					{list}
				</ul>
			</li>
		);
	}
}

Item.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
};

Item.childContextTypes = {
	navigationLevel: PropTypes.number,
};


Item.contextTypes = {
	navigationLevel: PropTypes.number,
};

export default Item;
