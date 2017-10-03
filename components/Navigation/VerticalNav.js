import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mapChildrenByType } from '../utils/componentUtil';

import { BAMBOO_NAVIGATION_ITEM } from './FakeItem';
import Item from './Item';

class VerticalNav extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	getList = () => {
		const { children, active } = this.props;

		return mapChildrenByType(children, BAMBOO_NAVIGATION_ITEM, node => (
			<Item key={node.key} {...node.props} />
		));
	};

	render() {
		const { type } = this.props;
		const children = this.getList();

		return (
			<div className={classNames('bmbo-nav bmbo-vertical', type && `bmbo-${type}`)}>
				<ul>
					{children}
				</ul>
			</div>
		);
	}
}

VerticalNav.propTypes = {
	children: PropTypes.node,
	active: PropTypes.bool,
	type: PropTypes.string,
};

export default VerticalNav;
