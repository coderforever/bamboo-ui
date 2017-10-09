import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MenuList from './MenuList';

import { requestAnimationFrame } from '../utils/uiUtil';

class MenuItem extends React.Component {
	constructor() {
		super();
		this.state = {
			drillDown: undefined,
			rect: undefined,
			active: false,
		};
	}

	onClick = (...args) => {
		const { item: { disabled, onClick } } = this.props;

		if (disabled) return;

		const { hideMenu } = this.context;

		if (hideMenu) hideMenu();
		if (onClick) onClick(...args);
	};

	onMouseDown = (event) => {
		event.preventDefault();
	};

	onMouseEnter = () => {
		const { item: { list } } = this.props;

		this.setState({
			active: true,
		});

		if (!list) return;

		const rect = this.$item.getBoundingClientRect();

		this.setState({
			drillDown: list,
			rect,
		});
	};

	onMouseLeave = () => {
		this.setState({
			active: false,
			drillDown: null,
		});
	};

	setRef = (ele) => {
		this.$item = ele;
	};

	render() {
		const { item: { separator, title, disabled, list } } = this.props;
		const { drillDown, rect: { x, y, width, height } = {}, active } = this.state;

		if (separator) {
			return <li className="bmbo-separator" />;
		}

		return (
			<li
				className={classNames('bmbo-menu-item', disabled && 'bmbo-disabled', !disabled && active && 'bmbo-active')}
				role="button"
				tabIndex={-1}
				ref={this.setRef}
				onClick={this.onClick}
				onMouseDown={this.onMouseDown}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				{title}
				{list && <span className="bmbo-caret" />}
				{drillDown && <MenuList list={drillDown} x={x} y={y - 1} width={width} height={height} />}
			</li>
		);
	}
}

MenuItem.propTypes = {
	item: PropTypes.object,
};


MenuItem.contextTypes = {
	hideMenu: PropTypes.func,
};

export default MenuItem;
