import React from 'react';

export const BAMBOO_COMPONENT = 'BAMBOO_COMPONENT';

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

export const mapChildrenByType = (children, type, func) => {
	const typeList = Array.isArray(type) ? type : [type];

	return mapChildren(children, (node, index) => {
		if (
			React.isValidElement(node) &&
			node.type &&
			typeList.includes(node.type[BAMBOO_COMPONENT])
		) {
			if (func) return func(node, index);
			return node;
		}
		return null;
	});
};

export const mapChildrenByNotType = (children, type, func) => {
	const typeList = Array.isArray(type) ? type : [type];

	return mapChildren(children, (node, index) => {
		if (
			React.isValidElement(node) &&
			node.type &&
			typeList.includes(node.type[BAMBOO_COMPONENT])
		) {
			return null;
		}

		if (func) return func(node, index);
		return node;
	});
};

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
