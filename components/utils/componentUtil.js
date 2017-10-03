import React from 'react';

export const mapChildren = (children, func) => (
	React.Children
		.map(children, (node, index) => func(node, index))
		.filter(node => node)
);

export const mapChildrenByType = (children, type, func) => (
	mapChildren(children, (node, index) => {
		if (
			React.isValidElement(node) &&
			node.type[type] === type
		) {
			if (func) return func(node, index);
			return node;
		}
		return null;
	})
);

export const mapChildrenByNotType = (children, type, func) => (
	mapChildren(children, (node, index) => {
		if (
			React.isValidElement(node) &&
			node.type[type] === type
		) {
			return null;
		}

		if (func) return func(node, index);
		return node;
	})
);

export default {};
