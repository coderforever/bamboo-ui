import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { getEnablePosition } from '../utils/uiUtil';

import MenuItem from './MenuItem';

class MenuList extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		const { x, y, width = 0, height = 0 } = this.props;
		const rect = this.$list.getBoundingClientRect();
		Promise.resolve().then(() => {
			this.setState(getEnablePosition({ x, y, width, height }, rect, 'r'));
		});
	}

	onMouseDown = (event) => {
		event.stopPropagation();
	};

	setRef = (ele) => {
		this.$list = ele;
	};

	render() {
		const { list = [] } = this.props;
		const { menuHolder } = this.context;

		if (!menuHolder) return null;

		const { x, y } = this.state;

		return createPortal(
			<ul
				ref={this.setRef}
				className="bmbo-menu-list" style={{ left: `${x}px`, top: `${y}px` }}
				role="presentation"
				tabIndex={-1}
				onMouseDown={this.onMouseDown}
			>
				{list.map((item, index) => {
					if (!item) return null;
					return <MenuItem key={index} item={item} />;
				})}
			</ul>
		, menuHolder);
	}
}

MenuList.propTypes = {
	list: PropTypes.array,
	x: PropTypes.number,
	y: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
};

MenuList.contextTypes = {
	menuHolder: PropTypes.object,
};

export default MenuList;
