import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BAMBOO_COMPONENT, mapChildrenForNode } from '../utils/componentUtil';
import Item, { BAMBOO_GROUP_ITEM } from './Item';

const Group = ({ children, value, onChange, style = {}, width, className, ...props }) => {
	const myStyle = { ...style };
	if (width) myStyle.width = width;

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
		<div
			className={classNames('bmbo-group', className)}
			style={myStyle}
			{...props}
		>
			{$children}
		</div>
	);
};

Group.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	value: PropTypes.node,
	onChange: PropTypes.func,
	style: PropTypes.object,
	width: PropTypes.string,
};

Group.Item = Item;

export default Group;
