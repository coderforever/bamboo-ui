import React from 'react';

export const BAMBOO_COMPONENT = 'BAMBOO_COMPONENT';

export const BAMBOO_INTERNAL_REF = 'BAMBOO_INTERNAL_REF';

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

export const someChildrenByType = (children, type, func) => {
	const childList = mapChildrenByType(children, type, node => node);
	return childList.some(func);
};

export const everyChildrenByType = (children, type, func) => {
	const childList = mapChildrenByType(children, type, node => node);
	return childList.every(func);
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
