import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mapChildrenByType, mapChildrenByNotType } from '../utils/componentUtil';
import { requestAnimationFrame } from '../utils/uiUtil';
import Sequence from '../utils/Sequence';

import { BAMBOO_NAVIGATION_ITEM } from './FakeItem';
import Item from './Item';

const DRILL_DOWN_STATUS_NONE = 0;
const DRILL_DOWN_STATUS_SHOW = 1;
const DRILL_DOWN_STATUS_SHOWN = 2;

// TODO: Update the logic to let drill down more make sense

class HorizontalNavTitle extends React.Component {
	constructor() {
		super();
		this.state = {
			drillDownStatus: DRILL_DOWN_STATUS_NONE,
		};

		// Add waiter for mouse event handler
		this.seq = new Sequence();
	}

	componentWillUnmount() {
		this.seq.destroy();
	}

	onMouseEnter = () => {
		this.seq.next(() => {
			if (this.state.drillDownStatus === DRILL_DOWN_STATUS_SHOWN) return;

			this.setState({ drillDownStatus: DRILL_DOWN_STATUS_SHOW }, () => {
				requestAnimationFrame(() => {
					this.setState({ drillDownStatus: DRILL_DOWN_STATUS_SHOWN });
				}, 2);
			});
		});
	};

	onMouseLeave = (event) => {
		const rect = event.target.getBoundingClientRect();
		if (
			rect.left <= event.clientX && event.clientX <= rect.right &&
			rect.top <= event.clientY && event.clientY <= rect.bottom
		) {
			/**
			 * It seems react onMouseLeave event not correct trigger sometime.
			 * Not sure why this happen. May need deep dive for source code.
 			 */
			return;
		}

		this.seq.next(() => {
			this.setState({ drillDownStatus: DRILL_DOWN_STATUS_SHOW });
		});
	};

	getTitle = () => {
		const { children } = this.props;

		return mapChildrenByNotType(children, BAMBOO_NAVIGATION_ITEM);
	};

	getList = () => {
		const { children } = this.props;

		return mapChildrenByType(children, BAMBOO_NAVIGATION_ITEM, (node) => (
			<Item key={node.key} {...node.props} />
		));
	};

	render() {
		const { active, onClick } = this.props;
		const { drillDownStatus } = this.state;

		const title = this.getTitle();
		const list = drillDownStatus !== DRILL_DOWN_STATUS_NONE ? this.getList() : null;

		const clickProps = onClick ? {
			role: 'button',
			tabIndex: 0,
			onClick,
		} : {};

		return (
			<li className={classNames('bmbo-nav-head', active && 'bmbo-active')}>
				<div
					className="bmbo-nav-head-title"
					{...clickProps}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
				>
					<div className="bmbo-nav-head-title-span">
						{title}
					</div>
				</div>
				{drillDownStatus !== DRILL_DOWN_STATUS_NONE && <ul
					className={classNames('bmbo-nav-head-list', drillDownStatus === DRILL_DOWN_STATUS_SHOW && 'bmbo-showing')}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
				>
					{list}
				</ul>}
			</li>
		);
	}
}

HorizontalNavTitle.propTypes = {
	children: PropTypes.node,
	active: PropTypes.bool,
	onClick: PropTypes.func,
};

export default HorizontalNavTitle;
