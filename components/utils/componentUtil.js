import React from 'react';

export const mapChildren = (children, func) => {
	const list = React.Children
		.map(children, (node, index) => func(node, index)) || [];
	return list.filter(node => node);
};

export const mapChildrenForNode = (children, func) => (
	mapChildren(children, (node, index) => {
		if (React.isValidElement(node)) {
			return func(node, index);
		}
		return node;
	})
);

export const mapChildrenByType = (children, type, func) => (
	mapChildren(children, (node, index) => {
		if (
			React.isValidElement(node) &&
			node.type &&
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
			node.type &&
			node.type[type] === type
		) {
			return null;
		}

		if (func) return func(node, index);
		return node;
	})
);

export const wrapperEventValue = (originEvent, target, value) => {
	target.value = value; // eslint-disable-line no-param-reassign

	return (
		new Proxy(originEvent, {
			get(tgt, key) {
				if (key === 'target') return target;
				return tgt[key];
			},
		})
	);
};
