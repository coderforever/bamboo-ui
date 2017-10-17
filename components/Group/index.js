import React from 'react';
import PropTypes from 'prop-types';

import { BAMBOO_COMPONENT, mapChildrenForNode } from '../utils/componentUtil';
import Item, { BAMBOO_GROUP_ITEM } from './Item';

class Group extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { children, value, onChange, style = {}, width } = this.props;
		if (width) style.width = width;

		// Wrap component with Item
		const itemList = mapChildrenForNode(children, (node) => {
			let item = node;
			if (!node.type || node.type[BAMBOO_COMPONENT] !== BAMBOO_GROUP_ITEM) {
				item = <Item>{node}</Item>;
			}

			return item;
		}).filter(n => n);
		const count = itemList.length;

		// Mark first & last Item
		const $children = itemList.map((node, index) => (
			React.cloneElement(node, {
				isFirst: index === 0,
				isLast: index === count - 1,
				value,
				onChange,
			})
		));

		return (
			<div className="bmbo-group" style={style}>
				{$children}
			</div>
		);
	}
}

Group.propTypes = {
	children: PropTypes.node,
	value: PropTypes.node,
	onChange: PropTypes.func,
	style: PropTypes.object,
	width: PropTypes.string,
};

Group.Item = Item;

export default Group;
