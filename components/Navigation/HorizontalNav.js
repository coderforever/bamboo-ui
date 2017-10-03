import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mapChildrenByType } from '../utils/componentUtil';

import { BAMBOO_NAVIGATION_ITEM } from './FakeItem';
import HorizontalNavTitle from './HorizontalNavTitle';

class HorizontalNavigation extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	getList = () => {
		const { children, active } = this.props;
		return mapChildrenByType(children, BAMBOO_NAVIGATION_ITEM, (node, index) => {
			const props = {
				active: active === index,
				...node.props,
			};
			return <HorizontalNavTitle key={node.key} {...props} />;
		});
	};

	render() {
		const { type } = this.props;
		const children = this.getList();

		return (
			<div className={classNames('bmbo-nav bmbo-horizontal', type && `bmbo-${type}`)}>
				<ul>
					{children}
				</ul>
			</div>
		);
	}
}

HorizontalNavigation.propTypes = {
	children: PropTypes.node,
	type: PropTypes.string,
	active: PropTypes.number,
};

export default HorizontalNavigation;
