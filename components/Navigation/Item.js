import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mapChildrenByType, mapChildrenByNotType } from '../utils/componentUtil';

import { BAMBOO_NAVIGATION_ITEM } from './FakeItem';

class Item extends React.Component {
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
		const { onClick } = this.props;
		const title = this.getTitle();

		const clickProps = onClick ? {
			role: 'button',
			tabIndex: 0,
			onClick,
		} : {};

		return (
			<li className="bmbo-nav-item">
				<div className="bmbo-nav-item-title" {...clickProps}>
					{title}
				</div>
			</li>
		);
	}
}

Item.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
};

export default Item;
