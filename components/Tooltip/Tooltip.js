import React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
	ANIMATE_STATUS_NONE, ANIMATE_STATUS_INIT,
	ANIMATE_STATUS_SHOWING, ANIMATE_STATUS_SHOWN, ANIMATE_STATUS_HIDING,
	getHolder,
} from '../utils/uiUtil';
import Sequence from '../utils/Sequence';

const $holder = getHolder();

class Tooltip extends React.Component {
	constructor() {
		super();
		this.state = {
			animateStatus: ANIMATE_STATUS_NONE,
			x: 0,
			y: 0,
		};
		this.seq = new Sequence();
	}

	componentWillMount() {
		this.checkUpdate({}, this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.checkUpdate(this.props, nextProps);
	}

	setTitleRef = (ele) => {
		this.$title = ele;
	};

	checkUpdate = (prevProps, nextProps) => {
		if (!prevProps.visible === !nextProps.visible) return;

		if (nextProps.visible) {
			this.seq.next(() => {
				this.setState({ animateStatus: ANIMATE_STATUS_INIT, x: 0, y: 0 });
			}).next(() => {
				const rect = this.$title.getBoundingClientRect();
			});
		}
	};

	render() {
		const { children } = this.props;
		const { animateStatus, x, y } = this.state;

		if (animateStatus === ANIMATE_STATUS_NONE) return null;

		return createPortal(
			<div
				className={classNames(
					'bmbo-tooltip',
					{
						// 'bmbo-hidden': animateStatus === ANIMATE_STATUS_INIT,
					},
				)}
				style={{ left: `${x}px`, top: `${y}px` }}
			>
				<div className="bmbo-tooltip-title" ref={this.setTitleRef}>
					{children}
				</div>
				<div className="bmbo-tooltip-arrow" />
			</div>
		, $holder);
	}
}

Tooltip.propTypes = {
	visible: PropTypes.bool,
	rect: PropTypes.object,
	children: PropTypes.node,
};

export default Tooltip;
