import React from 'react';
import PropTypes from 'prop-types';

import { canUseDOM } from '../utils/envUtil';
import { getHolder } from '../utils/uiUtil';

import MenuList from './MenuList';

const $menuHolder = getHolder();
let $currentMenu;

if (canUseDOM) {
	window.addEventListener('mousedown', () => {
		if ($currentMenu) {
			$currentMenu.hideMenu();
			$currentMenu = null;
		}
	});
}

class Menu extends React.Component {
	constructor() {
		super();
		this.state = {
			show: false,
			x: 0,
			y: 0,
		};
	}

	getChildContext() {
		return {
			hideMenu: this.hideMenu,
			menuHolder: $menuHolder,
		};
	}

	onContextMenu = (event) => {
		event.preventDefault();

		this.setState({
			show: true,
			x: event.clientX,
			y: event.clientY,
		});

		$currentMenu = this;
	};

	hideMenu = (callback) => {
		this.setState({
			show: false,
		}, callback);
	};

	render() {
		const { menu = [], children } = this.props;
		const { show, x, y } = this.state;

		return (
			<div className="bmbo-menu-wrapper" onContextMenu={this.onContextMenu}>
				{children}

				{show && <MenuList holder={$menuHolder} list={menu} x={x} y={y} />}
			</div>
		);
	}
}

Menu.propTypes = {
	children: PropTypes.node,
	menu: PropTypes.array,
};

Menu.childContextTypes = {
	hideMenu: PropTypes.func,
	menuHolder: PropTypes.object,
};

export default Menu;
